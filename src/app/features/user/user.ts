import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MockData } from '../../assets/mock-data';
import { Ticket } from '../../core/models/ticket.model';
import { MatTab } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-user',
  imports: [MatToolbarModule, MatCardModule,MatTableModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  userName: string = '';
  userId: string = '';
  userTickets: Ticket[]= [];
  displayedColumns: string[] = [
    'ticketId',
    'description',
    'priority',
    'status',
    'age',
    'assignee'
  ];
  constructor(
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
    this.userName = MockData.users.find(u => u.userId === this.userId)?.name || '';
     this.userTickets = MockData.tickets.filter(
      t => t.createdByUserId === this.userId
    );
  }
  getAssigneeName(assigneeId?: string): string {
    if (!assigneeId) return '-';
    return MockData.users.find(u => u.userId === assigneeId)?.name ?? '-';
  }
}
