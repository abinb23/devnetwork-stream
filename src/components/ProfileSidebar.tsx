import React from 'react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/utils/mockData';
import ProgressCircle from '@/components/ui/ProgressCircle';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Backpack, BookOpen, Bookmark, ChevronRight, GraduationCap, MessageSquare, User, Users } from 'lucide-react';

interface ProfileSidebarProps {
  className?: string;
  isMobile?: boolean;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ className, isMobile = false }) => {
  const profileRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: 100,
  });
  
  const courseRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: 200,
  });
  
  const linksRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: 300,
  });

  if (isMobile) {
    return (
      <div className={cn("flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-4", className)}>
        <div className="flex-shrink-0 w-56 h-32 profile-card">
          <div className="flex items-center space-x-3">
            <img 
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-sm">{currentUser.name}</h3>
              <p className="text-xs text-muted-foreground">{currentUser.role}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Connections</p>
              <p className="font-medium">{currentUser.connections}</p>
            </div>
            <button className="text-xs text-brand-500 font-medium">View Profile</button>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-56 h-32 profile-card">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-sm">My Learning</h3>
              <p className="text-xs text-muted-foreground mt-1">{currentUser.courseName}</p>
            </div>
            <ProgressCircle 
              value={currentUser.progress} 
              size={40} 
              strokeWidth={5}
              color="rgb(14, 165, 233)"
            />
          </div>
          <button className="mt-3 w-full text-xs btn-secondary flex justify-center items-center">
            <span>Continue Learning</span>
            <ChevronRight size={14} className="ml-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-64 flex-shrink-0", className)}>
      <div 
        ref={profileRef}
        className="profile-card mb-4"
      >
        <div className="flex flex-col items-center text-center">
          <img 
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <h3 className="font-semibold mt-2">{currentUser.name}</h3>
          <p className="text-xs text-muted-foreground">{currentUser.role}</p>
          <p className="text-xs text-muted-foreground mt-1">{currentUser.username}</p>
          
          <div className="w-full h-px bg-border my-3"></div>
          
          <div className="grid grid-cols-2 w-full gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Connections</p>
              <p className="font-medium">{currentUser.connections}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Followers</p>
              <p className="font-medium">218</p>
            </div>
          </div>

          <button className="btn-primary w-full mt-4 text-sm">
            View Profile
          </button>
        </div>
      </div>
      
      <div 
        ref={courseRef}
        className="profile-card mb-4"
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-sm">My Learning</h3>
          <ProgressCircle 
            value={currentUser.progress} 
            size={40} 
            strokeWidth={5}
            color="rgb(14, 165, 233)"
          />
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">{currentUser.courseName}</p>
        
        <div className="w-full bg-secondary rounded-full h-1.5 mt-3">
          <div 
            className="bg-brand-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${currentUser.progress}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-right mt-1 text-muted-foreground">
          {currentUser.progress}% complete
        </p>
        
        <button className="btn-secondary w-full mt-3 text-sm">
          Continue Learning
        </button>
      </div>
      
      <div 
        ref={linksRef}
        className="profile-card"
      >
        <h3 className="font-medium text-sm mb-3">Quick Links</h3>
        
        <nav className="flex flex-col space-y-1">
          <a href="/courses" className="sidebar-link">
            <BookOpen size={16} className="text-brand-500" />
            <span className="text-sm">Courses</span>
          </a>
          <a href="/resources" className="sidebar-link">
            <Bookmark size={16} />
            <span className="text-sm">Resources</span>
          </a>
          <a href="/messages" className="sidebar-link">
            <MessageSquare size={16} />
            <span className="text-sm">Messages</span>
          </a>
          <a href="/connections" className="sidebar-link">
            <Users size={16} />
            <span className="text-sm">Connections</span>
          </a>
          <a href="/credentials" className="sidebar-link">
            <GraduationCap size={16} />
            <span className="text-sm">Credentials</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default ProfileSidebar;
