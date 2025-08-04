
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BookOpen, Compass, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function WelcomePage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const [plugin, setPlugin] = React.useState<React.ComponentProps<typeof Autoplay>['plugin']>();

  const features = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: t.welcome.features.chat.title,
      description: t.welcome.features.chat.description,
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: t.welcome.features.sources.title,
      description: t.welcome.features.sources.description,
    },
    {
      icon: <Compass className="h-8 w-8 text-primary" />,
      title: t.welcome.features.perspectives.title,
      description: t.welcome.features.perspectives.description,
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: t.welcome.features.reflections.title,
      description: t.welcome.features.reflections.description,
    },
  ];
  
  React.useEffect(() => {
    setIsMounted(true);
    setPlugin(Autoplay({ delay: 3000, stopOnInteraction: true, direction: language === 'ar' ? 'rtl' : 'ltr' }));
  }, [language]);
  
  if (!isMounted) {
    return null; // or a loading skeleton
  }
  
  const ArrowIcon = language === 'ar' ? ArrowRight : ArrowRight;


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 paper">
      <div className="w-full max-w-5xl">
        <header className="text-center">
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">
                {t.welcome.title}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                {t.welcome.subtitle}
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/login">
                    {t.welcome.cta}
                    <ArrowIcon className={language === 'ar' ? "ltr:mr-2 rtl:ml-2 rtl:rotate-180 h-5 w-5" : "ltr:ml-2 rtl:mr-2 h-5 w-5"} />
                </Link>
            </Button>
        </header>

        <div className="mt-16">
          <Carousel
            plugins={plugin ? [plugin] : []}
            className="w-full"
            onMouseEnter={plugin?.stop}
            onMouseLeave={plugin?.reset}
            opts={{
              loop: true,
              direction: language === 'ar' ? 'rtl' : 'ltr'
            }}
          >
            <CarouselContent className="-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="text-center bg-card/50 border-primary/10 hover:border-primary/20 hover:bg-card/80 transition-all h-full flex flex-col">
                      <CardHeader className="items-center">
                        <div className="p-4 bg-primary/10 rounded-full">
                            {feature.icon}
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </main>
  );
}
