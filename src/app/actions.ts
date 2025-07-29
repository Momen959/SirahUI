
'use server';
import { getDailySeerahPrompt as getDailySeerahPromptFromAI } from '@/ai/flows/daily-seerah-prompt';

export async function getDailySeerahPrompt() {
  try {
    const result = await getDailySeerahPromptFromAI();
    return result.prompt;
  } catch (error) {
    console.error('Error fetching daily Seerah prompt:', error);
    return 'Could not fetch a prompt at this time. Please try again later.';
  }
}
