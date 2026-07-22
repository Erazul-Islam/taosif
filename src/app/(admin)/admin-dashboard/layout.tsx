import { ThemeProvider } from "@/src/components/theme-provider";
import Providers from "../../providers";
import Sidebar from "./components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <Providers>{children}</Providers>
        </div>
      </ThemeProvider>
    </div>
  );
}
