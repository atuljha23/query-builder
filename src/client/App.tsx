import axios from "axios";

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
      <h1>Query Builder</h1>
      <form>
        <button type="button" onClick={handleClick}>
          Submit
        </button>
        <button type="button" onClick={handleClick}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default App;
