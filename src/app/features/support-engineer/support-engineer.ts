import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { MockData } from '../../assets/mock-data';
import { MatTableModule } from '@angular/material/table';
import { InteractiveRow } from '../../shared/directive/interactive-row';
import { Ticket, TicketPriority, TicketStatus } from '../../core/models/ticket.model';
import { AssignTicketDialog } from './assign-ticket-dialog/assign-ticket-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AgePipePipe } from '../../shared/pipes/age-pipe-pipe';
import { PersistentAuthService } from '../../core/services/persistent-auth';

@Component({
  selector: 'app-support-engineer',
  imports: [MatToolbarModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    InteractiveRow,
    MatButtonModule,
    MatChipsModule,
    AgePipePipe,
    MatIconModule],
  templateUrl: './support-engineer.html',
  styleUrl: './support-engineer.scss',
})
export class SupportEngineer {
  userName: string = '';
  userId: string = '';
  userTickets: Ticket[] = [];
  ticketPriority = TicketPriority;
  ticketStatus = TicketStatus;
  selectedFilter = 'ALL';
  filteredTickets: Ticket[] = [];
  constructor(
    private persistentAuthService: PersistentAuthService,
    private router:Router,
    private dialog: MatDialog
  ) {

    this.userName = MockData.users.find(u => u.userId === persistentAuthService.userDetails?.userId)?.name || '';
    this.userTickets = MockData.tickets.filter(
      t => t.assignedToUserId === persistentAuthService.userDetails?.userId
    );
    this.filteredTickets = this.userTickets;
  }
  getAssigneeName(assigneeId?: string): string {
    if (!assigneeId) return '-';
    return MockData.users.find(u => u.userId === assigneeId)?.name ?? '-';
  }
  viewTicketDetails(ticket: Ticket): void {
    this.dialog.open(AssignTicketDialog, {
      width: '360px',
      disableClose: true,
      data: {
        ticketId: ticket.ticketId
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Assigned To:', result.assignee);
        console.log('Comment:', result.comment);
      }
    });

  }

  applyFilter(tickets: Ticket[], filter: string): Ticket[] {
    switch (filter) {
      case 'OPEN':
        return tickets.filter(t => t.status === TicketStatus.New);

      case 'CLOSED':
        return tickets.filter(t => t.status === TicketStatus.Closed);

      case 'RESOLVED':
        return tickets.filter(t => t.status === TicketStatus.Resolved);
      default:
        return tickets;
    }
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;

    this.filteredTickets = this.applyFilter(this.userTickets, filter);
  }
  onTicketSelcted(ticketId: number) {
    // Navigate to update the URL when a user selects from dropdown
    this.router.navigate(['support/track-ticket', ticketId]);
  }
}
