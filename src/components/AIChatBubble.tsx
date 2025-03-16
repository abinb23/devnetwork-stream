
import React, { useState } from 'react';
import { Bot, X, Send, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi there! How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessage = { role: 'user' as const, content: message };
    setChatMessages([...chatMessages, newMessage]);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'This is a demo AI assistant. In a real application, I would connect to an AI service to provide actual responses.'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const clearChat = () => {
    setChatMessages([{ role: 'assistant', content: 'How can I help you today?' }]);
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
    });
  };

  // If in full screen mode, render in Dialog
  if (isFullScreen) {
    return (
      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
          <div className="flex justify-between items-center pb-2 border-b">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-primary" />
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
                <X size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleFullScreen} title="Minimize">
                <ChevronDown size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    msg.role === 'user' 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted max-w-[80%] rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="animate-bounce">•</span>
                    <span className="animate-bounce delay-100">•</span>
                    <span className="animate-bounce delay-200">•</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="min-h-[60px] resize-none"
              />
              <Button disabled={isLoading} onClick={handleSendMessage} size="icon">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Regular chat bubble UI
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "rounded-full w-14 h-14 shadow-lg transition-all hover:scale-105",
              isOpen ? "bg-primary/90" : "bg-primary"
            )}
            size="icon"
          >
            {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 p-0" align="end">
          <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
              <div className="flex items-center gap-2">
                <Bot size={18} className="text-primary" />
                <span className="font-medium text-sm">AI Assistant</span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleFullScreen} title="Expand">
                <ChevronUp size={16} />
              </Button>
            </CardHeader>
            
            <CardContent className="p-4 pt-2 h-[300px] overflow-y-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex w-full",
                    msg.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-lg p-2 text-sm",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted max-w-[80%] rounded-lg p-2 text-sm">
                    <div className="flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-100">•</span>
                      <span className="animate-bounce delay-200">•</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="p-4 pt-2">
              <div className="flex gap-2 w-full">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="min-h-[40px] text-sm resize-none"
                />
                <Button disabled={isLoading} onClick={handleSendMessage} size="icon" className="shrink-0">
                  <Send size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AIChatBubble;
