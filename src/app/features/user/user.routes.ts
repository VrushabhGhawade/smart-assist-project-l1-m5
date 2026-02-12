import { Routes } from '@angular/router';
import { CreateTicket } from './create-ticket/create-ticket';
import { canComponentDeactivateGuard } from '../../core/Guard/can-component-deactivate-guard';
import { MyTicket } from './my-ticket/my-ticket';
import { TrackTicket } from '../track-ticket/track-ticket';
import { LiveChat } from '../live-chat/live-chat';
import { AiAssistant } from '../ai-assistant/ai-assistant';
import { UserComponent } from './user';

export const userRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UserComponent },
  { path: 'create-ticket', component: CreateTicket,canDeactivate: [canComponentDeactivateGuard] },
  { path: 'my-ticket', component: MyTicket},
  { path: 'track-ticket', component: TrackTicket},
  { path: 'track-ticket/:ticketId', component: TrackTicket},

  { path: 'live-chat', component: LiveChat},
  { path: 'ai-assistant', component: AiAssistant}


];

