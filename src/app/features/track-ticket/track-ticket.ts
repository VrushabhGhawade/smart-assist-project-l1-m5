import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Ticket, TicketCategory, TicketPriority, TicketStatus, TicketSubCategory } from '../../core/models/ticket.model';
import { MockData } from '../../assets/mock-data';
import { TicketStatusPipe } from '../../shared/pipes/ticket-status-pipe';
import { PersistentAuthService } from '../../core/services/persistent-auth';
import { UserRole } from '../../core/models/user.model';


@Component({
  selector: 'app-track-ticket',
  imports: [CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  TicketStatusPipe],
  templateUrl: './track-ticket.html',
  styleUrl: './track-ticket.scss',
})
export class TrackTicket implements OnInit {
  tickets: Ticket[] = MockData.tickets;

  selectedTicket: Ticket | null = null;
  TicketCategory = TicketCategory;
  TicketSubCategory = TicketSubCategory;
  TicketPriority = TicketPriority;
  TicketStatus=TicketStatus

  constructor(private route: ActivatedRoute, private router: Router ,
    private persistentAuthService: PersistentAuthService
  ) { }

  ngOnInit() {
    // Listen for route param changes (e.g., /track-ticket/5)
    this.route.params.subscribe(params => {
      const id = +params['ticketId'];
      if (id) {
        this.selectedTicket = this.tickets.find(t => t.ticketId === id) || null;
      }
    });
  }

  onTicketChange(ticketId: number) {
    // Navigate to update the URL when a user selects from dropdown
    if(this.persistentAuthService.userDetails?.role === UserRole.END_USER){
      this.router.navigate(['user/track-ticket', ticketId]);
    }
    else if(this.persistentAuthService.userDetails?.role === UserRole.SUPPORT_ENGINEER){
      this.router.navigate(['support/track-ticket', ticketId]);
    }
    else if(this.persistentAuthService.userDetails?.role === UserRole.SUPERVISOR){
      this.router.navigate(['supervisor/track-ticket', ticketId]);
    }

   
  }
  getByUserName(userId: string): string {
    const user = MockData.users.find(u => u.userId === userId);
    return user ? user.name : '';
  }
}