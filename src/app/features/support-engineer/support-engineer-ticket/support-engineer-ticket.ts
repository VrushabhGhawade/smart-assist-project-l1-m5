import { Component } from '@angular/core';
import { Ticket, TicketPriority, TicketStatus } from '../../../core/models/ticket.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PersistentAuthService } from '../../../core/services/persistent-auth';
import { MockData } from '../../../assets/mock-data';
import { AgePipePipe } from '../../../shared/pipes/age-pipe-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-engineer-ticket',
  imports: [CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AgePipePipe,
    MatTooltipModule],
  templateUrl: './support-engineer-ticket.html',
  styleUrl: './support-engineer-ticket.scss',
})
export class SupportEngineerTicket {
  statusEnum = TicketStatus;
  displayedColumns: string[] = ['createdBy', 'description', 'priority', 'status', 'age', 'action'];

  ticketPriority = TicketPriority;

  tickets: Ticket[] = [];
  constructor(private persistentAuthService: PersistentAuthService,
    private router: Router
  ) {
    this.tickets = MockData.tickets.filter(
      t => t.assignedToUserId === this.persistentAuthService.userDetails?.userId
    );

  }
  getByUserName(userId: string): string {
    const user = MockData.users.find(u => u.userId === userId);
    return user ? user.name : '';
  }

  onTicketSelcted(ticketId: number) {
    // Navigate to update the URL when a user selects from dropdown
    this.router.navigate(['support/track-ticket', ticketId]);
  }
}