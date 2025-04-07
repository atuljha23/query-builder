import { QueryBuilder } from "./components/QueryBuilder";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <QueryBuilder />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
