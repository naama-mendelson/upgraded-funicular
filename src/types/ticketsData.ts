export interface Ticket {
    id: number,
    subject: string,
    description: string,
    status_id: number,
    priority_id: number,
    status_name: string,
    priority_name: string,
    created_by: number,
    assigned_to: number,
    created_at: string,
    updated_at: string
  }

  export interface TicketCreate {
  subject: string,
  description: string,
  status_id: number,
  priority_id: number,
  assigned_to: number
}
  export interface TicketUpdate {
     status_id: number,
     priority_id: number,
     assigned_to: number,}

  export interface PriorityOption 
  {
    id: number,
    name: string
  }
export interface Status 
  {
    id: number,
    name: string
  }
