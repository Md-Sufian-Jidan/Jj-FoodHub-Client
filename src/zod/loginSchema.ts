import * as z from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


type LoginFormType = z.infer<typeof LoginFormSchema>;

const defaultValues: LoginFormType = {
    email: "",
    password: "",
};

export { defaultValues, LoginFormSchema, type LoginFormType };