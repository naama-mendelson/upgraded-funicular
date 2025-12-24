import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ייבוא Services לפי השמות המדויקים שלך
import ticketService from "../../services/ticketService";
import commentService from "../../services/commentService";
import statusesService from "../../services/statutsServis"; // כפי שמופיע אצלך: statutsServis
import priorityService from "../../services/priorityService";
import usersService from "../../services/usersService";
import { useAuth } from "../../context/AuthContext";

// ייבוא טיפוסים
import type { Comment } from "../../types/commetData"; 
import type { Status, PriorityOption } from "../../types/ticketsData";
import type { UserProps } from "../../types/authData";

const TicketDetailPage = () => {
  const { state } = useAuth();
  const params = useParams();
  // חילוץ ה-ID בצורה גמישה כדי למנוע NaN
  const ticketId = params.ticketId || params.id; 
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newCommentText, setNewCommentText] = useState("");

  const id = Number(ticketId);
  const token = state.token!;
  const role = state.user?.role;

  /* =======================
      שליפת הכרטיס
  ======================= */
  const { data: ticket, isLoading: ticketLoading, error: ticketError } = useQuery({
    queryKey: ["ticket", id],
    // שימוש ב-(id, token) כפי שהגדרת ב-Service שלך
    queryFn: () => ticketService.getTicketById(id, token).then((res) => res.data),
    enabled: !!id && !!token,
  });

  /* =======================
      שליפת תגובות
  ======================= */
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => commentService.getComments(id, token).then((res) => res.data),
    enabled: !!id && !!token,
  });

  /* =======================
      שליפת סטטוסים ועדיפויות (כמו אצל חברה שלך)
  ======================= */
  const { data: statuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusesService.getStatus(token).then((res) => res.data),
  });

  const { data: priorities = [] } = useQuery({
    queryKey: ["priorities"],
    queryFn: () => priorityService.getPriorities(token).then((res) => res.data),
  });

  const { data: agents = [] } = useQuery({
    queryKey: ["agents"],
    queryFn: () => usersService.getAllUsers(token).then(res => res.data),
    enabled: role === "admin",
  });

  /* =======================
      עדכונים (Mutations)
  ======================= */
  const updateTicketMutation = useMutation({
    mutationFn: (data: any) => ticketService.patchTicket(token, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
    },
  });

  const updateTicketAgent = useMutation({
    mutationFn: (data: { assigned_to: number }) => ticketService.patchTicket(token, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => commentService.createComment(id, token, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setNewCommentText("");
    },
  });

  const deleteTicketMutation = useMutation({
    mutationFn: (tId: number) => ticketService.deleteTicket(tId, token),
    onSuccess: () => {
      navigate("/tickets");
    },
  });

  if (ticketLoading) return <div>טוען כרטיס...</div>;
  if (ticketError || !ticket) return <div>שגיאה בטעינת הכרטיס #{id}</div>;

  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      {role !== "admin" && <Link to="/tickets">חזרה לרשימת הכרטיסים</Link>}
      
      <h2>פרטי כרטיס #{id}</h2>
      <h3>{ticket.subject}</h3>
      <p>{ticket.description}</p>

      <strong>סטטוס:</strong>
      {role === "customer" ? (
        <p>{ticket.status_name}</p>
      ) : (
        <select
          value={ticket.status_id}
          onChange={(e) => updateTicketMutation.mutate({ status_id: Number(e.target.value) })}
        >
          {statuses.map((s: Status) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      )}

      <br />

      <strong>עדיפות:</strong>
      {role === "customer" ? (
        <p>{ticket.priority_name}</p>
      ) : (
        <select
          value={ticket.priority_id}
          onChange={(e) => updateTicketMutation.mutate({ priority_id: Number(e.target.value) })}
        >
          {priorities.map((p: PriorityOption) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      )}

      <hr />

    
      {role === "admin" && (
        <>
          <button onClick={() => deleteTicketMutation.mutate(id)} style={{ color: 'red' }}>
            מחיקה
          </button>
          <br /><br />
          <label>שיוך לנציג:</label>
          <select
            value={ticket.assigned_to ?? ""}
            onChange={(e) => updateTicketAgent.mutate({ assigned_to: Number(e.target.value) })}
          >
            <option value="">בחר נציג</option>
            {agents
              .filter((agent: UserProps) => agent.role === "agent")
              .map((agent: UserProps) => (
                <option key={agent.id} value={agent.id}>{agent.name}</option>
              ))}
          </select>
        </>
      )}

      <h3>תגובות</h3>
      {commentsLoading ? <p>טוען תגובות...</p> : (
        comments.map((comment: Comment) => (
          <div key={comment.id} style={{ borderBottom: "1px solid #eee" }}>
            <p><strong>{comment.author_name}</strong></p>
            <p>{comment.content}</p>
          </div>
        ))
      )}

      <textarea
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        placeholder="כתוב תגובה..."
      />
      <button onClick={() => addCommentMutation.mutate(newCommentText)}>שלח תגובה</button>
    </div>
  );
};
export default TicketDetailPage;