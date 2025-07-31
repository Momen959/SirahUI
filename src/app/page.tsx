
"use client"

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

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

      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/login">
            Begin Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
