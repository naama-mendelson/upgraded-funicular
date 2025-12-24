import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // הוסיפי useNavigate
import { useQuery } from '@tanstack/react-query';
import usersService from '../../services/usersService';
import { useAuth } from '../../context/AuthContext';

const GetUserById = () => {
    const navigate = useNavigate(); // הגדירי את ה-Hook
    const { state } = useAuth();
    const token = state.token!;
    const { id } = useParams<{ id: string }>(); // שליפת ה-ID מה-URL

    const { data, isLoading, isError } = useQuery({
        queryKey: ["user", id],
        // תיקון: שליחת ה-ID וה-Token בסדר הנכון
        queryFn: () => usersService.getUserById(parseInt(id!), token).then(res => res.data),
        enabled: !!token && !!id,
    });

    if (isLoading) return <div>טוען משתמש...</div>;
    // אם המשתמש לא נמצא, זה ייכנס לכאן (כמו בצילום האחרון שלך)
    if (isError || !data) return <div>משתמש לא נמצא</div>;

    const user = data; 

    return (
        <div style={{ padding: "20px", direction: "rtl" }}>
            <button onClick={() => navigate(-1)}>← חזור</button>
            <h1>פרטי משתמש: {user.name}</h1>
            <p>אימייל: {user.email}</p>
            <p>תפקיד: <strong>{user.role}</strong></p>
        </div>
    );
};

export default GetUserById;