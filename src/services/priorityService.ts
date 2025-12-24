import axios from 'axios';
import type { PriorityOption } from '../types/ticketsData';

 const priorityService = {
    getPriorities: (token: string) => {
        return axios.get<PriorityOption[]>("http://localhost:4000/priorities", {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
};
export default priorityService;