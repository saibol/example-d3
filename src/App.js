import logo from "./logo.svg";
import "./App.css";
import LineChart from "./components/LineChart";

const sampleData = [
  { date: "1/21", value: 947 },
  { date: "1/22", value: 1130 },
  { date: "1/23", value: 947.50 },
  { date: "1/24", value: 1787.50 },
  { date: "1/25", value: 1160.50 },
  { date: "1/26", value: 1357.50 },
  { date: "1/27", value: 1420.50 },
];

function App() {
  return (
    <div className="App">
      <LineChart data={sampleData} />
    </div>
  );
}

export default App;
