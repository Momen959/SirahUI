import { SirahSenseLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-background p-8 text-center text-foreground">
      <div className="relative mb-8 flex h-48 w-48 items-center justify-center">
        <div className="absolute inset-0 z-0 rounded-full bg-primary/10 blur-2xl"></div>
        <div className="absolute inset-4 z-0 animate-pulse rounded-full bg-primary/20"></div>
        <SirahSenseLogo className="relative z-10 h-24 w-24 text-primary" />
      </div>
      
      <h1 className="font-headline text-5xl font-bold text-primary">
        Welcome to SirahSense
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Your personal AI companion for exploring the life and teachings of the Prophet Muhammad (peace be upon him). Ask questions, seek guidance, and deepen your understanding of the Seerah in an interactive way.
      </p>

      <Button asChild size="lg" className="mt-10 animate-bounce">
        <Link href="/chat">
          Begin Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </main>
  );
}
