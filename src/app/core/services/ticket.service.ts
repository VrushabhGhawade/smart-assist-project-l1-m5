import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap, delay } from 'rxjs';
import { MockData } from '../../assets/mock-data';
import { Ticket, TicketGroup, TicketStatus, TicketFormData } from '../models/ticket.model';
import { User, UserRole } from '../models/user.model';
import { PersistentAuthService } from './persistent-auth';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  // Requirement 3: Data Source as Observable
  private ticketsData: Ticket[] = MockData.tickets;
  private tickets$ = new BehaviorSubject<Ticket[]>(this.ticketsData);

  // Requirement 5: BehaviorSubject for Shared State (Active Filter)
  private filterSubject = new BehaviorSubject<string>('All');
  public filterAction$ = this.filterSubject.asObservable();
constructor(
  private persistentAuthService: PersistentAuthService
) { }
  /**
   * Requirement 3: switchMap for ticket reload and map for role-based transformation
   * This is the main stream the component will subscribe to using AsyncPipe.
   */
  public getFilteredTickets(user: User): Observable<Ticket[]> {
    return this.filterAction$.pipe(
      switchMap(currentFilter => this.tickets$.pipe(
        // Step A: Apply Role-Based Security (Logic moved to Service)
        map(tickets => this.filterByRole(tickets, user)),
        // Step B: Apply UI Status Filter
        map(tickets => this.filterByStatus(tickets, currentFilter)),
        // Optimize: shareReplay prevents multiple execution for multiple subscribers
        shareReplay(1)
      ))
    );
  }

  /**
   * Create a new ticket
   */
  createTicket(formData: TicketFormData): Observable<Ticket> {
    const newTicket: Ticket = {
      ticketId: this.generateTicketId(),
      title: formData.issueTitle,
      description: formData.description,
      priority: formData.priority,
      category: formData.category,
      subCategory: formData.subCategory,
      status: TicketStatus.New,
      createdByUserId: 'current-user-id', // Replace with actual user ID from AuthService
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 0,
      feedback: ''
    };

    // Add to tickets array
    this.ticketsData.unshift(newTicket);
    this.tickets$.next([...this.ticketsData]);
    
    // Simulate API delay
    return of(newTicket).pipe(delay(500));
  }

  /**
   * Get all tickets for the current user (End User role)
   */
  getTicketsForCurrentUser(): Observable<Ticket[]> {
    // In real implementation, filter by current user's ID
    const currentUserId = this.persistentAuthService.userDetails?.userId; // Replace with actual user from AuthService
    const userTickets = this.ticketsData.filter(
      ticket => ticket.createdByUserId === currentUserId
    );
    
    return of(userTickets).pipe(delay(300));
  }

  /**
   * Get tickets assigned to current support engineer
   */
  getAssignedTickets(): Observable<Ticket[]> {
    // In real implementation, filter by assigned engineer
    const currentEngineerId = 'support-engineer-id'; // Replace with actual user
    const assignedTickets = this.ticketsData.filter(
      ticket => ticket.assignedToUserId === currentEngineerId
    );
    
    return of(assignedTickets).pipe(delay(300));
  }

  /**
   * Get all tickets (Supervisor role)
   */
  getAllTickets(): Observable<Ticket[]> {
    return of([...this.ticketsData]).pipe(delay(300));
  }

  /**
   * Get ticket by ID
   */
  getTicketById(ticketId: string): Observable<Ticket> {
    const ticket = this.ticketsData.find(t => t.ticketId === ticketId);
    
    if (!ticket) {
      throw new Error(`Ticket ${ticketId} not found`);
    }
    
    return of(ticket).pipe(delay(300));
  }

  /**
   * Update ticket status
   */
  updateTicketStatus(ticketId: string, status: TicketStatus): Observable<Ticket> {
    const ticket = this.ticketsData.find(t => t.ticketId === ticketId);
    
    if (!ticket) {
      throw new Error(`Ticket ${ticketId} not found`);
    }
    
    ticket.status = status;
    ticket.updatedAt = new Date().toISOString();
    
    // Update BehaviorSubject to notify subscribers
    this.tickets$.next([...this.ticketsData]);
    
    return of(ticket).pipe(delay(300));
  }

  /**
   * Assign ticket to support engineer
   */
  assignTicket(ticketId: string, engineerUserId: string): Observable<Ticket> {
    const ticket = this.ticketsData.find(t => t.ticketId === ticketId);
    
    if (!ticket) {
      throw new Error(`Ticket ${ticketId} not found`);
    }
    
    ticket.assignedToUserId = engineerUserId;
    ticket.status = TicketStatus.Assigned;
    ticket.updatedAt = new Date().toISOString();
    
    // Update BehaviorSubject to notify subscribers
    this.tickets$.next([...this.ticketsData]);
    
    return of(ticket).pipe(delay(300));
  }

  private filterByRole(tickets: Ticket[], user: User): Ticket[] {
    if (user.role === UserRole.END_USER) {
      return tickets.filter(t => t.createdByUserId === user.userId);
    }
    if (user.role === UserRole.SUPPORT_ENGINEER) {
      // Support sees New tickets OR tickets assigned to them
      return tickets.filter(t => t.status === TicketStatus.New || t.assignedToUserId === user.userId);
    }
    return tickets; // Supervisor (Role 3) sees everything
  }

  private filterByStatus(tickets: Ticket[], status: string): Ticket[] {
    const sorted = tickets.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (status === TicketGroup.All) return sorted;

    return sorted.filter(t => this.getTicketGroup(t.status) === status);
  }

  private getTicketGroup(status: TicketStatus): TicketGroup {
    switch (status) {
      case TicketStatus.New:
        return TicketGroup.New;

      case TicketStatus.Assigned:
      case TicketStatus.Input_Requested:
        return TicketGroup.Open;

      default:
        return TicketGroup.Closed;
    }
  }

  // Requirement 5: Method to trigger state change
  updateFilter(status: string) {
    this.filterSubject.next(status);
  }

  updateTicket(updatedTicket: Ticket): void {
    const index = this.ticketsData.findIndex(t => t.ticketId === updatedTicket.ticketId);
    
    if (index !== -1) {
      this.ticketsData[index] = { ...updatedTicket, updatedAt: new Date().toISOString() };
      this.tickets$.next([...this.ticketsData]);
    }
    
    // Simulate reload by re-emitting the current filter
    this.filterSubject.next(this.filterSubject.value);
  }

  /**
   * Generate unique ticket ID
   */
  private generateTicketId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TKT-${timestamp}-${random}`;
  }
}