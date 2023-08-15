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

interface SignInForm {
  username: string;
  password: string;
}

const validationSchema: ZodType<SignInForm> = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(validationSchema),
  });

  const handleClick = (data: SignInForm) => {
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
          Login with your email
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
