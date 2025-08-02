"use client";

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, MessageSquare, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileDialog } from "@/components/profile-dialog";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="font-headline text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">
                  SirahSense
                </h1>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home />
                    <span>{t.sidebar.home}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/chat">
                    <MessageSquare />
                    <span>{t.sidebar.currentChat}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <ProfileDialog>
                    <SidebarMenuButton>
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/20 text-primary">
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{t.sidebar.profile}</span>
                    </SidebarMenuButton>
                </ProfileDialog>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                    <LogOut />
                    <span>{t.sidebar.signOut}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
              <div className="flex items-center gap-2">
                  <SidebarTrigger className="group-data-[state=expanded]:hidden" />
                  <h1 className="text-lg font-semibold text-primary">{t.sidebar.chatTitle}</h1>
              </div>
              <div className="flex-1 flex justify-end">
                <Button variant="outline" size="sm">{t.sidebar.newChat}</Button>
              </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
  );
}
