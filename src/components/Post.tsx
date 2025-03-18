
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark, AlertTriangle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { checkModerationResults } from '@/services/moderationService';
import { toast } from '@/hooks/use-toast';

interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface PostProps {
  id: number | string;
  author: Author;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  className?: string;
  pending_moderation?: boolean;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  timestamp,
  content,
  image,
  likes,
  comments,
  shares,
  liked: initialLiked,
  className,
  pending_moderation = false,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(likes);
  const [saved, setSaved] = useState(false);
  const [isModerated, setIsModerated] = useState(!pending_moderation);
  const [isVisible, setIsVisible] = useState(true);
  
  const postRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: 100,
  });

  // Check moderation status periodically if post is pending moderation
  useEffect(() => {
    if (pending_moderation) {
      const checkInterval = setInterval(async () => {
        const result = await checkModerationResults(id.toString());
        
        if (result) {
          clearInterval(checkInterval);
          setIsModerated(true);
          
          // If the post should be deleted based on moderation
          if (result.should_delete) {
            toast({
              title: "Post removed",
              description: "This post has been removed due to policy violations.",
              variant: "destructive"
            });
            
            // Hide the post after a short delay
            setTimeout(() => {
              setIsVisible(false);
            }, 3000);
          }
        }
      }, 5000); // Check every 5 seconds
      
      return () => clearInterval(checkInterval);
    }
  }, [id, pending_moderation]);

  const toggleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={postRef}
      className={cn("post-card relative", className, {
        "opacity-80": pending_moderation && !isModerated
      })}
    >
      {/* Moderation badge */}
      {pending_moderation && !isModerated && (
        <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
          <AlertTriangle size={12} className="mr-1" />
          <span>Under review</span>
        </div>
      )}
      
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <img 
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-sm">{author.name}</h3>
            <p className="text-xs text-muted-foreground">{author.role}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{timestamp}</p>
          </div>
        </div>
        <button className="btn-icon">
          <MoreHorizontal size={18} />
        </button>
      </div>
      
      <div className="mt-3">
        <p className="text-sm leading-relaxed">{content}</p>
        
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden bg-secondary/50">
            <img 
              src={image} 
              alt="Post attachment"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span>{likesCount}</span>
            <span className="ml-1">likes</span>
          </div>
          <div className="flex items-center">
            <span>{comments}</span>
            <span className="ml-1">comments</span>
          </div>
          <div className="flex items-center">
            <span>{shares}</span>
            <span className="ml-1">shares</span>
          </div>
        </div>
        <button 
          className={cn("btn-icon", { "text-brand-500": saved })}
          onClick={toggleSave}
        >
          <Bookmark size={16} className={cn({ "fill-brand-500": saved })} />
        </button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-3 gap-2">
        <button 
          className={cn("btn-icon flex-1 justify-center", { "text-brand-500": liked })}
          onClick={toggleLike}
        >
          <Heart size={18} className={cn("mr-2", { "fill-brand-500": liked })} />
          <span>Like</span>
        </button>
        <button className="btn-icon flex-1 justify-center">
          <MessageCircle size={18} className="mr-2" />
          <span>Comment</span>
        </button>
        <button className="btn-icon flex-1 justify-center">
          <Share2 size={18} className="mr-2" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
