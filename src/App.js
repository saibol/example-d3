import logo from "./logo.svg";
import "./App.css";
import LineChart from "./components/LineChart";

const sampleData = [
  { date: "2024-03-01", value: 10 },
  { date: "2024-03-02", value: 30 },
  { date: "2024-03-03", value: 20 },
  { date: "2024-03-04", value: 50 },
  { date: "2024-03-05", value: 40 },
];

function App() {
  return (
    <div className="App">
      <LineChart data={sampleData} />
    </div>
  );
}

export default App;
