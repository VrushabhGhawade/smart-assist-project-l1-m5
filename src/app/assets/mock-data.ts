import { Menu } from "../core/models/menu.model";
import { RoleMenuMapping } from "../core/models/role-menu.model";
import { Ticket } from "../core/models/ticket.model";
import { User } from "../core/models/user.model";


export class MockData {


  static users: User[] = [

    {
      userId: 'U001',
      name: 'Amit Sharma',
      role: 1,
      email: 'amit.sharma@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U002',
      name: 'Priya Verma',
      role: 1,
      email: 'priya.verma@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U003',
      name: 'Rahul Mehta',
      role: 1,
      email: 'rahul.mehta@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U004',
      name: 'Sneha Iyer',
      role: 1,
      email: 'sneha.iyer@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U005',
      name: 'Vikas Reddy',
      role: 1,
      email: 'vikas.reddy@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U006',
      name: 'Neha Kapoor',
      role: 1,
      email: 'neha.kapoor@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U004',
      name: 'Arjun Malhotra',
      role: 1,
      email: 'arjun.malhotra@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U008',
      name: 'Suresh Patil',
      role: 2,
      email: 'suresh.patil@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U009',
      name: 'Kavita Nair',
      role: 2,
      email: 'kavita.nair@smartassist.com',
      password: '12345'
    },
    {
      userId: 'U010',
      name: 'Rajiv Khanna',
      role: 3,
      email: 'rajiv.khanna@smartassist.com',
      password: '12345'

    }

  ];

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
    { role: 1, menuIds: [1, 2, 3, 4, 5, 6] },
    { role: 2, menuIds: [1, 3, 4, 5] },
    { role: 3, menuIds: [1, 2, 3, 4, 5, 6] }
  ];

  // TICKETS
  static tickets: Ticket[] = [
    {
      ticketId: 23,
      createdByUserId: 'U001',
      createdByName: 'AAA',
      description: 'Home page is not loading',
      priority: 1,
      status: 2,
      createdAt: '2026-01-20T10:30:00Z',
      assignedToUserId: 'U002',
      assignedToName: 'Vishnu',
      rating: 4,
      feedback: 'Great experience!'
    },
    {
      ticketId: 22,
      createdByUserId: 'U001',
      createdByName: 'AAA',
      description: 'Unable to login',
      priority: 3,
      status: 3,
      createdAt: '2026-01-19T09:00:00Z',
      assignedToUserId: 'U003',
      assignedToName: 'Venkatesh',
      rating: 0,
      feedback: ''
    },
    {
      ticketId: 21,
      createdByUserId: 'U002',
      createdByName: 'Vishnu',
      description: 'Chat window not opening',
      priority: 2,
      status: 1,
      createdAt: '2026-01-21T08:15:00Z',
      assignedToUserId: undefined,
      assignedToName: undefined,
      rating: 0,
      feedback: ''
    },
    {
      ticketId: 20,
      createdByUserId: 'U003',
      createdByName: 'Venkatesh',
      description: 'Profile update failing',
      priority: 2,
      status: 2,
      createdAt: '2026-01-18T14:45:00Z',
      assignedToUserId: 'U001',
      assignedToName: 'AAA',
      rating: 3,
      feedback: 'Issue resolved slowly'
    },
    {
      ticketId: 19,
      createdByUserId: 'U004',
      createdByName: 'Vrushabh',
      description: 'Email notifications not received',
      priority: 1,
      status: 3,
      createdAt: '2026-01-17T11:20:00Z',
      assignedToUserId: 'U002',
      assignedToName: 'Vishnu',
      rating: 5,
      feedback: 'Quick and helpful'
    },
    {
      ticketId: 18,
      createdByUserId: 'U002',
      createdByName: 'Vishnu',
      description: 'Payment gateway error',
      priority: 1,
      status: 2,
      createdAt: '2026-01-16T16:10:00Z',
      assignedToUserId: 'U003',
      assignedToName: 'Venkatesh',
      rating: 4,
      feedback: 'Good support'
    },
    {
      ticketId: 17,
      createdByUserId: 'U001',
      createdByName: 'AAA',
      description: 'Page UI broken on mobile',
      priority: 2,
      status: 1,
      createdAt: '2026-01-21T07:40:00Z',
      assignedToUserId: undefined,
      assignedToName: undefined,
      rating: 0,
      feedback: ''
    },
    {
      ticketId: 16,
      createdByUserId: 'U001',
      createdByName: 'AAA',
      description: 'Forgot password link expired',
      priority: 3,
      status: 3,
      createdAt: '2026-01-15T09:55:00Z',
      assignedToUserId: 'U004',
      assignedToName: 'Vrushabh',
      rating: 5,
      feedback: 'Very satisfied'
    },
    {
      ticketId: 15,
      createdByUserId: 'U004',
      createdByName: 'Vrushabh',
      description: 'Slow dashboard loading',
      priority: 2,
      status: 2,
      createdAt: '2026-01-14T13:05:00Z',
      assignedToUserId: 'U001',
      assignedToName: 'AAA',
      rating: 4,
      feedback: 'Performance improved'
    },
    {
      ticketId: 14,
      createdByUserId: 'U002',
      createdByName: 'Vishnu',
      description: 'Export report not working',
      priority: 1,
      status: 3,
      createdAt: '2026-01-13T12:30:00Z',
      assignedToUserId: 'U002',
      assignedToName: 'Vishnu',
      rating: 5,
      feedback: 'Resolved quickly'
    },
    {
      ticketId: 13,
      createdByUserId: 'U003',
      createdByName: 'Venkatesh',
      description: 'Role permissions incorrect',
      priority: 2,
      status: 2,
      createdAt: '2026-01-12T10:10:00Z',
      assignedToUserId: 'U003',
      assignedToName: 'Venkatesh',
      rating: 3,
      feedback: 'Needs improvement'
    },
    {
      ticketId: 12,
      createdByUserId: 'U001',
      createdByName: 'AAA',
      description: 'OTP not received',
      priority: 1,
      status: 3,
      createdAt: '2026-01-11T08:50:00Z',
      assignedToUserId: 'U004',
      assignedToName: 'Vrushabh',
      rating: 5,
      feedback: 'Excellent response'
    },
    {
      ticketId: 11,
      createdByUserId: 'U003',
      createdByName: 'Venkatesh',
      description: 'File upload failing',
      priority: 2,
      status: 1,
      createdAt: '2026-01-21T06:30:00Z',
      assignedToUserId: undefined,
      assignedToName: undefined,
      rating: 0,
      feedback: ''
    },
    {
      ticketId: 10,
      createdByUserId: 'U002',
      createdByName: 'Vishnu',
      description: 'Notification badge count wrong',
      priority: 3,
      status: 2,
      createdAt: '2026-01-10T15:40:00Z',
      assignedToUserId: 'U004',
      assignedToName: 'Vrushabh',
      rating: 4,
      feedback: 'Solved after follow-up'
    },
    {
      ticketId: 9,
      createdByUserId: 'U004',
      createdByName: 'Vrushabh',
      description: 'Session timeout too fast',
      priority: 3,
      status: 3,
      createdAt: '2026-01-09T17:25:00Z',
      assignedToUserId: 'U002',
      assignedToName: 'Vishnu',
      rating: 5,
      feedback: 'Great handling'
    }
  ];


}
