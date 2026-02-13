import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MockData } from '../../../assets/mock-data';
 
type DocCard = {
  step: number;
  title: string;
  technical: string[];
  functional: string[];
};
 
type EvaluationItem = {
  id: string;
  label: string;
  checked: boolean;
};
 
@Component({
  selector: 'app-resource',
  imports: [CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatCheckboxModule],
  templateUrl: './resource.html',
  styleUrl: './resource.scss',
})
export class Resource implements OnInit {
  private readonly evaluationStorageKey = 'smart-assist:l1m5:evaluation-parameter';
 
  public readonly requirementCards: DocCard[] = [
    {
      step: 1,
      title: 'Create Ticket (Form & Validation)',
      technical: [
        'Routing: menu navigation → /create-ticket',
        'Routing: programmatic navigation → /track-ticket/:ticketId',
        'Reactive Forms',
        'Form validation: required field validation',
        'Disable submit button when form is invalid',
        'Angular Material: MatInput, MatSelect, MatButton',
      ],
      functional: [
        'When user clicks Create Ticket from the menu, route to Create Ticket page',
        'Display a ticket creation form',
        'Mandatory fields: Issue Title, Description, Priority (High/Medium/Low), Category, Sub-Category',
        'Create Ticket button remains disabled until all mandatory fields are valid',
        'On successful submission: create a ticket object and redirect to Track Ticket with generated ticketId',
      ],
    },
    {
      step: 2,
      title: 'My Tickets (List View with Routing)',
      technical: [
        'Basic routing: menu navigation → /my-tickets',
        'Data binding: display ticket list using mock data (service-driven)',
        'Navigation with route params: clicking a ticket routes to /track-ticket/:ticketId',
        'Angular Material: MatTable',
      ],
      functional: [
        'When user clicks My Tickets, route to the My Tickets page',
        'Display a list of tickets for the logged-in user',
        'End User sees all tickets created by them',
        'Support Engineer sees assigned tickets and new/unassigned tickets',
        'Supervisor sees all tickets',
        'Each ticket entry auto-navigates to Track Ticket view',
      ],
    },
    {
      step: 3,
      title: 'Track Ticket (Route Parameters)',
      technical: [
        'Routing: /track-ticket',
        'Routing: /track-ticket/:ticketId',
        'Path parameters: read ticketId from route',
        'Conditional rendering: show details only when a ticket is selected',
        'Angular Forms: dropdown selection using Template-Driven or Reactive Forms',
      ],
      functional: [
        'Track Ticket page shows a dropdown with relevant tickets for the logged-in user',
        'If accessed with ticketId in route: auto-select the corresponding ticket and show details immediately',
        'If accessed without ticketId: user selects a ticket from the dropdown',
      ],
    },
    {
      step: 4,
      title: 'Role-Based Navigation (Route Guards – Intro Level)',
      technical: [
        'Route Guards',
        'Simple role check using mock user data',
        'Routing configuration: protect routes based on role',
        'Structural directives: conditionally show menu items based on role',
      ],
      functional: [
        'Pages behave differently based on user role (End User / Support Engineer / Supervisor)',
        'End User sees Create Ticket, My Tickets, Track Ticket',
        'Support Engineer sees assigned tickets and actions',
        'Supervisor sees Reports',
        'Unauthorized users must not access restricted routes',
      ],
    },
    {
      step: 5,
      title: 'Live Chat (Routing Placeholder)',
      technical: [
        'Basic routing: menu navigation → /live-chat',
        'Conditional UI rendering: message changes based on user role',
      ],
      functional: [
        'When user clicks Live Chat, navigate to the Live Chat page',
        'Display a role-based informational placeholder message',
        'No actual chat functionality required (placeholder only)',
      ],
    },
    {
      step: 6,
      title: 'Reports (Supervisor Navigation)',
      technical: [
        'Basic routing: menu navigation → /reports',
        'Route Guard: only Supervisor role can access this route',
      ],
      functional: [
        'When Supervisor clicks Reports, route to the Reports page',
        'Display a placeholder message indicating future implementation',
      ],
    },
    {
      step: 7,
      title: 'Non-Functional Requirements (Lightweight)',
      technical: [
        'Well-structured, readable code',
        'Organized by feature (feature-based folder structure)',
        'Predictable and meaningful routing paths',
      ],
      functional: [
        'Solution is easily extendable for future modules',
      ],
    },
    {
      step: 8,
      title: 'Completion Criteria',
      technical: [
        'Forms validate inputs properly',
        'Route parameters work as expected',
        'Role-based access behaves correctly',
        'Clean separation of concerns',
      ],
      functional: [
        'All routes navigate correctly',
      ],
    },
  ];
 
  public readonly mockUsers = MockData.users;
  public readonly mockMenus = MockData.menus;
  public readonly mockRoleMenuMapping = MockData.roleMenuMapping;
  public readonly mockTickets = MockData.tickets;
 
  public readonly evaluationItems: EvaluationItem[] = [
    { id: 'create-ticket-route', label: 'Create Ticket route /create-ticket', checked: false },
    { id: 'create-ticket-reactive-form', label: 'Reactive Form for Create Ticket', checked: false },
    {
      id: 'create-ticket-mandatory-fields',
      label: 'Mandatory fields (Title, Description, Priority, Category, Sub-Category)',
      checked: false,
    },
    { id: 'create-ticket-required-validation', label: 'Required field validation', checked: false },
    { id: 'create-ticket-submit-disabled-invalid', label: 'Submit button disabled when form invalid', checked: false },
    {
      id: 'create-ticket-nav-track-by-id',
      label: 'Programmatic navigation to /track-ticket/:ticketId',
      checked: false,
    },
    { id: 'create-ticket-material', label: 'Angular Material (MatInput, MatSelect, MatButton)', checked: false },
 
    { id: 'my-tickets-route', label: 'My Tickets route /my-tickets', checked: false },
    { id: 'my-tickets-mattable', label: 'Ticket list displayed using MatTable', checked: false },
    { id: 'my-tickets-bound-mock', label: 'Ticket list bound from mock data', checked: false },
    { id: 'tickets-user-only-own', label: 'End User sees only tickets created by them', checked: false },
    {
      id: 'tickets-support-assigned-unassigned',
      label: 'Support Engineer sees assigned and new/unassigned tickets',
      checked: false,
    },
    { id: 'tickets-supervisor-all', label: 'Supervisor sees all tickets', checked: false },
    { id: 'tickets-click-nav-track', label: 'Clicking ticket navigates to /track-ticket/:ticketId', checked: false },
 
    { id: 'track-ticket-route-base', label: 'Track Ticket route /track-ticket', checked: false },
    { id: 'track-ticket-route-param', label: 'Track Ticket route /track-ticket/:ticketId', checked: false },
    { id: 'track-ticket-read-param', label: 'ticketId read from route params', checked: false },
    { id: 'track-ticket-auto-select', label: 'Auto-select ticket when ticketId present', checked: false },
    { id: 'track-ticket-role-dropdown', label: 'Dropdown shows relevant tickets only (role-based)', checked: false },
    { id: 'track-ticket-conditional-details', label: 'Conditional rendering of ticket details', checked: false },
    { id: 'track-ticket-dropdown-form', label: 'Forms used for dropdown selection', checked: false },
 
    { id: 'route-guard-implemented', label: 'Route Guard implemented', checked: false },
    { id: 'route-guard-role-check-mock', label: 'Role check using mock user data', checked: false },
    { id: 'route-guard-unauthorized-blocked', label: 'Unauthorized users blocked', checked: false },
    { id: 'routes-protected-by-role', label: 'Routes protected based on role', checked: false },
    { id: 'menu-items-by-role', label: 'Menu items conditionally shown by role', checked: false },
 
    { id: 'live-chat-route', label: 'Live Chat route /live-chat', checked: false },
    { id: 'live-chat-menu-nav', label: 'Live Chat navigation from menu', checked: false },
    { id: 'live-chat-role-placeholder', label: 'Role-based placeholder message', checked: false },
    { id: 'live-chat-placeholder-only', label: 'No real chat functionality (placeholder only)', checked: false },
 
    { id: 'reports-route', label: 'Reports route /reports', checked: false },
    { id: 'reports-menu-nav', label: 'Reports navigation from menu', checked: false },
    { id: 'reports-restricted-supervisor', label: 'Reports route restricted to Supervisor', checked: false },
    { id: 'reports-placeholder', label: 'Reports placeholder message', checked: false },
 
    { id: 'menu-based-routing', label: 'Menu-based routing', checked: false },
    { id: 'programmatic-routing-used', label: 'Programmatic routing used', checked: false },
    { id: 'route-params-correct', label: 'Route params used correctly', checked: false },
    { id: 'meaningful-routes', label: 'Predictable, meaningful routes', checked: false },
    { id: 'feature-folder-structure', label: 'Feature-based folder structure', checked: false },
    { id: 'separation-of-concerns', label: 'Separation of concerns', checked: false },
  ];
 
  ngOnInit(): void {
    this.restoreEvaluation();
  }
 
  onEvaluationToggle(item: EvaluationItem, checked: boolean): void {
    item.checked = checked;
    this.persistEvaluation();
  }
 
  private persistEvaluation(): void {
    if (!this.isBrowserStorageAvailable()) return;
    const state: Record<string, boolean> = {};
    for (const item of this.evaluationItems) state[item.id] = item.checked;
    localStorage.setItem(this.evaluationStorageKey, JSON.stringify(state));
  }
 
  private restoreEvaluation(): void {
    if (!this.isBrowserStorageAvailable()) return;
    const raw = localStorage.getItem(this.evaluationStorageKey);
    if (!raw) return;
 
    try {
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      for (const item of this.evaluationItems) {
        if (typeof parsed[item.id] === 'boolean') item.checked = parsed[item.id];
      }
    } catch {
      // Ignore invalid saved state
    }
  }
 
  private isBrowserStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}