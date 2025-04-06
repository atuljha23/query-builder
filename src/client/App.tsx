import axios from "axios";
import { QueryBuilder } from "./components/QueryBuilder";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const handleClick = async () => {
    try {
      await axios.post("/api/save-rules", {});
      alert("Submitted");
    } catch {
      alert("Error");
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <QueryBuilder />
      </div>
    </ThemeProvider>
  );
}

export default App;
