'use server';

/**
 * @fileOverview A daily Seerah prompt generator.
 *
 * - getDailySeerahPrompt - A function that returns a daily Seerah prompt.
 * - DailySeerahPromptOutput - The return type for the getDailySeerahPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailySeerahPromptOutputSchema = z.object({
  prompt: z.string().describe('A daily Seerah prompt.'),
});
export type DailySeerahPromptOutput = z.infer<typeof DailySeerahPromptOutputSchema>;

export async function getDailySeerahPrompt(): Promise<DailySeerahPromptOutput> {
  return dailySeerahPromptFlow();
}

const prompt = ai.definePrompt({
  name: 'dailySeerahPrompt',
  output: {schema: DailySeerahPromptOutputSchema},
  prompt: `You are an AI assistant designed to provide a daily Seerah prompt for reflection.
  The prompt should be relevant, engaging, and encourage regular reflection on the Prophet Muhammad's life.
  It should be thought-provoking and inspire users to learn more about Islam.

  Generate a single prompt. Do not add any additional information or context, just the plain prompt.
  `,
});

const dailySeerahPromptFlow = ai.defineFlow({
  name: 'dailySeerahPromptFlow',
  outputSchema: DailySeerahPromptOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
