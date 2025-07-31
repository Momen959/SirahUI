
"use client";

import * as React from "react";
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
import { ArrowLeft, Ghost } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signUpSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});


export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const defaultTab = searchParams.get('tab') || "signin";

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
        toast({ title: "Signed In Successfully!", description: "Redirecting to your chat..."});
        router.push("/chat");
    };

    const handleSignUp = (values: z.infer<typeof signUpSchema>) => {
        console.log("Signing up with:", values);
        toast({ title: "Account Created!", description: "Redirecting to your chat..."});
        router.push("/chat");
    };

    return (
        <main className="flex h-screen flex-col items-center justify-center p-4 paper">
             <Button variant="ghost" className="absolute top-4 left-4" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
            </Button>
            <Tabs defaultValue={defaultTab} className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                            <CardDescription>
                                Welcome back! Enter your credentials to access your account.
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
                                                <FormLabel>Email</FormLabel>
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
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Sign In</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col gap-4">
                            <div className="relative w-full flex items-center">
                                <Separator className="flex-1" />
                                <span className="px-2 text-xs text-muted-foreground">OR</span>
                                <Separator className="flex-1" />
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/chat">
                                    <Ghost className="mr-2 h-4 w-4" />
                                    Continue as Guest
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                     <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Create a new account to begin your journey with SirahSense.
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
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="AI Enthusiast" {...field} />
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
                                                <FormLabel>Email</FormLabel>
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
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="••••••••" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">Create Account</Button>
                                </form>
                            </Form>
                        </CardContent>
                         <CardFooter className="flex-col gap-4">
                            <div className="relative w-full flex items-center">
                                <Separator className="flex-1" />
                                <span className="px-2 text-xs text-muted-foreground">OR</span>
                                <Separator className="flex-1" />
                            </div>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/chat">
                                    <Ghost className="mr-2 h-4 w-4" />
                                    Continue as Guest
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}
