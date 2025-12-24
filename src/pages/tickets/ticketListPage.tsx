import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ticketService } from '../../services/ticketService';
import { useAuth } from '../../context/AuthContext';
import type { Ticket } from '../../types/ticketsData';
import { useNavigate } from 'react-router-dom';

const TicketListPage = () => {
    const navigate = useNavigate(); 
    const { state } = useAuth();
    const token = state.token;

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['tickets', token],
        queryFn: () => ticketService.getAllTickets(token!),
        enabled: !!token,
    });

    if (isLoading) {
        return <div>טוען כרטיסים...</div>;
    }


    if (isError) {
        return <div>שגיאה: {(error as any)?.message}</div>;
    }


    const tickets = data?.data || [];


    return (
        <div>
            <h2>רשימת הכרטיסים שלי</h2>
            
            {tickets.length === 0 ? (
                <p>לא נמצאו כרטיסים.</p>
            ) : (
                <div>
                    {tickets.map((ticket: Ticket) => (
                        <div key={ticket.id}>
                            <button onClick={() => navigate(`/tickets/${ticket.id}`)}>צפה בפרטים :{ticket.subject}</button>
                            <hr /> 
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketListPage;