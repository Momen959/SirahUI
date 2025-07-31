
"use client"

import * as React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, BookOpen, Users, Lightbulb } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Interactive AI Chat",
    description: "Ask questions and get detailed answers about the life of the Prophet (ﷺ) in a natural, conversational way.",
  },
  {
    icon: BookOpen,
    title: "Authentic Sources",
    description: "Responses are grounded in the Qur'an and major Hadith collections, providing you with reliable information.",
  },
  {
    icon: Users,
    title: "Multiple Perspectives",
    description: "Explore topics through various lenses, including Fiqh Madhhabs and specific Riwayahs.",
  },
  {
    icon: Lightbulb,
    title: "Daily Reflections",
    description: "Start your day with a thought-provoking prompt from the Seerah to inspire learning and reflection.",
  },
];

export default function WelcomePage() {
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

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

      <div className="mt-8 w-full max-w-xl">
        <Carousel 
          plugins={[autoplayPlugin.current]}
          className="w-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {features.map((feature, index) => (
              <CarouselItem key={index}>
                  <Card className="bg-card/50 border-primary/10">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <feature.icon className="h-8 w-8 text-primary mb-3" />
                        <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                    </CardContent>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

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
