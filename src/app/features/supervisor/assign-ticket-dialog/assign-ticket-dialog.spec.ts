import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketDialog } from './assign-ticket-dialog';

describe('AssignTicketDialog', () => {
  let component: AssignTicketDialog;
  let fixture: ComponentFixture<AssignTicketDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTicketDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTicketDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
