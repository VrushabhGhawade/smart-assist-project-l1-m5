import { Component } from '@angular/core';
import { Ticket, TicketPriority, TicketStatus } from '../../../core/models/ticket.model';
import { PersistentAuthService } from '../../../core/services/persistent-auth';
import { MockData } from '../../../assets/mock-data';
import { Router } from '@angular/router';
import { TicketListComponent } from '../../../shared/ticket-list-component/ticket-list-component';

@Component({
  selector: 'app-support-engineer-ticket',
  imports: [TicketListComponent],
  templateUrl: './support-engineer-ticket.html',
  styleUrl: './support-engineer-ticket.scss',
})
export class SupportEngineerTicket {

}