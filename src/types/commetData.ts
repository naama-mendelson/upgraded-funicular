export interface Comment{
id: number,
ticket_id: number,
author_id: number,
content: string,
author_name: string,
author_email: string,
created_at: string
}

export interface CommentCreate{
content: string;
}