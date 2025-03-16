
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface PostProps {
  id: number;
  author: Author;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  className?: string;
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
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(likes);
  const [saved, setSaved] = useState(false);
  
  const postRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.1,
    delay: 100,
  });

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

  return (
    <div 
      ref={postRef}
      className={cn("post-card", className)}
    >
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
