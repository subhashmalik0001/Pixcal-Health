import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client (Replace with actual env variables)
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export const authService = {
    // Sign Up
    async signUp(email: string, password: string, role: 'patient' | 'doctor', username: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role,
                    username,
                },
            },
        });

        return { data, error };
    },

    // Log In
    async signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        return { data, error };
    },

    // Sign Out
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Get Current User
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};
