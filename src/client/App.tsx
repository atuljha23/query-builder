import axios from "axios";
import { QueryBuilder } from "./components/QueryBuilder";

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
    <div>
      <QueryBuilder />
    </div>
  );
}

export default App;
