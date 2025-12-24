import axios from "axios";
import type { Ticket, TicketCreate, TicketUpdate } from "../types/ticketsData";
import { useAuth } from "../context/AuthContext";

  

const API_URL = "http://localhost:4000/tickets";

const getAuthHeaders = (token: string) => ({
    
    headers: {
        Authorization: `Bearer ${token}`,
        'accept': 'application/json'
    }
});

export const ticketService = {
    
    getAllTickets: (token: string) => {
        return axios.get<Ticket[]>(API_URL, getAuthHeaders(token));
    },

    createTicket: (data: TicketCreate, token: string) => {
        return axios.post<Ticket>(API_URL, data, getAuthHeaders(token));
    },

 
    getTicketById: (id: number, token: string) => {
        return axios.get<Ticket>(`${API_URL}/${id}`, getAuthHeaders(token));
    },

  
    updateTicket: (id: number, data: TicketUpdate, token: string) => {
        return axios.patch(`${API_URL}/${id}`, data, getAuthHeaders(token));
    },

  
    deleteTicket: (id: number, token: string) => {
        return axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
    },
    patchTicket:(token:string,ticketId:number,data:Partial<TicketUpdate>) => {
        return axios.patch(`http://localhost:4000/tickets/${ticketId}`,data,getAuthHeaders(token));
    }
    
};


export default ticketService;