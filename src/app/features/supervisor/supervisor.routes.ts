import { Routes } from '@angular/router';
import { LiveChat } from '../live-chat/live-chat';
import { Supervisor } from './supervisor';
import { TrackTicket } from '../track-ticket/track-ticket';


export const supervisorRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Supervisor },
  { path: 'track-ticket', component: TrackTicket },
  { path: 'track-ticket/:ticketId', component: TrackTicket },
  { path: 'live-chat', component: LiveChat },



];

