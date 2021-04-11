import React from "react";
import './App.scss';
import Field from "./Components/Field";

const FIELD_WIDTH = 700;
const FIELD_HEIGHT = 700;
const CELL_AREA  = 35;

function App() {

  return (
    <div className="App">
        <Field width={FIELD_WIDTH} height={FIELD_HEIGHT} cellArea={CELL_AREA}/>
    </div>
  );
}

export default App;
