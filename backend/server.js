import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());

// Helper to read users
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, '[]');
        return [];
    }
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

// Helper to write users
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Signup Endpoint
app.post('/api/signup', (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const users = readUsers();

    if (users.find(u => u.email === email)) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password, // In a real app, hash this!
        role: role || 'patient',
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    console.log(`[SIGNUP] New user registered: ${username} (${email})`);
    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, username, email, role: newUser.role } });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Missing email or password' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log(`[LOGIN] User logged in: ${user.username}`);
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

// Tavus Proxy Endpoint
app.post('/api/tavus/session', async (req, res) => {
    const { conversation_name, custom_greeting, properties } = req.body;

    try {
        const response = await fetch('https://tavusapi.com/v2/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '92349414f3b942eeb3213e8d40f0ff48',
            },
            body: JSON.stringify({
                persona_id: 'pf6388e99280',
                conversation_name,
                custom_greeting,
                properties
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('[TAVUS] Error:', data);
            return res.status(response.status).json(data);
        }

        console.log('[TAVUS] Session created:', data.conversation_id);
        res.json(data);
    } catch (error) {
        console.error('[TAVUS] Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Tavus Transcript Endpoint
app.get('/api/tavus/transcript/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    const apiKey = '92349414f3b942eeb3213e8d40f0ff48';

    try {
        // 1. Check current status
        let response = await fetch(`https://tavusapi.com/v2/conversations/${conversationId}?verbose=true`, {
            method: 'GET',
            headers: { 'x-api-key': apiKey },
        });

        let data = await response.json();
        console.log(`[TAVUS] Initial status for ${conversationId}:`, data.status);

        // 2. If active, force end it
        if (data.status === 'active') {
            console.log(`[TAVUS] Ending conversation ${conversationId}...`);
            await fetch(`https://tavusapi.com/v2/conversations/${conversationId}/end`, {
                method: 'POST',
                headers: { 'x-api-key': apiKey },
            });

            // Wait a moment for processing
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Fetch again
            response = await fetch(`https://tavusapi.com/v2/conversations/${conversationId}?verbose=true`, {
                method: 'GET',
                headers: { 'x-api-key': apiKey },
            });
            data = await response.json();
        }

        console.log('[TAVUS] Final Response:', JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error('[TAVUS] Error fetching transcript:', data);
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error('[TAVUS] Server error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
