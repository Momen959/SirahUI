
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useColorTheme } from "@/components/color-theme-provider";
import { Moon, Sun, Palette, Trash2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ProfileDialog({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();

    const handleExport = () => {
        toast({
            title: "Exporting Data",
            description: "Your chat history is being prepared for download.",
        });
    }

    const handleDeleteAccount = () => {
        toast({
            variant: "destructive",
            title: "Account Deletion",
            description: "Your account and data will be permanently deleted.",
        });
    }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Manage your account settings, appearance, and data.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="AI Enthusiast" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="appearance">
             <div className="space-y-6 py-4">
                <div className="space-y-2">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Select a light or dark theme for the application.</p>
                    <ThemeSelector />
                </div>
                 <div className="space-y-2">
                    <Label>Color Scheme</Label>
                    <p className="text-sm text-muted-foreground">Choose your favorite color palette.</p>
                    <ColorThemeSelector />
                </div>
            </div>
          </TabsContent>
          <TabsContent value="data">
            <div className="space-y-6 py-4">
                <div className="space-y-2">
                    <Label>Export Data</Label>
                    <p className="text-sm text-muted-foreground">Download your chat history and saved responses.</p>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4"/>
                        Export My Data
                    </Button>
                </div>
                <div className="space-y-2">
                    <Label className="text-destructive">Delete Account</Label>
                     <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="mr-2 h-4 w-4"/>
                                Delete My Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="flex gap-2">
            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="w-full">
                <Sun className="mr-2 h-4 w-4" /> Light
            </Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="w-full">
                <Moon className="mr-2 h-4 w-4" /> Dark
            </Button>
        </div>
    )
}

function ColorThemeSelector() {
    const { theme, setTheme } = useColorTheme();
    return (
        <div className="flex gap-2">
            <Button variant={theme === 'theme-green' ? 'default' : 'outline'} onClick={() => setTheme('theme-green')} className="w-full">
                <Palette className="mr-2 h-4 w-4"/> Green
            </Button>
            <Button variant={theme === 'theme-brown' ? 'default' : 'outline'} onClick={() => setTheme('theme-brown')} className="w-full">
                <Palette className="mr-2 h-4 w-4"/> Brown
            </Button>
        </div>
    )
}
