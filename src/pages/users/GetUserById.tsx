import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import usersService from '../../services/usersService';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../../components/features/Spinner';
import type { User } from '../../types/User';

const GetUserById = () => {
    const navigate = useNavigate(); 
    const { state } = useAuth();
    const token = state.token;
    const { id } = useParams<{ id: string }>(); 
    const userId = id ? parseInt(id) : NaN;
    const isValidId = !isNaN(userId);

    const { data: user, isLoading, isError } = useQuery<User>({
        queryKey: ["user", id],
        queryFn: () => usersService.getUserById(userId, token || "").then(res => res.data),
        enabled: !!token && isValidId,
    });

    if (isLoading) return <div><Spinner/></div>;
    if (isError || !user) return <div>משתמש לא נמצא או שאין לך הרשאה לצפות בו</div>;

    return (
        <div style={{ padding: "20px", direction: "rtl" }}>
            <button onClick={() => navigate(-1)}>← חזור</button>
            <h1>פרטי משתמש: {user.name}</h1>
            <p>אימייל: {user.email}</p>
            <p>תפקיד: <strong>{user.role}</strong></p>
            <p>id:{user.id}</p>
            <p>נוצר בתאריך: {new Date(user.created_at).toLocaleDateString('he-IL')}</p>
        </div>
    );
};

export default GetUserById;