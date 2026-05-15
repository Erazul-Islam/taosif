import { ThemeProvider } from "@/src/components/theme-provider";
import Providers from "../../providers";
import Sidebar from "./components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Providers>{children}</Providers>
      </ThemeProvider>
    </div>
  );
}
