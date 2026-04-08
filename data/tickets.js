export const ticketsData = [
  {
    id: 1,
    title: "Login page not loading",
    customer: "John Smith",
    email: "john@company.com",
    status: "open",
    priority: "high",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    createdAt: "2024-01-15",
    messages: [
      {
        id: 1,
        author: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        content: "Hi, I'm unable to access the login page. It keeps showing a blank screen.",
        timestamp: "10:30 AM",
        isPrivate: false,
        type: "customer"
      },
      {
        id: 2,
        author: "Support Agent",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        content: "Thank you for reporting this. Can you please clear your browser cache and try again?",
        timestamp: "10:45 AM",
        isPrivate: false,
        type: "agent"
      },
      {
        id: 3,
        author: "Support Agent",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        content: "This might be a browser compatibility issue. Let me check with our dev team.",
        timestamp: "10:50 AM",
        isPrivate: true,
        type: "agent"
      }
    ]
  },
  {
    id: 2,
    title: "Payment processing failed",
    customer: "Sarah Johnson",
    email: "sarah@business.com",
    status: "in-progress",
    priority: "critical",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    createdAt: "2024-01-16",
    messages: [
      {
        id: 1,
        author: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        content: "My payment keeps failing even though I have sufficient balance.",
        timestamp: "2:15 PM",
        isPrivate: false,
        type: "customer"
      },
      {
        id: 2,
        author: "Support Agent",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        content: "I'll investigate this immediately. Can you provide your transaction ID?",
        timestamp: "2:30 PM",
        isPrivate: false,
        type: "agent"
      }
    ]
  },
  {
    id: 3,
    title: "Feature request: Dark mode",
    customer: "Mike Chen",
    email: "mike@startup.io",
    status: "pending",
    priority: "low",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    createdAt: "2024-01-17",
    messages: [
      {
        id: 1,
        author: "Mike Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        content: "Would love to see a dark mode option for the dashboard.",
        timestamp: "4:20 PM",
        isPrivate: false,
        type: "customer"
      }
    ]
  },
  {
    id: 4,
    title: "Account deletion request",
    customer: "Emily Davis",
    email: "emily@email.com",
    status: "open",
    priority: "high",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    createdAt: "2024-01-18",
    messages: [
      {
        id: 1,
        author: "Emily Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        content: "I would like to delete my account and all associated data.",
        timestamp: "11:00 AM",
        isPrivate: false,
        type: "customer"
      }
    ]
  },
  {
    id: 5,
    title: "API integration help",
    customer: "Alex Rodriguez",
    email: "alex@devteam.com",
    status: "in-progress",
    priority: "medium",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    createdAt: "2024-01-19",
    messages: [
      {
        id: 1,
        author: "Alex Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        content: "I'm having trouble integrating the REST API. Documentation is unclear.",
        timestamp: "9:15 AM",
        isPrivate: false,
        type: "customer"
      },
      {
        id: 2,
        author: "Support Agent",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
        content: "I'll send you a detailed integration guide. What's your tech stack?",
        timestamp: "9:30 AM",
        isPrivate: false,
        type: "agent"
      }
    ]
  }
];
