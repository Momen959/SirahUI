
"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Sparkles, SendHorizontal, Settings, ChevronDown, Check } from "lucide-react";
import { SirahSenseLogo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "@/components/chat-bubble";
import { getChatResponse } from "@/app/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ChatInput, ChatOutput } from "@/ai/flows/chat-flow";

export type Tone = "Concise" | "Reflective";
export type Madhhab = "Hanafi" | "Maliki" | "Shafi'i" | "Hanbali" | "Other" | null;
export type Riwayah = "Hafs" | "Warsh" | "Qalun" | "Other" | null;

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  sources?: {
    title: string;
    content: string;
  }[];
}

interface ChatSettings {
  tone: Tone;
  madhhab: Madhhab;
  riwayah: Riwayah;
}

export default function SirahSenseClient({ dailyPrompt }: { dailyPrompt: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "As-salamu alaykum! Welcome to SirahSense. How can I help you explore the life of the Prophet Muhammad (peace be upon him) today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    tone: "Reflective",
    madhhab: null,
    riwayah: null,
  });
  const [showSettings, setShowSettings] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const currentInput = input;
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
  const riwayahs: Riwayah[] = ["Hafs", "Warsh", "Qalun", "Other"];

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col bg-transparent">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl p-4 md:p-6">
          <Card className="mb-6 border-primary/20 bg-card/80 shadow-sm backdrop-blur-sm text-card-foreground">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <Sparkles className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline text-lg text-primary">
                Daily Seerah Prompt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{dailyPrompt}</p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
                <div className="flex items-end gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <SirahSenseLogo className="h-6 w-6 animate-pulse text-primary" />
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-card p-4 shadow-md">
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
          <form onSubmit={handleSendMessage}>
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the Seerah..."
                className="min-h-[52px] resize-none rounded-2xl border-2 border-border bg-card py-3 pl-5 pr-14 text-base text-card-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
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
                className="absolute bottom-2 right-2 h-9 w-9 shrink-0 rounded-full"
                disabled={!input.trim() || isTyping}
              >
                <SendHorizontal className="h-5 w-5" />
                <span className="sr-only">Send Message</span>
              </Button>
            </div>
          </form>

          <div className="mt-2 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)} className="text-muted-foreground hover:text-primary">
                <Settings className="mr-2 h-4 w-4" />
                <span>AI Settings</span>
                <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", showSettings && "rotate-180")} />
            </Button>
          </div>
          
          {showSettings && (
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border bg-card/50 p-4">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="tone-switch">Concise</Label>
                    <Switch
                        id="tone-switch"
                        checked={settings.tone === "Reflective"}
                        onCheckedChange={(checked) => setSettings(s => ({ ...s, tone: checked ? "Reflective" : "Concise" }))}
                    />
                    <Label htmlFor="tone-switch">Reflective</Label>
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between">
                            <span>{settings.madhhab || "Select Madhhab"}</span>
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
                            None
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="justify-between">
                            <span>{settings.riwayah || "Select Riwayah"}</span>
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
                            None
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
