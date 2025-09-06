// Content filtering utility for inappropriate language
export class ContentFilter {
  private static inappropriateWords = [
    // English inappropriate words
    'fuck', 'shit', 'damn', 'bitch', 'asshole', 'bastard', 'crap', 'piss',
    'hell', 'stupid', 'idiot', 'moron', 'dumb', 'retard', 'gay', 'fag',
    
    // Hindi inappropriate words (transliterated)
    'chutiya', 'madarchod', 'bhenchod', 'randi', 'saala', 'kamina', 'harami',
    'gandu', 'bhosdike', 'laude', 'lund', 'gaand', 'chut', 'raand',
    'kutte', 'kamine', 'badtameez', 'bewakoof', 'pagal', 'ullu'
  ];

  private static warningMessages = [
    "⚠️ Please use respectful language! EcoBuddy promotes positive communication. Let's keep our conversation friendly and eco-conscious! 🌱",
    "🚫 That language isn't appropriate here. I'm here to help with sustainable shopping and eco-friendly tips. Let's chat respectfully! 💚",
    "⚠️ Let's keep our conversation positive and respectful! I'm excited to help you with sustainable products and eco-tips instead! 🌍",
    "🌱 Please use kind words! EcoBuddy believes in spreading positivity along with sustainability. How can I help you today?",
    "💚 Respectful communication makes our eco-community stronger! Let's focus on finding amazing sustainable products together!"
  ];

  private static blockMessage = "🔒 Your chat has been temporarily blocked for 5 minutes due to repeated inappropriate language. EcoBuddy promotes respectful communication in our eco-community. Please return with positive energy! 🌱";

  public static checkContent(message: string): {
    isInappropriate: boolean;
    warningMessage?: string;
  } {
    const lowerMessage = message.toLowerCase();
    
    const hasInappropriateContent = this.inappropriateWords.some(word => 
      lowerMessage.includes(word.toLowerCase())
    );

    if (hasInappropriateContent) {
      const randomWarning = this.warningMessages[
        Math.floor(Math.random() * this.warningMessages.length)
      ];
      
      return {
        isInappropriate: true,
        warningMessage: randomWarning
      };
    }

    return { isInappropriate: false };
  }

  public static getBlockMessage(): string {
    return this.blockMessage;
  }

  public static getTimeRemaining(blockTime: number): string {
    const now = Date.now();
    const timeLeft = Math.max(0, blockTime - now);
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}