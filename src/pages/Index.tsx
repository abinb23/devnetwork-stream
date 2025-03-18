
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/ProfileSidebar';
import CreatePost from '@/components/CreatePost';
import Post from '@/components/Post';
import SuggestedUsers from '@/components/SuggestedUsers';
import AIChatBubble from '@/components/AIChatBubble';
import { feedPosts, currentUser } from '@/utils/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const isMobile = useIsMobile();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [posts, setPosts] = useState(feedPosts);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePostCreated = (newPost: any) => {
    console.log("New post created:", newPost);
    console.log("Post has image:", newPost.image ? "Yes" : "No");
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    
    // If the post is pending moderation, show a notification
    if (newPost.pending_moderation) {
      toast({
        title: "Post moderation",
        description: "Your post will be visible after review. This may take a few minutes.",
      });
    }
  };

  // Remove posts that fail moderation
  const handlePostRemoved = (postId: string | number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 max-w-[1920px] mx-auto">
        {/* Mobile: Profile and Suggestions */}
        {isMobile && (
          <>
            <div className="mt-4">
              <ProfileSidebar isMobile />
            </div>
            <div className="h-px w-full bg-border/50 my-4"></div>
          </>
        )}
        
        {/* Main Content */}
        <div className="flex w-full p-4 gap-6">
          {/* Left Sidebar */}
          {!isMobile && (
            <ProfileSidebar className="hidden md:block" />
          )}
          
          {/* Feed */}
          <div className="flex-1 max-w-3xl mx-auto">
            <CreatePost 
              className="mb-6" 
              onPostCreated={handlePostCreated}
            />
            
            <div className="space-y-6">
              {posts.map((post) => (
                <Post 
                  key={post.id}
                  {...post}
                />
              ))}
            </div>
          </div>
          
          {/* Right Sidebar */}
          {!isMobile && (
            <SuggestedUsers className="hidden lg:block" />
          )}
        </div>
        
        {/* Mobile Suggested Users */}
        {isMobile && (
          <>
            <div className="h-px w-full bg-border/50 my-4"></div>
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2 px-4">People to follow</h3>
              <SuggestedUsers isMobile />
            </div>
          </>
        )}
      </main>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 p-4 rounded-full bg-brand-500 text-white shadow-md transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <ArrowUp size={20} />
      </button>
      
      {/* AI Chat Bubble */}
      <AIChatBubble />
    </div>
  );
};

export default Index;
