import DiscordLogo from "@/components/ui/discordLogo";
import Logo from "../ui/logo";
import { Button } from "@/shadcn/components/ui/button";
import useAuthStore from "@/stores/authStore";
import GithubLogo from "../ui/githubLogo";

function SignInPage() {
  const setGithubOauth = useAuthStore((store) => store.setGithubOauth);

  return (
    <div className="m-auto flex min-h-[80%] w-max flex-col items-center justify-around py-4">
      <Logo />
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-semibold">Welcome back!</h1>
        <h2 className="">Sign in to your account</h2>
      </div>
      <Button
        onClick={() => setGithubOauth()}
        className="flex h-fit w-fit gap-3 px-24"
        type="button"
      >
        <GithubLogo fill="black" size={16} />
        <span className="whitespace-nowrap">Sign in with GitHub</span>
      </Button>
      {/*  */}
      <div className="flex w-full items-center justify-center gap-16 pt-20">
        <a href="https://discord.com/" className="flex items-center gap-1">
          <DiscordLogo size={24} />
          <span className="text-xs">Discord</span>
        </a>
        <a href="https://github.com/" className="flex items-center gap-1">
          <GithubLogo size={24} />
          <span className="text-xs">Github</span>
        </a>
      </div>
    </div>
  );
}
export default SignInPage;
