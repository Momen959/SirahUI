import { getDailySeerahPrompt } from '@/app/actions';
import SirahSenseClient from '@/components/sirah-sense-client';

export default async function ChatPage() {
  const dailyPrompt = await getDailySeerahPrompt();

  return (
    <SirahSenseClient dailyPrompt={dailyPrompt} />
  );
}
