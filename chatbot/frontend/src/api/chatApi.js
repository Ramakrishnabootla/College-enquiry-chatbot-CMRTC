export default class ChatApi {
    static async query_request(query) {
        try {
            const response = await fetch("http://localhost:8000/query/"+query);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            return {
                status: 400,
                message: "Sorry! The server is not responding. Please make sure the backend server is running at http://localhost:8000"
            };
        }
    }
    
    static async direct_request(klass) {
        try {
            const response = await fetch("http://localhost:8000/direct/"+klass);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("API Error:", error);
            return {
                status: 400,
                message: "Sorry! The server is not responding. Please make sure the backend server is running at http://localhost:8000"
            };
        }
    }
}