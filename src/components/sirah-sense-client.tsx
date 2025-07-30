"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Sparkles, SendHorizontal } from "lucide-react";
import { SirahSenseLogo } from "@/components/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "@/components/chat-bubble";

export type Tone = "Concise" | "Reflective";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  sources?: {
    title: string;
    content: string;
  }[];
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
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: "ai",
        text: `That is an insightful question. Here is a reflection on that... The life of the Prophet provides us with countless lessons in patience, compassion, and leadership.`,
        sources: [
          {
            title: "Quran 21:107",
            content:
              "And We have not sent you, [O Muhammad], except as a mercy to the worlds.",
          },
          {
            title: "Hadith - Sahih al-Bukhari",
            content: "The best among you are those who have the best manners and character.",
          }
        ],
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

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
          <div className="relative">
            <form
              onSubmit={handleSendMessage}
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the Seerah..."
                className="min-h-[52px] resize-none rounded-full border-2 border-border bg-card py-3 pl-5 pr-14 text-base text-card-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
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
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}
