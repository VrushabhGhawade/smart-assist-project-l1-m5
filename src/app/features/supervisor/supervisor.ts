import { Component } from '@angular/core';
import { TicketDashboard } from '../../shared/ticket-dashboard/ticket-dashboard';
import { Ticket, TicketStatus } from '../../core/models/ticket.model';
import { AssignTicketDialog } from './assign-ticket-dialog/assign-ticket-dialog';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../core/services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  imports: [TicketDashboard],
  templateUrl: './supervisor.html',
  styleUrl: './supervisor.scss',
})
export class Supervisor {

  constructor(private dialog: MatDialog, 
    private ticketService: TicketService,
  private router: Router) { }
  viewTicketDetails(ticket: Ticket): void {
    this.dialog.open(AssignTicketDialog, {
      width: '360px',
      disableClose: true,
      data: {
        ticketId: ticket.ticketId
      }
    }).afterClosed().subscribe(result => {
      if (!result) {
        console.log('Dialog closed without assignment');
      } else {
        ticket.status = TicketStatus.Assigned;
        ticket.assignedToUserId = result.assignedToUserId;
        this.ticketService.updateTicket(ticket);
      }
    });

  }

  onTicketSelcted(ticketId: number) {
    // Navigate to update the URL when a user selects from dropdown
    this.router.navigate(['supervisor/track-ticket', ticketId]);
  }
}
