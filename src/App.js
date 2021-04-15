import React from "react";
import './App.scss';
import Field from "./Components/Field";

const FIELD_WIDTH = 700;
const FIELD_HEIGHT = 700;
const CELL_AREA  = 35;

function App() {
  const [scores, setScores] = React.useState(0);

  const iter = () => {
    setScores(scores => scores+1)
  }

  return (
    <div className="App">
      <Field width={FIELD_WIDTH} height={FIELD_HEIGHT} cellArea={CELL_AREA} onFoodEat={iter} defaultSpeed={500} fastSpeed={70}/>
    </div>
  );
}

export default App;
