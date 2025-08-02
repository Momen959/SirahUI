
'use server';

/**
 * @fileOverview Generates a list of prompt suggestions for the user.
 *
 * - getPromptSuggestions - A function that returns a list of prompt suggestions.
 * - PromptSuggestion - The type for a single prompt suggestion.
 * - PromptSuggestionsOutput - The return type for the getPromptSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PromptSuggestionsInputSchema = z.object({
  language: z.enum(['en', 'ar']).describe('The language for the prompt suggestions.'),
});
export type PromptSuggestionsInput = z.infer<typeof PromptSuggestionsInputSchema>;


const PromptSuggestionSchema = z.object({
    category: z.string().describe("The category of the prompt (e.g., Prophet's Life, Sahaba, Qur'an, Life Lessons)."),
    prompt: z.string().describe('The suggested prompt text.'),
});
export type PromptSuggestion = z.infer<typeof PromptSuggestionSchema>;

const PromptSuggestionsOutputSchema = z.object({
  suggestions: z.array(PromptSuggestionSchema).length(4).describe('A list of exactly 4 prompt suggestions.'),
});
export type PromptSuggestionsOutput = z.infer<typeof PromptSuggestionsOutputSchema>;

export async function getPromptSuggestions(input: PromptSuggestionsInput): Promise<PromptSuggestionsOutput> {
  return promptSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'promptSuggestions',
  input: {schema: PromptSuggestionsInputSchema},
  output: {schema: PromptSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide engaging prompt suggestions for a user interested in Islamic topics.
  Your task is to generate exactly one thought-provoking prompt for each of the following categories: "Prophet's Life", "Sahaba", "Qur'an", and "Life Lessons".

  The prompts should be distinct, insightful, and encourage the user to explore the topic further.

  Generate the prompts in the following language: {{{language}}}.

  Return the output as a list of 4 suggestions. Make sure there is one for each category.
  `,
});

const promptSuggestionsFlow = ai.defineFlow({
  name: 'promptSuggestionsFlow',
  inputSchema: PromptSuggestionsInputSchema,
  outputSchema: PromptSuggestionsOutputSchema,
}, async (input) => {
  const {output} = await prompt(input);
  return output!;
});
