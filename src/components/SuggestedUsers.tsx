
import React from 'react';
import { cn } from '@/lib/utils';
import { suggestedUsers } from '@/utils/mockData';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MoreHorizontal, Plus, RefreshCw } from 'lucide-react';

interface SuggestedUsersProps {
  className?: string;
  isMobile?: boolean;
}

const SuggestedUsers: React.FC<SuggestedUsersProps> = ({ className, isMobile = false }) => {
  const containerRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: 200,
  });

  if (isMobile) {
    return (
      <div className={cn("flex overflow-x-auto scrollbar-hide gap-4 pb-4 px-4", className)}>
        {suggestedUsers.map((user) => (
          <div 
            key={user.id}
            className="flex-shrink-0 w-56 profile-card"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-sm">{user.name}</h3>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {user.mutualConnections} mutual connections
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-3 gap-2">
              <button className="btn-primary flex-1 text-xs py-1.5 flex items-center justify-center">
                <Plus size={14} className="mr-1" />
                <span>Connect</span>
              </button>
              <button className="btn-icon">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={cn("w-64 flex-shrink-0", className)}
    >
      <div className="profile-card mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-sm">People to follow</h3>
          <button className="btn-icon">
            <RefreshCw size={14} />
          </button>
        </div>

        <div className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="user-suggestion">
              <img 
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user.mutualConnections} mutual connections
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full text-brand-500 text-sm font-medium mt-4">
          View all suggestions
        </button>
      </div>

      <div className="profile-card">
        <h3 className="font-medium text-sm mb-3">Trending Topics</h3>
        
        <div className="flex flex-wrap gap-2">
          <a href="#" className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/80 transition-colors duration-200">
            #MachineLearning
          </a>
          <a href="#" className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/80 transition-colors duration-200">
            #WebDevelopment
          </a>
          <a href="#" className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/80 transition-colors duration-200">
            #AI
          </a>
          <a href="#" className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/80 transition-colors duration-200">
            #CloudComputing
          </a>
          <a href="#" className="text-xs px-3 py-1.5 bg-secondary rounded-full hover:bg-secondary/80 transition-colors duration-200">
            #DevOps
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuggestedUsers;
