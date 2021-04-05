import React from "react";
import classNames from "classnames";

import cherry from "../assets/img/food/cherry.png"
import getRandomInt from "../utils/getRandomInt";


function Field({width, height}) {
  const CELL_AREA     = 35;
  const countColumns  = Math.floor(width / CELL_AREA);
  const countRows     = Math.floor(height / CELL_AREA);

  const [cells, setCells] = React.useState([]);

  const [foodCell, setFoodCell] = React.useState({
    row: getRandomInt(1, countRows + 1),
    col: getRandomInt(1, countColumns + 1)
  });

  const [snake, setSnake] = React.useState({
    head: {
      col: Math.floor(countColumns / 2),
      row: Math.floor(countRows / 2)
    },
    tail: 1
  })

  const setRandomFoodCell = () => {
    setFoodCell(() => ({
      row: getRandomInt(1, countRows + 1),
      col: getRandomInt(1, countColumns + 1)
    }))
  }

  const generateCells = () => {
    const newCells = [];

    for (let row=1; row < countRows + 1; row++) {
      for (let col=1; col < countColumns + 1; col++) {
        const haveFood = (row === foodCell.row && col === foodCell.col);
        newCells.push(<Cell
            key={`${row}_${col}`}
            foodHere={haveFood}
            col={col}
            row={row}
            area={CELL_AREA}/>)
      }
    }

    setCells(newCells);
  }


  React.useEffect(() => {
    generateCells();
  },[foodCell])


  return (
      <div className="field" style={{width: width + "px", height: height + "px"}}>
        {cells}
      </div>
  )
}

function Cell({foodHere, row, col, area, snake}) {

  return(
      <div
          className={"cell"}
          data-row={row}
          data-col={col}
          data-here-eat={foodHere}
          style={{width: area + "px", height: area + "px"}}>
        {
          foodHere && <img src={cherry}/>
        }
      </div>
  )
}

function Snake() {
  return (
      <div className="snake">

      </div>
  )
}

export default Field;