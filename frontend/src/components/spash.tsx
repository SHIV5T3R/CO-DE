import Logo, { Mode } from "./ui/logo";

type SplashPageProps = {
  mode?: Mode;
};
function SplashPage({ mode }: SplashPageProps) {
  return (
    <div className="w-screen max-w-md">
      <Logo className="mx-auto mb-auto rounded-md" mode={mode} />
    </div>
  );
}

export default SplashPage;