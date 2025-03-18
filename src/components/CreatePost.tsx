
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Image, Link, FileText, Send, X } from 'lucide-react';
import { currentUser } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';
import { sendPostForModeration } from '@/services/moderationService';

interface CreatePostProps {
  className?: string;
  onPostCreated?: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ className, onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachments, setAttachments] = useState<{ type: 'image' | 'document', name: string, preview?: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (e.target.value.length > 0 && !isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleImageAttachment = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const isImage = file.type.startsWith('image/');
    
    // Create a blob URL for the image preview
    const previewUrl = isImage ? URL.createObjectURL(file) : undefined;
    
    const fileObj = {
      type: isImage ? 'image' as const : 'document' as const,
      name: file.name,
      preview: previewUrl
    };
    
    setAttachments([...attachments, fileObj]);
    setIsExpanded(true);
    
    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    
    // Revoke object URL to prevent memory leaks
    if (newAttachments[index].preview) {
      URL.revokeObjectURL(newAttachments[index].preview!);
    }
    
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = async () => {
    if (!postContent.trim() && attachments.length === 0) return;
    
    setIsSubmitting(true);
    
    // Get the image preview from the first image attachment (if any)
    const imagePreview = attachments.find(a => a.type === 'image')?.preview;
    
    // Create new post object
    const postId = Date.now().toString();
    const newPost = {
      id: postId,
      author: currentUser,
      timestamp: 'Just now',
      content: postContent,
      image: imagePreview, // Ensure image URL is included
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      pending_moderation: true
    };
    
    // Prepare attachments for moderation
    const attachmentUrls = attachments
      .filter(att => att.preview)
      .map(att => att.preview as string);
    
    console.log("Sending post with image:", imagePreview);
    
    // Send post for moderation
    await sendPostForModeration(
      postId, 
      postContent,
      attachmentUrls
    );
    
    // Call the callback to add the post to the feed
    if (onPostCreated) {
      onPostCreated(newPost);
    }
    
    // Reset the form
    setPostContent('');
    
    // Revoke all object URLs before clearing attachments
    attachments.forEach(attachment => {
      if (attachment.preview) {
        URL.revokeObjectURL(attachment.preview);
      }
    });
    
    setAttachments([]);
    setIsExpanded(false);
    setIsSubmitting(false);
    
    toast({
      title: "Post created",
      description: "Your post is being reviewed and will appear in the feed shortly.",
    });
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
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelected}
            accept="image/*"
            className="hidden"
          />
          
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
