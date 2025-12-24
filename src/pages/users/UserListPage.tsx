import ticketService from "../../services/ticketService";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import usersService from "../../services/usersService";
import type { UserProps } from "../../types/authData";
import { useNavigate } from "react-router-dom"; 

 const UserListPage = () => {
  const navigate = useNavigate(); 
  const { state } = useAuth();
  const token = state.token!;


    const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => usersService.getAllUsers(token).then(res => res.data),
    enabled: !!token,
  });       

  if (isLoading) return <div>טוען משתמשים...</div>;
  if (error) return <div>שגיאה בטעינת רשימת המשתמשים</div>;
  return (
    <div>
      <h2>רשימת משתמשים</h2>
      <div className="user-list">
        {users.map((x:UserProps) => (
          <div key={x.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{x.name}</h3>
            <p>דוא"ל: {x.email}</p>
            <p>תפקיד: {x.role}</p>
          <button onClick={() => navigate(`/users/${x.id}`)}>צפה בפרטים</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserListPage;