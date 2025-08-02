
"use client"

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, MessageSquare, BookOpen, Users, Lightbulb } from "lucide-react";
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
  
  const [plugin, setPlugin] = React.useState<React.ComponentProps<typeof Autoplay>['plugin']>();

  React.useEffect(() => {
    setIsMounted(true);
    setPlugin(Autoplay({ delay: 4000, stopOnInteraction: true, direction: language === 'ar' ? 'rtl' : 'ltr'}));
  }, [language]);
  

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

  const CtaArrow = language === 'ar' ? ArrowLeft : ArrowRight;

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
          plugins={plugin ? [plugin] : undefined}
          className="w-full"
          onMouseEnter={plugin?.stop}
          onMouseLeave={plugin?.reset}
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
            <CtaArrow className="ltr:ml-2 rtl:mr-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
