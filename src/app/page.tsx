
"use client"

import * as React from "react";
import Link from "next/link";
import { MessageSquare, Compass, Settings, UserPlus, LogIn, Ghost } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Interactive Chat",
    description: "Ask questions and get detailed answers about the Seerah in a natural, conversational way.",
  },
  {
    icon: <Compass className="h-8 w-8 text-primary" />,
    title: "Multiple Perspectives",
    description: "Explore topics from various viewpoints, including the Prophet's life, the Sahaba, and more.",
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Customizable AI",
    description: "Adjust the AI's tone and scholarly lens to tailor the conversation to your needs.",
  },
];

export default function WelcomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 text-center paper overflow-hidden">
      <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 z-0 rounded-full bg-primary/10 blur-2xl"></div>
      </div>

      <h1 className="font-headline text-5xl font-bold text-primary">
        Welcome to SirahSense
      </h1>
      
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
        Your personal AI companion for exploring the life and teachings of the Prophet Muhammad (ﷺ).
      </p>

      <Card className="mt-8 w-full max-w-sm bg-card/50 border-primary/10 p-6">
        <div className="flex flex-col gap-4">
            <Button asChild size="lg">
                <Link href="/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
                 <Link href="/login?tab=signup">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Sign Up
                </Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
                <Link href="/chat">
                    <Ghost className="mr-2 h-5 w-5" />
                    Continue as Guest
                </Link>
            </Button>
        </div>
      </Card>
    </main>
  );
}
