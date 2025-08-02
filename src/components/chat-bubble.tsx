
"use client"

import { cn } from "@/lib/utils";
import type { Message } from "@/components/sirah-sense-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bookmark, BookOpen, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

export function ChatBubble({ message }: { message: Message }) {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Response Saved",
      description: "You can find your saved responses in your profile.",
    });
  };

  const isUser = message.sender === "user";

  return (
    <div className={cn("flex items-start gap-4", isUser && "flex-row-reverse")}>
      <Avatar className="h-10 w-10 shrink-0 border">
        <AvatarFallback className={cn("bg-transparent text-primary", isUser && "bg-accent/20 text-accent-foreground")}>
          {isUser ? <User /> : <BrainCircuit className="h-6 w-6" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("max-w-2xl w-full rounded-2xl px-4 py-3 shadow-sm", isUser ? "bg-primary text-primary-foreground" : "bg-card border text-card-foreground")}>
        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-0">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 space-y-3 pt-3 border-t border-primary/10">
            <Accordion type="multiple" className="w-full">
                {message.sources.map((source, index) => (
                <Card key={index} className="bg-background/50 border-primary/20">
                    <AccordionItem value={`item-${index}`} className="border-b-0">
                        <AccordionTrigger className="p-3">
                            <div className="flex flex-row items-center gap-3 space-y-0">
                                <BookOpen className="h-5 w-5 text-accent shrink-0" />
                                <span className="text-sm font-semibold text-primary text-left">{source.title}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-3 pb-3">
                           <div className="space-y-2">
                             <blockquote className="border-l-2 border-accent/50 pl-3 text-sm text-muted-foreground ltr" dir="ltr">
                                {source.englishContent}
                            </blockquote>
                            <blockquote className="border-r-2 border-l-0 border-accent/50 pr-3 text-sm text-muted-foreground rtl" dir="rtl">
                                {source.arabicContent}
                            </blockquote>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Card>
                ))}
            </Accordion>
          </div>
        )}
      </div>

      <div className="self-center">
        {!isUser && (
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary" onClick={handleSave} aria-label="Save response">
            <Bookmark className="h-4 w-4" />
          </Button>
        )}
      </div>

    </div>
  );
}
