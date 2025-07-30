
'use server';
import { getDailySeerahPrompt as getDailySeerahPromptFromAI } from '@/ai/flows/daily-seerah-prompt';
import { chat as chatWithAI, type ChatInput, type ChatOutput } from '@/ai/flows/chat-flow';
import type { Message } from '@/components/sirah-sense-client';

export async function getDailySeerahPrompt() {
  try {
    const result = await getDailySeerahPromptFromAI();
    return result.prompt;
  } catch (error) {
    console.error('Error fetching daily Seerah prompt:', error);
    return 'Could not fetch a prompt at this time. Please try again later.';
  }
}

export async function getChatResponse(input: ChatInput): Promise<ChatOutput> {
    try {
        const result = await chatWithAI(input);
        return result;
    } catch (error) {
        console.error('Error getting chat response:', error);
        return {
            answer: 'I am sorry, but I encountered an error while processing your request. Please try again.',
            sources: []
        };
    }
}
