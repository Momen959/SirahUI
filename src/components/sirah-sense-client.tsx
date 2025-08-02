
"use client";

import React, { useState, useRef, useEffect, type FormEvent } from "react";
import { SendHorizontal, Settings, ChevronDown, Check, BookOpen, User, Users, Lightbulb, Compass, X, BrainCircuit, Sparkles } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "@/components/chat-bubble";
import { getChatResponse } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ChatInput } from "@/ai/flows/chat-flow";
import type { PromptSuggestion } from "@/ai/flows/prompt-suggestions-flow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "./language-provider";
import { translations } from "@/lib/translations";

export type Tone = "Concise" | "Reflective";
export type Madhhab = "Hanafi" | "Maliki" | "Shafi'i" | "Hanbali" | "Other" | null;
export type Riwayah = "Sahih al-Bukhari" | "Sahih Muslim" | "Jami` at-Tirmidhi" | "Sunan an-Nasa'i" | "Other" | null;
export type Perspective = "Prophet's Life" | "Sahaba" | "Qur'an Tafseer" | "Life Lessons";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  sources?: {
    title: string;
    englishContent: string;
    arabicContent: string;
  }[];
}

interface ChatSettings {
  tone: Tone;
  madhhab: Madhhab;
  riwayah: Riwayah;
}

const perspectiveConfig: { [key in Perspective]: { icon: React.ElementType } } = {
    "Prophet's Life": { icon: User },
    "Sahaba": { icon: Users },
    "Qur'an Tafseer": { icon: BookOpen },
    "Life Lessons": { icon: Lightbulb },
};
const perspectives = Object.keys(perspectiveConfig) as Perspective[];

export default function SirahSenseClient({ promptSuggestions }: { promptSuggestions: PromptSuggestion[] }) {
  const { language } = useLanguage();
  const t = translations[language];

  const [messages, setMessages] = useState<Message[]>([]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    tone: "Reflective",
    madhhab: null,
    riwayah: null,
  });

  const [activePerspectives, setActivePerspectives] = useState<Perspective[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showPerspectives, setShowPerspectives] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true, direction: "ltr" }));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setMessages([
        {
          id: "1",
          sender: "ai",
          text: t.chat.welcomeMessage,
        },
      ]);
  }, [t.chat.welcomeMessage]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);
  
  const handlePerspectiveToggle = (perspective: Perspective) => {
    let newPerspectives;
    if (activePerspectives.includes(perspective)) {
      newPerspectives = activePerspectives.filter((p) => p !== perspective);
    } else {
      newPerspectives = [...activePerspectives, perspective];
    }

    if (newPerspectives.length === perspectives.length) {
      setActivePerspectives([]);
    } else {
      setActivePerspectives(newPerspectives);
    }
  };

  const handleSendMessage = async (e: FormEvent, messageText?: string) => {
    e.preventDefault();
    const currentInput = messageText || input;
    if (!currentInput.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: currentInput,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    const chatHistoryForAI = newMessages.slice(1, -1).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: [{ text: msg.text }]
    }));

    const response = await getChatResponse({
      message: currentInput,
      tone: settings.tone,
      madhhab: settings.madhhab ?? undefined,
      riwayah: settings.riwayah ?? undefined,
      perspectives: activePerspectives,
      history: chatHistoryForAI,
    } as ChatInput);

    const aiResponse: Message = {
      id: Date.now().toString(),
      sender: "ai",
      text: response.answer,
      sources: response.sources,
    };
    
    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };
  
  const madhhabs: Madhhab[] = ["Hanafi", "Maliki", "Shafi'i", "Hanbali", "Other"];
  const riwayahs: Riwayah[] = ["Sahih al-Bukhari", "Sahih Muslim", "Jami` at-Tirmidhi", "Sunan an-Nasa'i", "Other"];
  
  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col bg-transparent">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl p-4 md:p-6">            
          <div className="space-y-6">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
                <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 shrink-0 border">
                      <AvatarFallback className="bg-transparent text-primary">
                        <BrainCircuit className="h-6 w-6 animate-pulse" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-1.5 rounded-lg bg-card px-4 py-3 shadow-sm border text-card-foreground">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary/50"></span>
                    </div>
                </div>
            )}
          </div>
        </div>
      </ScrollArea>
      
      <footer className="border-t bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl p-4">
            {promptSuggestions && promptSuggestions.length > 0 && messages.length <= 1 && (
              <div className="mb-4">
                <Carousel 
                  plugins={[autoplayPlugin.current]}
                  className="w-full"
                  onMouseEnter={autoplayPlugin.current.stop}
                  onMouseLeave={autoplayPlugin.current.reset}
                >
                  <CarouselContent>
                    {promptSuggestions.map((suggestion, index) => (
                      <CarouselItem key={index}>
                          <Card 
                            className="bg-card/50 border-primary/10 hover:border-primary/30 hover:bg-card/80 transition-all cursor-pointer"
                            onClick={(e) => handleSendMessage(e, suggestion.prompt)}
                          >
                            <CardContent className="p-4">
                              <p className="font-semibold text-primary text-sm flex items-center gap-2">
                                <Sparkles className="h-4 w-4" />
                                {suggestion.category}
                              </p>
                              <p className="text-muted-foreground text-sm mt-1">{suggestion.prompt}</p>
                            </CardContent>
                          </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            )}
            {activePerspectives.length > 0 && (
                <div className="mb-2 flex flex-wrap items-center justify-start gap-2">
                    {activePerspectives.map((p) => (
                        <div key={p} className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            {React.createElement(perspectiveConfig[p].icon, { className: "h-4 w-4" })}
                            <span>{t.chat.perspectives[p as keyof typeof t.chat.perspectives]}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 rounded-full"
                                onClick={() => handlePerspectiveToggle(p)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
          <form onSubmit={handleSendMessage}>
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat.inputPlaceholder}
                className="min-h-[52px] resize-none rounded-2xl border-2 border-border bg-card py-[14px] pl-5 pr-14 text-base text-card-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 shrink-0 rounded-full"
                disabled={!input.trim() || isTyping}
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">{t.chat.sendButton}</span>
              </Button>
            </div>
          </form>

          <div className="mt-2 flex items-center justify-start gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="text-muted-foreground hover:text-primary">
                <Settings className="mr-2 h-4 w-4" />
                <span>{t.chat.aiSettings.button}</span>
                <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", showSettings && "rotate-180")} />
            </Button>
            
            <Popover open={showPerspectives} onOpenChange={setShowPerspectives}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Compass className="mr-2 h-4 w-4" />
                        <span>{t.chat.perspectives.button}</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">{t.chat.perspectives.popoverTitle}</h4>
                            <p className="text-sm text-muted-foreground">
                                {t.chat.perspectives.popoverDescription}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {perspectives.map((p) => {
                                const Icon = perspectiveConfig[p].icon;
                                return (
                                <Button
                                    key={p}
                                    variant={activePerspectives.includes(p) ? "default" : "outline"}
                                    onClick={() => handlePerspectiveToggle(p)}
                                    className="justify-start gap-2"
                                >
                                    <Icon className="h-4 w-4" />
                                    {t.chat.perspectives[p as keyof typeof t.chat.perspectives]}
                                </Button>
                                );
                             })}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
          </div>
          
          {showSettings && (
            <div className="mt-2 space-y-4 rounded-lg border bg-card/50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                      <Label htmlFor="tone-switch">{t.chat.aiSettings.tone.concise}</Label>
                      <Switch
                          id="tone-switch"
                          checked={settings.tone === "Reflective"}
                          onCheckedChange={(checked) => setSettings(s => ({ ...s, tone: checked ? "Reflective" : "Concise" }))}
                      />
                      <Label htmlFor="tone-switch">{t.chat.aiSettings.tone.reflective}</Label>
                  </div>
                  
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="justify-between">
                              <span>{settings.madhhab || t.chat.aiSettings.madhhab.select}</span>
                              <ChevronDown className="h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                          {madhhabs.map(m => (
                              <DropdownMenuItem key={m} onSelect={() => setSettings(s => ({ ...s, madhhab: m }))}>
                                  <Check className={cn("mr-2 h-4 w-4", settings.madhhab === m ? "opacity-100" : "opacity-0")} />
                                  {m}
                              </DropdownMenuItem>
                          ))}
                           <DropdownMenuItem onSelect={() => setSettings(s => ({ ...s, madhhab: null }))}>
                              <Check className={cn("mr-2 h-4 w-4", settings.madhhab === null ? "opacity-100" : "opacity-0")} />
                              {t.chat.aiSettings.none}
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="justify-between">
                              <span>{settings.riwayah || t.chat.aiSettings.riwayah.select}</span>
                              <ChevronDown className="h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                          {riwayahs.map(r => (
                              <DropdownMenuItem key={r} onSelect={() => setSettings(s => ({ ...s, riwayah: r }))}>
                                  <Check className={cn("mr-2 h-4 w-4", settings.riwayah === r ? "opacity-100" : "opacity-0")} />
                                  {r}
                              </DropdownMenuItem>
                          ))}
                           <DropdownMenuItem onSelect={() => setSettings(s => ({ ...s, riwayah: null }))}>
                              <Check className={cn("mr-2 h-4 w-4", settings.riwayah === null ? "opacity-100" : "opacity-0")} />
                              {t.chat.aiSettings.none}
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
                </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
