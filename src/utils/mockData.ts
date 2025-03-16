
// Mock user profile data
export const currentUser = {
  id: 1,
  name: "Alex Johnson",
  username: "@alexjohnson",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
  role: "Frontend Developer",
  connections: 467,
  progress: 68, // Percentage of course completed
  courseName: "Advanced React Patterns",
};

// Mock feed posts
export const feedPosts = [
  {
    id: 1,
    author: {
      id: 2,
      name: "Emily Chen",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    },
    timestamp: "2 hours ago",
    content: "Just published a new case study on reimagining user experience for educational platforms. Check it out and let me know your thoughts!",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    likes: 124,
    comments: 18,
    shares: 8,
    liked: false,
  },
  {
    id: 2,
    author: {
      id: 3,
      name: "Marco Rodriguez",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    },
    timestamp: "5 hours ago",
    content: "Just deployed a new cloud architecture that reduced our API response times by 40%. Here's how we did it using serverless functions and edge computing.",
    likes: 232,
    comments: 31,
    shares: 15,
    liked: true,
  },
  {
    id: 3,
    author: {
      id: 4,
      name: "Sophia Williams",
      role: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    },
    timestamp: "1 day ago",
    content: "Excited to share my latest research on machine learning applications for educational content recommendation. We've seen a 28% increase in student engagement using our new algorithms.",
    image: "https://images.unsplash.com/photo-1555952517-f8f7ce69229f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=800&q=80",
    likes: 315,
    comments: 42,
    shares: 23,
    liked: false,
  },
  {
    id: 4,
    author: {
      id: 5,
      name: "David Kim",
      role: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    },
    timestamp: "2 days ago",
    content: "Here's a quick guide on implementing CI/CD pipelines for your project. These best practices have saved our team countless hours of debugging and deployment issues.",
    likes: 178,
    comments: 24,
    shares: 12,
    liked: false,
  },
];

// Mock suggested users
export const suggestedUsers = [
  {
    id: 6,
    name: "Jessica Lee",
    role: "Mobile Developer",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    mutualConnections: 12,
  },
  {
    id: 7,
    name: "Thomas Martin",
    role: "UI Developer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    mutualConnections: 8,
  },
  {
    id: 8,
    name: "Priya Sharma",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    mutualConnections: 15,
  },
  {
    id: 9,
    name: "Michael Foster",
    role: "Backend Developer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80",
    mutualConnections: 6,
  },
];
