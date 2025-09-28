
import { QuoteData } from '../types/dashboard';

export const getQuoteData = async (): Promise<QuoteData> => {
  try {
    console.log('Fetching quote data...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock inspirational quotes
    const quotes = [
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
      },
      {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
      },
      {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
      },
      {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
      }
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return randomQuote;
  } catch (error) {
    console.error('Error fetching quote data:', error);
    throw new Error('Failed to fetch quote data');
  }
};
