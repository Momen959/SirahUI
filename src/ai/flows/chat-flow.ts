
'use server';

/**
 * @fileOverview A chat AI agent for answering questions about the Seerah.
 *
 * - chat - A function that handles the chat process.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("The user's message."),
  tone: z.enum(['Concise', 'Reflective']).describe("The desired tone for the AI's response."),
  madhhab: z.enum(['Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali', 'Other']).optional().describe("The school of thought to consider in the response."),
  riwayah: z.enum(['Sahih al-Bukhari', 'Sahih Muslim', 'Jami` at-Tirmidhi', 'Sunan an-Nasa\'i', 'Other']).optional().describe('The Hadith collection to reference.'),
  perspectives: z.array(z.enum(["Prophet's Life", "Sahaba", "Qur'an Tafseer", "Life Lessons"])).optional().describe('A list of specific perspectives to answer from.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string(),
    })),
  })).optional().describe('The chat history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  answer: z.string().describe("The AI's response to the user."),
  sources: z.array(z.object({
    title: z.string().describe('The title of the source (e.g., Quran 2:255, Sahih al-Bukhari 1).'),
    englishContent: z.string().describe('The English translation of the source text.'),
    arabicContent: z.string().describe('The original Arabic text of the source.'),
  })).optional().describe('A list of sources used to generate the response, with both English and Arabic text.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are SirahSense, a friendly and knowledgeable AI assistant specializing in the Seerah (the life of the Prophet Muhammad ﷺ), Islamic history, and Quranic studies. Your goal is to provide accurate, respectful, and insightful answers to user queries.

  **Instructions:**
  1.  **Analyze the User's Query:** Understand the user's question from the message: {{{message}}}.
  2.  **Consider the Context:** The user has provided the following preferences for your response. Adhere to them carefully.
      -   **Tone:** The user wants a {{{tone}}} response.
      {{#if madhhab}}
      -   **Fiqh Madhhab:** The user is interested in the {{madhhab}} school of thought. If the query is related to fiqh, frame your answer from this perspective.
      {{/if}}
      {{#if riwayah}}
      -   **Hadith Riwayah:** If referencing Hadith, consider the {{riwayah}} collection if relevant.
      {{/if}}
      {{#if perspectives.length}}
      -   **Perspectives:** The user wants the answer framed from the following perspectives: {{#each perspectives}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}. Focus your answer on these topics.
      {{else}}
      -   **Perspective:** The user has not selected a specific perspective. You should answer the question from all available perspectives if applicable.
      {{/if}}
  3.  **Consult Sources:** Base your answer on authentic sources like the Quran and major Hadith collections (e.g., Sahih al-Bukhari, Sahih Muslim).
  4.  **Formulate the Answer:**
      -   Provide a clear, helpful, and well-structured response in the requested tone.
      -   If the query is in a language other than English (especially Arabic), try to respond in that language.
      -   Be respectful and avoid controversial or sectarian opinions. Stick to widely accepted knowledge.
  5.  **Cite Sources:** List the primary sources (Quranic verses, Hadith) you used to formulate your answer in the 'sources' field. For each source, you MUST provide both the original Arabic text and the English translation.

  **Chat History:**
  {{#each history}}
    **{{role}}**: {{content.[0].text}}
  {{/each}}

  **User's new message:** {{{message}}}
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
