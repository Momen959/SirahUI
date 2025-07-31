
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, MessageSquare, Book, User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ColorThemeToggle } from "@/components/color-theme-toggle";
import { ProfileDialog } from "@/components/profile-dialog";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">
              SirahSense
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/">
                  <Home />
                   <span>Home</span>
                 </Link>
               </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="/chat">
                  <MessageSquare />
                  <span>Current Chat</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Book />
                <span>Saved Responses</span>
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
                        <span className="text-sm font-medium">Profile</span>
                    </SidebarMenuButton>
                </ProfileDialog>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-primary">Chat</h1>
            </div>
            <ColorThemeToggle />
            <ThemeToggle />
            <Button variant="outline" size="sm">New Chat</Button>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
