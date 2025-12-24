import React from 'react';
import { useForm } from 'react-hook-form';
import type { TicketCreate } from '../../types/ticketsData';

interface Props {
  sendData: (data: TicketCreate) => void;
}

const CreatTicketForm = ({ sendData }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TicketCreate>();

  return (
    <form onSubmit={handleSubmit(sendData)}>
      <div>
        <label>נושא:</label>
        <input {...register("subject", { required: "חובה להזין נושא" })} />
        {errors.subject && <span>{errors.subject.message}</span>}
      </div>

      <div>
        <label>תיאור:</label>
        <textarea {...register("description", { required: "חובה להזין תיאור" })} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <div>
        <label>עדיפות:</label>
        <select {...register("priority_id", { valueAsNumber: true })}>
          <option value="1">נמוכה</option>
          <option value="2">בינונית</option>
          <option value="3">גבוהה</option>
        </select>
      </div>

    
      <button type="submit">שלח</button>
    </form>
  );
};

export default CreatTicketForm;