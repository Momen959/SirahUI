
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
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

export default function WelcomePage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true, direction: "ltr" }))

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  

  const features = [
    {
      icon: MessageSquare,
      title: t.welcome.features.chat.title,
      description: t.welcome.features.chat.description,
    },
    {
      icon: BookOpen,
      title: t.welcome.features.sources.title,
      description: t.welcome.features.sources.description,
    },
    {
      icon: Users,
      title: t.welcome.features.perspectives.title,
      description: t.welcome.features.perspectives.description,
    },
    {
      icon: Lightbulb,
      title: t.welcome.features.reflections.title,
      description: t.welcome.features.reflections.description,
    },
  ];
  
  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 text-center paper">
      <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 z-0 rounded-full bg-primary/10 blur-2xl"></div>
      </div>

      <h1 className="font-headline text-5xl font-bold text-primary">
        {t.welcome.title}
      </h1>
      
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
        {t.welcome.subtitle}
      </p>

      <div className="mt-8 w-full max-w-xl">
        <Carousel 
          plugins={[autoplayPlugin.current]}
          className="w-full"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
          dir="ltr"
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
            {t.welcome.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
