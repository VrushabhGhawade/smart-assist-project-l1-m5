import { Menu } from "../core/models/menu.model";
import { RoleMenuMapping } from "../core/models/role-menu.model";
import { Ticket } from "../core/models/ticket.model";
import { User } from "../core/models/user.model";


export class MockData {

    // USERS
    static users: User[] = [
        {
            userId: 'U001',
            name: 'AAA',
            role: 'USER',
            email: 'aaa@smartassist.com',
            password: '12345'
        },
        {
            userId: 'U002',
            name: 'Vishnu',
            role: 'SUPPORT_ENGINEER',
            email: 'vishnu@smartassist.com',
            password: '12345'
        },
        {
            userId: 'U003',
            name: 'Venkatesh',
            role: 'SUPPORT_ENGINEER',
            email: 'venkatesh@smartassist.com',
            password: '12345'
        },
        {
            userId: 'U004',
            name: 'Vrushabh',
            role: 'ADMIN',
            email: 'admin@smartassist.com',
            password: '12345'
        }
    ];

    // MENUS
    static menus: Menu[] = [
        { menuId: 1, menuName: 'Home', icon: 'home', route: '/home' },
        { menuId: 2, menuName: 'Create Ticket', icon: 'add_circle', route: '/create-ticket' },
        { menuId: 3, menuName: 'My Tickets', icon: 'confirmation_number', route: '/my-tickets' },
        { menuId: 4, menuName: 'Track Ticket', icon: 'track_changes', route: '/track-ticket' },
        { menuId: 5, menuName: 'Live Chat', icon: 'chat', route: '/live-chat' },
        { menuId: 6, menuName: 'AI Assistant', icon: 'smart_toy', route: '/ai-assistant' }
    ];

    // ROLE ↔ MENU
    static roleMenuMapping: RoleMenuMapping[] = [
        { role: 'USER', menuIds: [1, 2, 3, 4] },
        { role: 'SUPPORT_ENGINEER', menuIds: [1, 3, 4, 5] },
        { role: 'ADMIN', menuIds: [1, 2, 3, 4, 5, 6] }
    ];

    // TICKETS
   static tickets: Ticket[] = [
  {
    ticketId: 23,
    createdByUserId: 'U001',
    description: 'Home page is not loading',
    priority: 1,
    status: 2,
    createdAt: '2026-01-20T10:30:00Z',
    age: 1,
    assignedToUserId: 'U002',
    rating: 4,
    feedback: 'Great experience!'
  },
  {
    ticketId: 22,
    createdByUserId: 'U001',
    description: 'Unable to login',
    priority: 3,
    status: 3,
    createdAt: '2026-01-19T09:00:00Z',
    age: 2,
    assignedToUserId: 'U003',
    rating: 0,
    feedback: ''
  },
  {
    ticketId: 21,
    createdByUserId: 'U002',
    description: 'Chat window not opening',
    priority: 2,
    status: 1,
    createdAt: '2026-01-21T08:15:00Z',
    age: 0,
    assignedToUserId: undefined,
    rating: 0,
    feedback: ''
  },
  {
    ticketId: 20,
    createdByUserId: 'U003',
    description: 'Profile update failing',
    priority: 2,
    status: 2,
    createdAt: '2026-01-18T14:45:00Z',
    age: 3,
    assignedToUserId: 'U001',
    rating: 3,
    feedback: 'Issue resolved slowly'
  },
  {
    ticketId: 19,
    createdByUserId: 'U004',
    description: 'Email notifications not received',
    priority: 1,
    status: 3,
    createdAt: '2026-01-17T11:20:00Z',
    age: 4,
    assignedToUserId: 'U002',
    rating: 5,
    feedback: 'Quick and helpful'
  },
  {
    ticketId: 18,
    createdByUserId: 'U002',
    description: 'Payment gateway error',
    priority: 1,
    status: 2,
    createdAt: '2026-01-16T16:10:00Z',
    age: 5,
    assignedToUserId: 'U003',
    rating: 4,
    feedback: 'Good support'
  },
  {
    ticketId: 17,
    createdByUserId: 'U005',
    description: 'Page UI broken on mobile',
    priority: 2,
    status: 1,
    createdAt: '2026-01-21T07:40:00Z',
    age: 0,
    assignedToUserId: undefined,
    rating: 0,
    feedback: ''
  },
  {
    ticketId: 16,
    createdByUserId: 'U001',
    description: 'Forgot password link expired',
    priority: 3,
    status: 3,
    createdAt: '2026-01-15T09:55:00Z',
    age: 6,
    assignedToUserId: 'U004',
    rating: 5,
    feedback: 'Very satisfied'
  },
  {
    ticketId: 15,
    createdByUserId: 'U004',
    description: 'Slow dashboard loading',
    priority: 2,
    status: 2,
    createdAt: '2026-01-14T13:05:00Z',
    age: 7,
    assignedToUserId: 'U001',
    rating: 4,
    feedback: 'Performance improved'
  },
  {
    ticketId: 14,
    createdByUserId: 'U006',
    description: 'Export report not working',
    priority: 1,
    status: 3,
    createdAt: '2026-01-13T12:30:00Z',
    age: 8,
    assignedToUserId: 'U002',
    rating: 5,
    feedback: 'Resolved quickly'
  },
  {
    ticketId: 13,
    createdByUserId: 'U002',
    description: 'Role permissions incorrect',
    priority: 2,
    status: 2,
    createdAt: '2026-01-12T10:10:00Z',
    age: 9,
    assignedToUserId: 'U003',
    rating: 3,
    feedback: 'Needs improvement'
  },
  {
    ticketId: 12,
    createdByUserId: 'U007',
    description: 'OTP not received',
    priority: 1,
    status: 3,
    createdAt: '2026-01-11T08:50:00Z',
    age: 10,
    assignedToUserId: 'U001',
    rating: 5,
    feedback: 'Excellent response'
  },
  {
    ticketId: 11,
    createdByUserId: 'U003',
    description: 'File upload failing',
    priority: 2,
    status: 1,
    createdAt: '2026-01-21T06:30:00Z',
    age: 0,
    assignedToUserId: undefined,
    rating: 0,
    feedback: ''
  },
  {
    ticketId: 10,
    createdByUserId: 'U005',
    description: 'Notification badge count wrong',
    priority: 3,
    status: 2,
    createdAt: '2026-01-10T15:40:00Z',
    age: 11,
    assignedToUserId: 'U004',
    rating: 4,
    feedback: 'Solved after follow-up'
  },
  {
    ticketId: 9,
    createdByUserId: 'U006',
    description: 'Session timeout too fast',
    priority: 3,
    status: 3,
    createdAt: '2026-01-09T17:25:00Z',
    age: 12,
    assignedToUserId: 'U002',
    rating: 5,
    feedback: 'Great handling'
  }
];

}
