
const createPersona = async () => {
    try {
        const response = await fetch('https://tavusapi.com/v2/personas', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "135c66479a724eb8ab9c17bc41878caf"
            },
            body: JSON.stringify({
                "system_prompt": "You are Pixal, an AI health assistant. You are empathetic, knowledgeable, and helpful. You help users understand their symptoms and guide them to appropriate care. You are NOT a doctor and always clarify that you cannot provide official medical diagnoses.",
                "layers": {
                    "llm": {
                        "model": "tavus-gpt-oss",
                        "speculative_inference": true
                    },
                    "conversational_flow": {
                        "turn_detection_model": "sparrow-1",
                        "turn_taking_patience": "medium",
                        "replica_interruptibility": "medium"
                    }
                },
                "default_replica_id": "rf4703150052"
            }),
        });

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
};

createPersona();
