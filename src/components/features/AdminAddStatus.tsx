import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {useQueryClient} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type {  Status} from '../../types/ticketsData'
import statutsServis  from '../../services/statutsServis';

const AdminAddStatus = () => {
  const { state } = useAuth();
  const token = state.token!;
  const queryClient = useQueryClient();
  const [newStatusName, setNewStatusName] = useState("");

  const { data: statuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statutsServis.getStatus(token).then(res => res.data),
  });

  const addStatusMutation = useMutation({
  mutationFn: (name: string) =>
    statutsServis.createStatus(token, name),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["statuses"] });
    setNewStatusName("");
  },
});

  return (
    <div>
      <h2>סטטוסים</h2>

      {statuses.map((s: Status) => (
        <p key={s.id}>{s.name}</p>
      ))}

      <input
        value={newStatusName}
        onChange={(e) => setNewStatusName(e.target.value)}
        placeholder="סטטוס חדש"
      />
        <button
        onClick={() => addStatusMutation.mutate(newStatusName)}
        disabled={!newStatusName.trim()}
        >
         הוסף סטטוס
        </button>
    </div>
  );
};

export default AdminAddStatus

