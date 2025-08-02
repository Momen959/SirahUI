
"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Ghost } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useLanguage } from "@/components/language-provider";
import { translations } from "@/lib/translations";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signUpSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

function LoginClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { language } = useLanguage();
    const t = translations[language];
    const defaultTab = searchParams.get('tab') || "signin";
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const signInForm = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: { email: "", password: "" },
    });

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    const handleSignIn = (values: z.infer<typeof signInSchema>) => {
        console.log("Signing in with:", values);
        toast({ title: t.login.toasts.signInSuccessTitle, description: t.login.toasts.signInSuccessDescription});
        router.push("/chat");
    };

    const handleSignUp = (values: z.infer<typeof signUpSchema>) => {
        console.log("Signing up with:", values);
        toast({ title: t.login.toasts.signUpSuccessTitle, description: t.login.toasts.signUpSuccessDescription});
        router.push("/chat");
    };

    if (!isMounted) {
        return null;
    }

    const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

    return (
        <main className="flex h-screen flex-col items-center justify-center p-4 paper">
             <Button variant="ghost" className="absolute top-4 ltr:left-4 rtl:right-4" asChild>
                <Link href="/">
                    <BackArrow className={language === 'ar' ? 'ml-2' : 'mr-2'} />
                    {t.login.backToHome}
                </Link>
            </Button>
            <Tabs defaultValue={defaultTab} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">{t.login.signIn.tab}</TabsTrigger>
                    <TabsTrigger value="signup">{t.login.signUp.tab}</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t.login.signIn.title}</CardTitle>
                            <CardDescription>
                                {t.login.signIn.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...signInForm}>
                                <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                                    <FormField
                                        control={signInForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.login.emailLabel}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={signInForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.login.passwordLabel}</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">{t.login.signIn.button}</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col gap-4">
                            <div className="relative w-full flex items-center">
                                <Separator className="flex-1" />
                                <span className="px-2 text-xs text-muted-foreground">{t.login.orSeparator}</span>
                                <Separator className="flex-1" />
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/chat">
                                    <Ghost className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                                    {t.login.continueAsGuest}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                     <Card>
                        <CardHeader>
                            <CardTitle>{t.login.signUp.title}</CardTitle>
                            <CardDescription>
                                {t.login.signUp.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...signUpForm}>
                                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                                    <FormField
                                        control={signUpForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.login.nameLabel}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t.login.namePlaceholder} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={signUpForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.login.emailLabel}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={signUpForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.login.passwordLabel}</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">{t.login.signUp.button}</Button>
                                </form>
                            </Form>
                        </CardContent>
                         <CardFooter className="flex-col gap-4">
                            <div className="relative w-full flex items-center">
                                <Separator className="flex-1" />
                                <span className="px-2 text-xs text-muted-foreground">{t.login.orSeparator}</span>
                                <Separator className="flex-1" />
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/chat">
                                    <Ghost className="ltr:mr-2 rtl:ml-2 h-4 w-4" />
                                    {t.login.continueAsGuest}
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}


export default function LoginPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><LoadingSpinner className="h-8 w-8" /></div>}>
            <LoginClient />
        </Suspense>
    )
}
