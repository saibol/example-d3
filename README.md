# Line Chart with D3.js and React

This project implements a line chart using **D3.js** in a **React** component. It dynamically renders a line graph based on input data.

## Features
- Renders a responsive line chart using D3.js
- Supports dynamic data updates
- Displays horizontal grid lines for better readability
- Uses a linear curve for sharp angles

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/line-chart-d3-react.git
   cd line-chart-d3-react
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

## Usage

Import the `LineChart` component and provide it with data:

```jsx
import LineChart from "./LineChart";

const data = [
  { date: "2024-01-01", value: 10 },
  { date: "2024-01-02", value: 15 },
  { date: "2024-01-03", value: 8 },
  { date: "2024-01-04", value: 20 }
];

function App() {
  return (
    <div>
      <h2>Line Chart</h2>
      <LineChart data={data} width={600} height={400} />
    </div>
  );
}

export default App;
```

## Dependencies
- React
- D3.js

## Customization
- Modify the `width` and `height` props to change the chart size.
- Adjust the color of the line by changing `stroke` in the `<path>` element.
- Modify the axis formatting in `d3.axisBottom` and `d3.axisLeft`.

## Output
![Line Chart Output](src/line-graph.png)

## License
This project is licensed under the MIT License.

