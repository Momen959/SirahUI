"use client"

import { cn } from "@/lib/utils";
import type { Message } from "@/components/sirah-sense-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SirahSenseLogo } from "@/components/icons";
import { User, Bookmark, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className={cn("flex items-end gap-3", isUser && "flex-row-reverse")}>
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback className={cn("bg-primary/10 text-primary", isUser && "bg-accent/80 text-accent-foreground")}>
          {isUser ? <User /> : <SirahSenseLogo className="h-6 w-6" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("max-w-xl rounded-lg p-4", isUser ? "rounded-br-none bg-primary text-primary-foreground" : "rounded-bl-none bg-card shadow-sm border")}>
        <p className="whitespace-pre-wrap">{message.text}</p>
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 space-y-3">
            {message.sources.map((source, index) => (
              <Card key={index} className="bg-accent/30 border-primary/20">
                <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-sm font-semibold text-primary/90">{source.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <blockquote className="border-l-2 border-primary/50 pl-3 text-sm text-muted-foreground">
                    {source.content}
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {!isUser && (
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-primary" onClick={handleSave} aria-label="Save response">
          <Bookmark className="h-4 w-4" />
        </Button>
      )}

      {isUser && <div className="w-8 shrink-0"></div>}

    </div>
  );
}
