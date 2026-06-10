const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default class ChatApi {
    static async query_request(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/query/${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            return {
                status: 400,
                message: "Sorry! The server is currently unavailable. Please try again later."
            };
        }
    }

    static async direct_request(klass) {
        try {
            const response = await fetch(`${API_BASE_URL}/direct/${klass}`, { timeout: 10000 });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            return {
                status: 400,
                message: "Sorry! The server is currently unavailable. Please try again later."
            };
        }
    }
}