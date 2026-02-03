export enum TicketPriority {
  Low = 1,
  Medium = 2,
  High = 3
}

export enum TicketStatus {
  Open = 1,
  In_Progress = 2,
  Resolved = 3,
  Closed = 4
}
export interface Ticket {
  ticketId: number;
  createdByUserId: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  age: number;
  assignedToUserId?: string;
  rating: number;
  feedback: string;
}

