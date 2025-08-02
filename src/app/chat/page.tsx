import { getPromptSuggestions } from '@/app/actions';
import SirahSenseClient from '@/components/sirah-sense-client';

export default async function ChatPage() {
  // Fetching with default 'en' language. The client will re-fetch if the language is different.
  const promptSuggestions = await getPromptSuggestions({ language: 'en' });

  return (
    <SirahSenseClient promptSuggestions={promptSuggestions} />
  );
}
