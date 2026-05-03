import * as z from "zod";

const RegisterFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(
        ["CUSTOMER", "PROVIDER"],
        "Role must be either CUSTOMER or PROVIDER",
    ),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

const defaultValues: RegisterFormType = {
    name: "",
    email: "",
    role: "CUSTOMER",
    password: "",
};

export { defaultValues, RegisterFormSchema, type RegisterFormType };