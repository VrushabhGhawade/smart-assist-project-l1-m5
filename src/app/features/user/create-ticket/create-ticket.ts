import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateTicketRequest, SubCategories, TicketCategory, TicketPriority, TicketStatus, TicketSubCategory } from '../../../core/models/ticket.model';
import { PersistentAuthService } from '../../../core/services/persistent-auth';
import { Router } from '@angular/router';
import { MockData } from '../../../assets/mock-data';
import { TitleHeader } from '../../../shared/components/title-header/title-header';

@Component({
  selector: 'app-create-ticket',
  imports: [FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    TextFieldModule,
    MatOptionModule,
    TitleHeader,
    ReactiveFormsModule],
  templateUrl: './create-ticket.html',
  styleUrl: './create-ticket.scss',
})
export class CreateTicket implements OnInit {
  ticketForm!: FormGroup;

  // Enum references for the template
  categories = Object.values(TicketCategory)
    .filter(v => typeof v === 'number') as TicketCategory[];

  priorities = Object.values(TicketPriority)
    .filter(v => typeof v === 'number') as TicketPriority[];

  availableSubCategories: TicketSubCategory[] = [];
  TicketCategory = TicketCategory;
  TicketSubCategory = TicketSubCategory;
  TicketPriority = TicketPriority;


  constructor(private fb: FormBuilder,
     private router: Router,
    private persistentAuthService: PersistentAuthService) { }

  ngOnInit() {
    this.ticketForm = this.fb.group({
      issueTitle: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: [{ value: '', disabled: true }, Validators.required]
    });

    // Watch for Category changes to update Sub-Category dropdown
    this.ticketForm.get('category')?.valueChanges.subscribe((category: TicketCategory) => {
      this.availableSubCategories = SubCategories[category] || [];
      const subCatControl = this.ticketForm.get('subCategory');

      subCatControl?.enable();
      subCatControl?.setValue(''); // Reset on category change
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      console.log('Ticket Data:', this.ticketForm.value);

      // Simulate successful creation and redirect
      const mockTicketId = Math.floor(Math.random() * 1000);
      MockData.tickets.push({
        ticketId: mockTicketId,
        title: this.ticketForm.value.issueTitle,
        description: this.ticketForm.value.description,
        priority: this.ticketForm.value.priority,
        status: TicketStatus.New,
        category: this.ticketForm.value.category,
        subCategory: this.ticketForm.value.subCategory, 
        createdAt: new Date().toISOString(),
        createdByUserId: this.persistentAuthService.userDetails?.userId || '',
        createdByName: this.persistentAuthService.userDetails?.name || '',
        assignedToUserId: '',
        assignedToName: '',
        rating: 0,
        feedback: ''
      });

      this.router.navigate(['/user/track-ticket', mockTicketId]);
    }
  }
}