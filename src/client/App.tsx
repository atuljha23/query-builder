import { QueryBuilder } from "./components/QueryBuilder";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <QueryBuilder />
      </div>
    </ThemeProvider>
  );
}

export default App;
