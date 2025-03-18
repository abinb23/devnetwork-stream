
/**
 * Service to handle content moderation API calls
 */

// Function to send post content for moderation
export const sendPostForModeration = async (postId: string, content: string, attachments: string[] = []) => {
  try {
    // In a real environment, this would be an API call to your Python backend
    // For now, we'll simulate storing in the SQLite DB by saving to localStorage
    
    // Get existing posts or initialize empty array
    const savedPosts = JSON.parse(localStorage.getItem('moderationPosts') || '[]');
    
    // Add new post to moderation queue
    savedPosts.push({
      post_id: postId,
      post_content: content,
      post_attachment: JSON.stringify(attachments),
      processed: 0
    });
    
    // Save back to localStorage
    localStorage.setItem('moderationPosts', JSON.stringify(savedPosts));
    
    console.log(`Post ${postId} sent for moderation`);
    
    // In production, this would be something like:
    // return await fetch('/api/moderate-post', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ postId, content, attachments })
    // }).then(res => res.json());

    return { success: true, message: "Post sent for moderation" };
  } catch (error) {
    console.error("Error sending post for moderation:", error);
    return { success: false, message: "Failed to send post for moderation" };
  }
};

// Function to check moderation results
export const checkModerationResults = async (postId: string) => {
  try {
    // In a real environment, this would query your Python backend
    // For now, we'll simulate by checking localStorage
    
    // This would be a real API call in production:
    // return await fetch(`/api/moderation-results/${postId}`).then(res => res.json());
    
    // For demo, we'll return a mock result after a delay
    return new Promise(resolve => {
      setTimeout(() => {
        // Random toxicity scores for demo
        const toxicityScore = Math.random() * 100;
        const threatLevelScore = Math.random() * 100;
        const nonEducationalScore = Math.random() * 100;
        
        const shouldDelete = 
          toxicityScore >= 70 || 
          threatLevelScore >= 70 || 
          nonEducationalScore >= 70;
        
        resolve({
          post_id: postId,
          toxicity_score: Math.round(toxicityScore * 100) / 100,
          threat_level_score: Math.round(threatLevelScore * 100) / 100,
          non_educational_score: Math.round(nonEducationalScore * 100) / 100,
          description: shouldDelete ? "Content violates guidelines" : "Content approved",
          message: shouldDelete ? "It should be deleted." : "The post can retain.",
          should_delete: shouldDelete
        });
      }, 1500); // Simulate delay
    });
  } catch (error) {
    console.error("Error checking moderation results:", error);
    return null;
  }
};
