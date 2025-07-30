import { getPromptSuggestions } from '@/app/actions';
import SirahSenseClient from '@/components/sirah-sense-client';

export default async function ChatPage() {
  const promptSuggestions = await getPromptSuggestions();

  return (
    <SirahSenseClient promptSuggestions={promptSuggestions} />
  );
}
