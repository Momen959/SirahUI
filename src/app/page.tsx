
"use client"

import * as React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { MessageSquare, Compass, BookOpen, Settings } from "lucide-react";

import { SirahSenseLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Authentic Sources",
    description: "Responses are backed by references from the Qur'an and major Hadith collections.",
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Customizable AI",
    description: "Adjust the AI's tone and scholarly lens to tailor the conversation to your needs.",
  },
];

export default function WelcomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 text-center paper overflow-hidden">
      <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 z-0 rounded-full bg-primary/10 blur-2xl"></div>
        <SirahSenseLogo className="relative z-10 h-20 w-20 text-primary" />
      </div>

      <h1 className="font-headline text-5xl font-bold text-primary">
        Welcome to SirahSense
      </h1>
      
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
        Your personal AI companion for exploring the life and teachings of the Prophet Muhammad (ﷺ).
      </p>

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-md mt-8"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-card/50 border-primary/10">
                  <CardContent className="flex flex-col items-center justify-center p-6 aspect-square gap-3">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Button asChild size="lg" className="mt-8">
        <Link href="/chat">
          Begin Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </main>
  );
}
