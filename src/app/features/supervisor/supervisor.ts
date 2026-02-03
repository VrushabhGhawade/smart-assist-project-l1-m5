import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { MockData } from '../../assets/mock-data';
import { MatDialog } from '@angular/material/dialog';
import { Ticket, TicketPriority, TicketStatus } from '../../core/models/ticket.model';
import { AssignTicketDialog } from '../support-engineer/assign-ticket-dialog/assign-ticket-dialog';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supervisor',
  imports: [MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatChipsModule,
    MatIconModule],
  templateUrl: './supervisor.html',
  styleUrl: './supervisor.scss',
})
export class Supervisor {
  userName: string = '';
  userId: string = '';
  userTickets: Ticket[] = [];
  ticketPriority = TicketPriority;
  ticketStatus = TicketStatus;
  selectedFilter = 'ALL';
  filteredTickets: Ticket[] = [];
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
    this.userName = MockData.users.find(u => u.userId === this.userId)?.name || '';
    this.userTickets = MockData.tickets;
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
        this.userTickets = this.userTickets.map(t =>
          t.ticketId === ticket.ticketId ? { ...t, assignedToUserId: result.assignee } : t
        );
        console.log('Assigned To:', result.assignee);
        console.log('Comment:', result.comment);
      }
    });

  }

    applyFilter(tickets: Ticket[], filter: string): Ticket[] {
      switch (filter) {
        case 'OPEN':
          return tickets.filter(t => t.status === TicketStatus.Open);
  
        case 'IN_PROGRESS':
          return tickets.filter(t => t.status === TicketStatus.In_Progress);
  
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
}
