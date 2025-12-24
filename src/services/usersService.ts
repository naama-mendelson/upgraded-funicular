import axios from 'axios';
import type { UserCreate, UserProps} from '../types/authData';

const BASE_URL = 'http://localhost:4000/users';

const usersService = {
    createUser: (data: UserCreate, token: string) => {
        return axios.post(
            BASE_URL,
            data, 
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                } 
            }
        ); 
    },
    
    getAllUsers: (token: string) => {
        return axios.get(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
    ,

   getUserById: (id: string | number, token: string) => {
    return axios.get(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
   }
}

export default usersService;