// eslint-disable-next-line simple-import-sort/imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github } from "lucide-react";
import { z, ZodType } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";

import { SignInRequest } from "@/services/auth/types";
import { signIn } from "@/services/auth/auth";
import Logo from "./ui/logo";
import DiscordLogo from "./ui/DiscordLogo";

const validationSchema: ZodType<SignInRequest> = z.object({
  email: z
    .string()
    .email("Invalid Email Address: Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special symbol."
    ),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInRequest>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
  });

  const handleClick = async (data: SignInRequest) => {
    const result = await signIn(data);
    console.log(result);
    // TODO: handle navigation
  };

  return (
    <div className="flex min-h-full w-max flex-col items-center justify-around">
      <Logo />
      <form
        onSubmit={handleSubmit(handleClick)}
        className="w-96 rounded-lg border-[1px] p-6"
      >
        <h2 className="text-center text-2xl font-semibold">Welcome</h2>
        <p className="mt-2 text-center text-base text-secondary">
          Login with your email
        </p>
        <div className="mt-4">
          <label htmlFor="email" className="block">
            <span className="text-sm">Email</span>
            <Input
              type="text"
              placeholder="Enter your email"
              id="email"
              className={cn(
                "mt-1",
                errors.email?.message && "focus-visible:ring-ring-error"
              )}
              {...register("email")}
              aria-invalid={!!errors.email?.message}
            />
            {errors.email?.message && (
              <p className="pt-1 text-xs text-destructive">
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
                errors.password?.message && "focus-visible:ring-ring-error"
              )}
              {...register("password")}
              aria-invalid={!!errors.password?.message}
            />
            {errors.password?.message && (
              <p className="pt-1 text-xs text-destructive">
                {errors.password.message}
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

export default SignIn;
