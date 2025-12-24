import axios from "axios";

const BASE_URL = 'http://localhost:4000';

 const commentService = {
    getComments: (ticketId: number, token: string) => {
        return axios.get(`${BASE_URL}/tickets/${ticketId}/comments`, { 
            headers: { 
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            } 
        });
    },
 
   createComment: (ticketId: number, token: string, content: string) => {
    return axios.post(
        `http://localhost:4000/tickets/${ticketId}/comments`, 
        { content }, 
        { 
            headers: { Authorization: `Bearer ${token}` } 
        }
    );
}
};
export default commentService;