
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Image, Link, FileText, Send, X } from 'lucide-react';
import { currentUser } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';

interface CreatePostProps {
  className?: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ className }) => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachments, setAttachments] = useState<{ type: 'image' | 'document', name: string, preview?: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (e.target.value.length > 0 && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleImageAttachment = () => {
    // Mock file selection
    const mockImage = {
      type: 'image' as const,
      name: 'example-image.jpg',
      preview: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
    
    setAttachments([...attachments, mockImage]);
    setIsExpanded(true);
  };

  const handleDocumentAttachment = () => {
    // Mock file selection
    const mockDocument = {
      type: 'document' as const,
      name: 'presentation.pdf',
    };
    
    setAttachments([...attachments, mockDocument]);
    setIsExpanded(true);
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = () => {
    if (!postContent.trim() && attachments.length === 0) return;
    
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setPostContent('');
      setAttachments([]);
      setIsExpanded(false);
      setIsSubmitting(false);
      toast({
        title: "Post created",
        description: "Your post has been successfully created.",
      });
    }, 1000);
  };

  return (
    <div className={cn("post-card", className)}>
      <div className="flex items-start space-x-3">
        <img 
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            placeholder="Share something with your network..."
            className="w-full bg-secondary/50 rounded-lg p-3 text-sm outline-none resize-none transition-all duration-200 focus:ring-2 focus:ring-brand-300/50 min-h-[60px]"
            value={postContent}
            onChange={handleContentChange}
            onFocus={() => setIsExpanded(true)}
            rows={isExpanded ? 4 : 2}
          />
          
          {attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {attachments.map((attachment, index) => (
                <div 
                  key={index} 
                  className="relative group bg-secondary/50 rounded-lg p-2 pr-8"
                >
                  {attachment.type === 'image' && attachment.preview && (
                    <div className="relative">
                      <img 
                        src={attachment.preview} 
                        alt={attachment.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  {attachment.type === 'document' && (
                    <div className="flex items-center space-x-2">
                      <FileText size={16} />
                      <span className="text-xs truncate max-w-[120px]">{attachment.name}</span>
                    </div>
                  )}
                  
                  <button 
                    className="absolute top-1 right-1 opacity-50 hover:opacity-100 transition-opacity duration-200"
                    onClick={() => removeAttachment(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {isExpanded && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button 
                  className="btn-icon"
                  onClick={handleImageAttachment}
                >
                  <Image size={18} />
                </button>
                <button 
                  className="btn-icon"
                  onClick={handleDocumentAttachment}
                >
                  <FileText size={18} />
                </button>
                <button className="btn-icon">
                  <Link size={18} />
                </button>
              </div>
              
              <button 
                className={cn("btn-primary flex items-center space-x-2", {
                  "opacity-50 cursor-not-allowed": isSubmitting || (!postContent.trim() && attachments.length === 0)
                })}
                onClick={handleSubmit}
                disabled={isSubmitting || (!postContent.trim() && attachments.length === 0)}
              >
                <span>Post</span>
                <Send size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
