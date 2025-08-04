
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
import { Moon, Sun, Palette, Trash2, Download, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "./language-provider";
import { translations } from "@/lib/translations";

export function ProfileDialog({ children }: { children: React.ReactNode }) {
    const { toast } = useToast();
    const { language } = useLanguage();
    const t = translations[language];

    const handleExport = () => {
        toast({
            title: t.profile.data.exportToastTitle,
            description: t.profile.data.exportToastDescription,
        });
    }

    const handleDeleteAccount = () => {
        toast({
            variant: "destructive",
            title: t.profile.data.deleteToastTitle,
            description: t.profile.data.deleteToastDescription,
        });
    }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{t.profile.title}</DialogTitle>
          <DialogDescription>
            {t.profile.description}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">{t.profile.tabs.profile}</TabsTrigger>
            <TabsTrigger value="appearance">{t.profile.tabs.appearance}</TabsTrigger>
            <TabsTrigger value="data">{t.profile.tabs.data}</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4 py-4 text-left rtl:text-right">
              <div className="space-y-2">
                <Label htmlFor="name">{t.profile.profile.nameLabel}</Label>
                <Input id="name" defaultValue="AI Enthusiast" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.profile.profile.emailLabel}</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
            </div>
            <DialogFooter>
                <Button type="submit">{t.profile.profile.saveButton}</Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="appearance">
             <div className="space-y-6 py-4 text-left rtl:text-right">
                <div className="space-y-2">
                    <Label>{t.profile.appearance.themeLabel}</Label>
                    <p className="text-sm text-muted-foreground">{t.profile.appearance.themeDescription}</p>
                    <ThemeSelector />
                </div>
                 <div className="space-y-2">
                    <Label>{t.profile.appearance.colorSchemeLabel}</Label>
                    <p className="text-sm text-muted-foreground">{t.profile.appearance.colorSchemeDescription}</p>
                    <ColorThemeSelector />
                </div>
                <div className="space-y-2">
                    <Label>{t.profile.appearance.languageLabel}</Label>
                    <p className="text-sm text-muted-foreground">{t.profile.appearance.languageDescription}</p>
                    <LanguageSelector />
                </div>
            </div>
          </TabsContent>
          <TabsContent value="data">
            <div className="space-y-6 py-4 text-left rtl:text-right">
                <div className="space-y-2">
                    <Label>{t.profile.data.exportLabel}</Label>
                    <p className="text-sm text-muted-foreground">{t.profile.data.exportDescription}</p>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="ltr:mr-2 rtl:ml-2 h-4 w-4"/>
                        {t.profile.data.exportButton}
                    </Button>
                </div>
                <div className="space-y-2">
                    <Label className="text-destructive">{t.profile.data.deleteLabel}</Label>
                     <p className="text-sm text-muted-foreground">{t.profile.data.deleteDescription}</p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                <Trash2 className="ltr:mr-2 rtl:ml-2 h-4 w-4"/>
                                {t.profile.data.deleteButton}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t.profile.data.deleteDialogTitle}</AlertDialogTitle>
                                <AlertDialogDescription>
                                {t.profile.data.deleteDialogDescription}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t.profile.data.deleteDialogCancel}</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount}>{t.profile.data.deleteDialogContinue}</AlertDialogAction>
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
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="flex gap-2">
            <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')} className="w-full">
                <Sun className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t.profile.appearance.themeLight}
            </Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')} className="w-full">
                <Moon className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t.profile.appearance.themeDark}
            </Button>
        </div>
    )
}

function ColorThemeSelector() {
    const { theme, setTheme } = useColorTheme();
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div className="grid grid-cols-2 gap-2">
            <Button variant={theme === 'theme-original' ? 'default' : 'outline'} onClick={() => setTheme('theme-original')} className="w-full">
                <Palette className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t.profile.appearance.colorOriginal}
            </Button>
            <Button variant={theme === 'theme-green' ? 'default' : 'outline'} onClick={() => setTheme('theme-green')} className="w-full">
                <Palette className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t.profile.appearance.colorGreen}
            </Button>
            <Button variant={theme === 'theme-brown' ? 'default' : 'outline'} onClick={() => setTheme('theme-brown')} className="w-full">
                <Palette className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t.profile.appearance.colorBrown}
            </Button>
            <Button variant={theme === 'theme-blue' ? 'default' : 'outline'} onClick={() => setTheme('theme-blue')} className="w-full">
                <Palette className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t.profile.appearance.colorBlue}
            </Button>
            <Button variant={theme === 'theme-purple' ? 'default' : 'outline'} onClick={() => setTheme('theme-purple')} className="w-full">
                <Palette className="ltr:mr-2 rtl:ml-2 h-4 w-4"/> {t.profile.appearance.colorPurple}
            </Button>
        </div>
    )
}

function LanguageSelector() {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];
    return (
        <div className="flex gap-2">
            <Button variant={language === 'en' ? 'default' : 'outline'} onClick={() => setLanguage('en')} className="w-full">
                <Languages className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t.profile.appearance.languageEnglish}
            </Button>
            <Button variant={language === 'ar' ? 'default' : 'outline'} onClick={() => setLanguage('ar')} className="w-full">
                <Languages className="ltr:mr-2 rtl:ml-2 h-4 w-4" /> {t.profile.appearance.languageArabic}
            </Button>
        </div>
    )
}
