"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, UtensilsCrossed, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import AppField from "@/components/shared/form/AppField";
import { LoginFormSchema } from "@/zod/loginSchema";

export function LoginForm({
    className,
}: React.ComponentProps<"div">) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },

        validators: {
            onSubmit: LoginFormSchema,
        },

        onSubmit: async ({ value }) => {
            setLoading(true);

            const toastId = toast.loading("Logging in...");

            try {
                const { error } = await authClient.signIn.email({
                    email: value.email,
                    password: value.password,
                });

                if (error) {
                    toast.error(error.message, {
                        id: toastId,
                    });

                    return;
                }

                toast.success("Welcome back!", {
                    id: toastId,
                });

                router.push("/");
            } catch {
                toast.error("Login failed", {
                    id: toastId,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    const quickLogin = async (
        email: string,
        password: string
    ) => {
        setLoading(true);

        const toastId = toast.loading("Quick login...");

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                console.log(error);
                toast.error(error.message, {
                    id: toastId,
                });

                return;
            }

            toast.success("Logged in successfully!", {
                id: toastId,
            });

            router.push("/");
        } catch {
            toast.error("Login failed", {
                id: toastId,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={cn(
                "min-h-screen flex items-center justify-center p-4 md:p-8",
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card className="border border-[#D97757] shadow-[0_15px_60px_rgba(217,119,87,0.08)] bg-[#FAF9F7] dark:bg-black dark:border-[#D97757] rounded-3xl overflow-hidden relative z-10">
                    <CardContent className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-14 h-14 bg-[#D97757] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <UtensilsCrossed className="text-white" />
                            </div>

                            <h1 className="text-2xl font-bold text-[#1F2933] dark:text-white">
                                Welcome Back
                            </h1>
                        </div>

                        {/* Quick Login */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    quickLogin(
                                        "adminfoodie@gmail.com",
                                        "Admin@1234"
                                    )
                                }
                            >
                                Admin
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    quickLogin(
                                        "superprovider@gmail.com",
                                        "Superprovider@com"
                                    )
                                }
                            >
                                Provider
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    quickLogin(
                                        "supercustomer@gmail.com",
                                        "Supercustomer@com"
                                    )
                                }
                            >
                                User
                            </Button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                form.handleSubmit();
                            }}
                            className="space-y-5"
                        >
                            {/* Email Field */}
                            <form.Field
                                name="email"
                                children={(field) => (
                                    <AppField
                                        field={field}
                                        label="Email"
                                        type="email"
                                        placeholder="Enter your email"
                                        prepend={
                                            <Mail className="w-4 h-4 text-muted-foreground" />
                                        }
                                        className="[&_input]:h-12 [&_input]:rounded-xl [&_input]:bg-white [&_input]:border-[#FAF9F7] [&_input]:focus-visible:border-[#D97757]/30 [&_input]:focus-visible:ring-[#D97757]/10 [&_input]:text-[#1F2933] dark:[&_input]:bg-white dark:[&_input]:border-[#FAF9F7] dark:[&_input]:text-[#1F2933] dark:[&_input]:placeholder:text-[#6B7280] [&_label]:text-[#1F2933] dark:[&_label]:text-[#fafafa] [&_label]:font-semibold"
                                    />
                                )}
                            />

                            {/* Password Field */}
                            <form.Field
                                name="password"
                                children={(field) => (
                                    <div className="relative">
                                        <AppField
                                            field={field}
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            prepend={
                                                <Lock className="w-4 h-4 text-muted-foreground" />
                                            }
                                            className="[&_input]:h-12 [&_input]:rounded-xl [&_input]:bg-white [&_input]:border-[#FAF9F7] [&_input]:focus-visible:border-[#D97757]/30 [&_input]:focus-visible:ring-[#D97757]/10 [&_input]:text-[#1F2933] dark:[&_input]:bg-white dark:[&_input]:border-[#FAF9F7] dark:[&_input]:text-[#1F2933] dark:[&_input]:placeholder:text-[#6B7280] [&_label]:text-[#1F2933] dark:[&_label]:text-[#fafafa] [&_label]:font-semibold"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-9 text-muted-foreground"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-4 h-4" />
                                            ) : (
                                                <Eye className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                )}
                            />

                            {/* Submit Button */}
                            <AppSubmitButton
                                isPending={loading}
                                pendingLabel="Logging in..."
                                className="w-full h-12 bg-[#D97757] hover:bg-[#D97757]/90 text-white font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-[1.01]"
                            >
                                Login
                            </AppSubmitButton>

                            <p className="text-center text-sm text-muted-foreground">
                                Don’t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-[#D97757] font-medium"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};
