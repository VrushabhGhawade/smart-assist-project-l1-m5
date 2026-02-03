import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';

import { Ticket, TicketPriority, TicketStatus } from '../../core/models/ticket.model';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { InteractiveRow } from '../../shared/directive/interactive-row';
import { TicketStatusPipe } from '../../shared/pipes/ticket-status-pipe';
import { TicketService } from '../../core/services/ticket.service';
import { MockData } from '../../assets/mock-data';
import { FeedbackDialog } from './feedback-dialog/feedback-dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    CommonModule,
    InteractiveRow,
    TicketStatusPipe,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User implements OnInit, OnDestroy {

  userId!: string;
  userName = '';

  userTickets$!: Observable<Ticket[]>;   // ✅ Observable
  selectedFilter = 'ALL';
  filteredTickets$!: Observable<Ticket[]>;

  ticketPriority = TicketPriority;
  ticketStatus = TicketStatus;

  displayedColumns: string[] = [
    'ticketId',
    'description',
    'priority',
    'status',
    'createdAt',
    'age',
    'assignee',
    'action'
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.userId = params['id'];
        this.userTickets$ = this.ticketService.getTicketsByUser(this.userId);
        this.filteredTickets$ = this.userTickets$; // Initialize with all tickets
      });
  }
  getAssigneeName(assigneeId?: string): string {
    if (!assigneeId) return '-';
    return MockData.users.find(u => u.userId === assigneeId)?.name ?? '-';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPriorityClass(priority: TicketPriority) {
    return {
      'priority-low': priority === TicketPriority.Low,
      'priority-medium': priority === TicketPriority.Medium,
      'priority-high': priority === TicketPriority.High
    };
  }

  getPriorityStyle(priority: TicketPriority) {
    return {
      'font-weight': priority === TicketPriority.High ? '600' : '400'
    };
  }
  viewTicketDetails(ticket: Ticket): void {
    const dialogRef = this.dialog.open(FeedbackDialog, {
      width: '350px',
      disableClose: true,
      data: ticket
    });
    dialogRef.afterClosed().subscribe((updated: Ticket | undefined) => {
      if (!updated) return;
      ticket.rating = updated.rating;
      ticket.feedback = updated.feedback;
      this.updateTicket(ticket);
    });

  }
  updateTicket(updated: Ticket) {
    // Update the ticket in MockData for demonstration purposes
    const ticketIndex = MockData.tickets.findIndex(t => t.ticketId === updated.ticketId);
    if (ticketIndex !== -1) {
      MockData.tickets[ticketIndex] = updated;
    }
    this.userTickets$ = of(MockData.tickets.filter(t => t.createdByUserId === this.userId));
    this.filteredTickets$ = this.userTickets$;
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

    this.filteredTickets$ = this.userTickets$.pipe(
      map(tickets => this.applyFilter(tickets, filter))
    );
  }

  getFeedbackPendingCount(tickets: Ticket[]): number {
    return tickets.filter(t => t.status === TicketStatus.Resolved && !t.rating).length;
  }




}
