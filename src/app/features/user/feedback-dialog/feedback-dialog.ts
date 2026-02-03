import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ticket } from '../../../core/models/ticket.model';

@Component({
  selector: 'app-feedback-dialog',
  imports: [MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule],
  templateUrl: './feedback-dialog.html',
  styleUrl: './feedback-dialog.scss',
})
export class FeedbackDialog {
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  feedback = '';

  constructor(private dialogRef: MatDialogRef<FeedbackDialog>, @Inject(MAT_DIALOG_DATA) public data: Ticket) {
    this.rating = data?.rating || 0;
    this.feedback = data?.feedback || '';
  }

  setRating(value: number) {
    this.rating = value;
  }
  save() {
    this.dialogRef.close({
      rating: this.rating,
      feedback: this.feedback
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
