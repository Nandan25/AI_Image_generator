import "./App.css";
import "./ImageGenerator.css";
import Home from "./components/Home";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="App">
      <SpeedInsights />
      <Home />
    </div>
  );
}

export default App;
