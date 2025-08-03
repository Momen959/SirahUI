
"use client";

import * as React from "react";
import Link from "next/link";
import { HardHat, ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

export default function ComingSoonPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null; // or a loading skeleton
  }

  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 text-center paper">
      <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute inset-0 z-0 rounded-full bg-primary/10 blur-2xl"></div>
        <HardHat className="relative z-10 h-20 w-20 text-primary" />
      </div>

      <h1 className="font-headline text-5xl font-bold text-primary">
        {t.comingSoon.title}
      </h1>
      
      <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
        {t.comingSoon.description}
      </p>

      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/">
            <BackArrow className="ltr:mr-2 rtl:ml-2 h-5 w-5" />
            {t.comingSoon.backToHome}
          </Link>
        </Button>
      </div>
    </main>
  );
}
