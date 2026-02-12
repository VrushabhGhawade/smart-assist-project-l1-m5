import { Component } from '@angular/core';
import { TicketListComponent } from '../../../shared/ticket-list-component/ticket-list-component';
import { MatDialog } from '@angular/material/dialog';
import { Ticket, TicketStatus } from '../../../core/models/ticket.model';
import { TicketService } from '../../../core/services/ticket.service';
import { FeedbackDialog } from '../feedback-dialog/feedback-dialog';


@Component({
  selector: 'app-my-ticket',
  imports: [TicketListComponent],
  templateUrl: './my-ticket.html',
  styleUrl: './my-ticket.scss',
})
export class MyTicket {
constructor(private dialog: MatDialog, private ticketService: TicketService) { }

  feedback(ticket: Ticket): void {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      width: '350px',
      disableClose: true,
      data: ticket
    });
    dialogRef.afterClosed().subscribe((updated: Ticket | undefined) => {
      if (!updated) return;
      ticket.rating = updated.rating;
      ticket.feedback = updated.feedback;
      ticket.status = TicketStatus.Feedback_Received;
      this.ticketService.updateTicket(ticket)
    });

  }
}