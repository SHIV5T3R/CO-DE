import Logo from "components/ui/logo";
import ProgressBar from "components/ui/progress-bar";

type LoadingPageProps = {
  message?: string;
  progress?: number;
};
function LoadingPage({ message, progress }: LoadingPageProps) {
  return (
    <div className="w-screen max-w-md">
      <Logo className="mx-auto mb-8 rounded-md " />
      <ProgressBar progress={progress} />
      <p className="text-center text-sm text-muted-foreground">{message}...</p>
    </div>
  );
}

export default LoadingPage;
