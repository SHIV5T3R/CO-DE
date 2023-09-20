// eslint-disable-next-line simple-import-sort/imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github, AlertOctagon } from "lucide-react";
import { z, ZodType } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";

import { SignInRequest } from "@/services/auth/types";
import { signIn } from "@/services/auth/auth";
import Logo from "../ui/logo";
import DiscordLogo from "@/components/ui/discordLogo";

const validationSchema: ZodType<SignInRequest> = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string(),
});

function SignInPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInRequest>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
  });
  const [message, setMessage] = useState<string | undefined>();

  const handleClick = async (data: SignInRequest) => {
    const result = await signIn(data);
    if (!result.status) {
      if (result.errors) {
        Object.keys(result.errors).forEach((fieldName) => {
          setError(fieldName as keyof SignInRequest, {
            type: "manual",
            message: result.errors![fieldName as keyof SignInRequest][0],
          });
        });
      } else {
        setMessage(result.error);
        setTimeout(() => {
          setMessage(undefined);
        }, 3000);
      }
    }
    // TODO: handle navigation
  };

  return (
    <div className="m-auto flex min-h-full w-max flex-col items-center justify-around">
      <Logo />
      <form
        onSubmit={handleSubmit(handleClick)}
        className="w-96 rounded-lg border-[1px] p-6"
      >
        <h2 className="text-center text-2xl font-semibold">Welcome</h2>
        <p className="mt-2 text-center text-base text-secondary">
          Login with your email
        </p>
        {message && (
          <div className="mt-2 flex items-center gap-2">
            <AlertOctagon color="hsl(var(--destructive))" size={24} />
            <span className="text-xs text-destructive">{message}</span>
          </div>
        )}
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

export default SignInPage;
