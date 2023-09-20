import { CODENodeModel } from "@/types/documentModel";

export type MockDnDFileType = (
  | {
      id: number;
      parent: number;
      droppable: boolean;
      text: string;
    }
  | {
      id: number;
      parent: number;
      text: string;
      droppable?: undefined;
    }
)[];
const packageJsonValue = `{
  "name": "co-de",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "@geoffcox/react-splitter": "^2.1.2"
  },
  "devDependencies": {
  },
  "lint-staged": {
    "*.{ts,tsx}": "eslint --cache --fix"
  }
}
`;
const signInTsxContent = `// eslint-disable-next-line simple-import-sort/imports
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
  return (
    <div className="m-auto flex min-h-full w-max flex-col items-center justify-around">
    <Logo />
    <form
    onSubmit={handleSubmit(handleClick)}
    className="w-85 rounded-lg border-[1px] p-5"
    >
    </form>
    </div>
    );
  }
  
  export default SignInPage;
  `;
const signUpTsxContent = `// eslint-disable-next-line simple-import-sort/imports
  function SignUpPage() {
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
  return (
    <div className="m-auto flex min-h-full w-max flex-col items-center justify-around">
    <Logo />
    <form
    onSubmit={handleSubmit(handleClick)}
    className="w-85 rounded-lg border-[1px] p-5"
    >
    </form>
    </div>
    );
  }
  
  export default SignUpPage;
  `;
const userHtmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-7" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <!-- https://web.dev/uses-rel-preconnect -->
  <link rel="preconnect" href="https://storage.googleapis.com">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#111" />
  
  <meta
  name="description"
  content="Wlist"
  data-react-helmet="true"
  />
  <meta
  property="og:title"
  content="Wlist"
  data-react-helmet="true"
  >
  <meta
  property="og:description"
  content="Wlist"
        data-react-helmet="true"
        >
        <meta
        property="og:url"
        content="%PUBLIC_URL%"
        data-react-helmet="true"
        >
        <meta
        property="og:image"
        content="%PUBLIC_URL%/images/cover.png"
        data-react-helmet="true"
        />
        <meta
        name="twitter:card"
        content="summary"
        data-react-helmet="true"
        />
        <meta property="og:type" content="website" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo182.png" />
        <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
        -->
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" crossorigin="use-credentials" />
        <!-- https://web.dev/defer-non-critical-css/ -->
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
        
        <title>Wlist</title>
        
        <!-- ie -->
        <script type="text/javascript">
        var ua = navigator.userAgent;
        var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
        
        if (is_ie) {
          document.ie = 'true';
          
          var ie_script = document.createElement('script');
          var ie_styles = document.createElement('link');
          
          ie_script.src = 'no-ie/init.js';
          ie_styles.rel = 'stylesheet';
          ie_styles.href = 'no-ie/styles.css';
          
          function injectScripts() {
            document.body.innerHTML = '';
            document.body.appendChild(ie_styles);
            document.body.appendChild(ie_script);
          }
          
          if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', injectScripts);
          } else { // before IE 8
            document.attachEvent('DOMContentLoaded', injectScripts);
          }
          
        }
        </script>
        </head>
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script type="text/javascript">
    // set the body color before app initialization, to avoid blinking
    var themeMode = localStorage.getItem('theme-mode');
    var initialBodyStyles = document.createElement('style');
    var currentThemeColor = themeMode === 'light' ? '#fafafa': '#111';
    initialBodyStyles.innerText = 'body { background-color: ' + currentThemeColor + ' }';
    document.head.appendChild(initialBodyStyles);
    
    // also set meta[name="theme-color"] content
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    
    metaTheme.content = currentThemeColor;
    </script>
    <div id="root"></div>
    </body>
    </html>
    `;

const gitIgnoreValue = `# Logs
    logs
    *.log
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    pnpm-debug.log*
    lerna-debug.log*
    
    node_modules
    dist
    dist-ssr
    *.local
    
    # Editor directories and files
    .vscode/*
    !.vscode/extensions.json
    .idea
    .DS_Store
    *.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.env*
`;
const typesTsValue = `import { User } from './user';



enum NotificationType {
    NEW_MESSAGE,

}

export {
    type Notification,
    NotificationType
}`;
export const mockDirectory: CODENodeModel[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: "frontend",
    data: {
      isFolder: true,
      focus: false,
      opened: 0,
      isActive: false,
    },
  },
  {
    id: 2,
    parent: 1,
    droppable: true,
    text: "src",
    data: {
      opened: 0,
      focus: false,
      isFolder: true,
      isActive: false,
    },
  },
  {
    id: 3,
    parent: 1,
    text: "package.json",
    data: {
      isFolder: false,
      opened: 0,
      isActive: false,
      language: "json",
      focus: false,
      codeContent: packageJsonValue,
    },
  },
  {
    id: 4,
    parent: 1,
    text: ".gitignore",
    data: {
      isFolder: false,
      isActive: false,
      opened: 0,
      focus: false,
      codeContent: gitIgnoreValue,
    },
  },
  {
    id: 5,
    parent: 1,
    droppable: true,
    text: "types",
    data: {
      isFolder: true,
      focus: false,
      opened: 0,
      isActive: false,
    },
  },
  {
    id: 6,
    parent: 5,

    text: "document-types.ts",
    data: {
      isFolder: false,
      focus: false,
      language: "typescript",
      opened: 0,
      isActive: false,
      codeContent: typesTsValue,
    },
  },
  {
    id: 7,
    parent: 5,
    text: "user.html",
    data: {
      isFolder: false,
      codeContent: userHtmlContent,
      language: "html",
      opened: 0,
      isActive: false,
      focus: false,
    },
  },
  {
    id: 8,
    parent: 2,
    text: "signIn.tsx",
    data: {
      isFolder: false,
      language: "typescript",
      opened: 0,
      codeContent: signInTsxContent,
      isActive: false,
      focus: false,
    },
  },
  {
    id: 9,
    parent: 2,
    text: "signUp.tsx",
    data: {
      isFolder: false,
      language: "typescript",
      opened: 0,
      codeContent: signUpTsxContent,
      isActive: false,
      focus: false,
    },
  },
];
