// eslint-disable-next-line simple-import-sort/imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github } from "lucide-react";
import { z, ZodType } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";

import Logo from "./ui/logo";
import DiscordLogo from "./ui/DiscordLogo";

interface SignUpForm {
  username: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema: ZodType<SignUpForm> = z
  .object({
    username: z.string().min(5, "Username must be at least 5 characters long"),
    fullName: z
      .string()
      .min(2, "Full name should be at least 2 characters long")
      .max(150, "Full name should be up to 150 characters long"),
    email: z
      .string()
      .email("Invalid Email Address: Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(validationSchema),
  });

  const handleClick = (data: SignUpForm) => {
    // TOOD: connect to backend;
    console.log(data);
  };

  return (
    <div className="flex min-h-full w-max flex-col items-center justify-around">
      <Logo />
      <form
        onSubmit={handleSubmit(handleClick)}
        className="min-w-[27rem] rounded-lg border-[1px] p-6"
      >
        <h2 className="text-center text-2xl font-semibold">Welcome</h2>
        <p className="mt-2 text-center text-base text-secondary">
          Create your account and start coding right away
        </p>
        <div className="mt-4">
          <label htmlFor="username" className="block">
            <span className="text-sm">Username</span>
            <Input
              type="text"
              placeholder="Enter your username"
              id="username"
              className={cn(
                "mt-1",
                `${
                  errors.username?.message
                    ? "focus-visible:ring-ring-error"
                    : ""
                }`
              )}
              {...register("username")}
              aria-invalid={!!errors.username?.message}
            />
            {errors.username?.message && (
              <p className="pt-1 text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="fullName" className="block">
            <span className="text-sm">Full name</span>
            <Input
              type="text"
              placeholder="Enter your full name"
              id="fullName"
              className={cn(
                "mt-1",
                `${
                  errors.fullName?.message
                    ? "focus-visible:ring-ring-error"
                    : ""
                }`
              )}
              {...register("fullName")}
              aria-invalid={!!errors.fullName?.message}
            />
            {errors.fullName?.message && (
              <p className="pt-1 text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block">
            <span className="text-sm">Email</span>
            <Input
              type="email"
              placeholder="Enter your email address"
              id="email"
              className={cn(
                "mt-1",
                `${
                  errors.email?.message ? "focus-visible:ring-ring-error" : ""
                }`
              )}
              {...register("email")}
              aria-invalid={!!errors.email?.message}
            />
            {errors.email?.message && (
              <p className="pt-1 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block">
            <span className="text-sm">Password</span>
            <Input
              type="password"
              placeholder="Enter your password"
              id="password"
              className={cn(
                "mt-1",
                `${
                  errors.password?.message
                    ? "focus-visible:ring-ring-error"
                    : ""
                }`
              )}
              {...register("password")}
              aria-invalid={!!errors.password?.message}
            />
            {errors.password?.message && (
              <p className="pt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block">
            <span className="text-sm">Confirm password</span>
            <Input
              type="password"
              placeholder="Confirm your password"
              id="confirmPassword"
              className={cn(
                "mt-1",
                `${
                  errors.confirmPassword?.message
                    ? "focus-visible:ring-ring-error"
                    : ""
                }`
              )}
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword?.message}
            />
            {errors.confirmPassword?.message && (
              <p className="pt-1 text-sm text-destructive">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Continue
        </Button>
      </form>
      <div className="flex w-full items-center justify-center gap-16">
        <a href="https://discord.com/" className="flex items-center gap-1">
          <DiscordLogo size={24} />
          <span className="text-xs">Discord</span>
        </a>
        <a href="https://github.com/" className="flex items-center gap-1">
          <Github height={24} />
          <span className="text-xs">Github</span>
        </a>
      </div>
    </div>
  );
}

export default SignUp;
