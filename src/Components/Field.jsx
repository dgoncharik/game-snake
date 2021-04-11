import React from "react";
import Cell from "./Cell";
import getRandomInt from "../utils/getRandomInt";

const DIRECTION = {
  RIGHT: "RIGHT",
  UP: "UP",
  LEFT: "LEFT",
  DOWN: "DOWN",
}



const generateCells = ((numberRows, numberColumns) => {
  console.log("generate Cells")
  const cells = [];

  for (let row=1; row < numberRows + 1; row++) {
    for (let col=1; col < numberColumns + 1; col++) {
      cells.push({row, col})
    }
  }
  return cells;
})


function Field({width, height, cellArea}) {
  const numberRows = Math.floor(height / cellArea);
  const numberColumns = Math.floor(width / cellArea);

  const getRandomCell = () => ({...cells[getRandomInt(0, cells.length)]});

  const [cells, setCells] = React.useState(_ => generateCells(numberRows, numberColumns)); // [{row:1, col:1}, {row:1, col:2}...]
  const [direction, setDirection] = React.useState(DIRECTION.RIGHT);
  const [snake, setSnake] = React.useState([{row:1, col:2}, {row:1, col:1}]);
  const [food, setFood] = React.useState(getRandomCell);
  const [step, setStep] = React.useState(0);

  const refDirection = React.useRef(direction);
  refDirection.current = direction;

  const refInterval = React.useRef(null);

  const onKeyDown = (evt) => {
    const controlButtonPressed = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].some(key => key === evt.code);
    if (controlButtonPressed) {
      evt.preventDefault();

      if (evt.code === "ArrowRight" && refDirection.current !== DIRECTION.LEFT) {
        setDirection(DIRECTION.RIGHT)
      } else if (evt.code === "ArrowLeft" && refDirection.current !== DIRECTION.RIGHT) {
        setDirection(DIRECTION.LEFT)
      } else if (evt.code === "ArrowUp" && refDirection.current !== DIRECTION.DOWN) {
        setDirection(DIRECTION.UP)
      } else if (evt.code === "ArrowDown" && refDirection.current !== DIRECTION.UP) {
        setDirection(DIRECTION.DOWN)
      }

    }
  }

  const snakeStep = () => {
    setSnake(snake => {

      let newHeadPosition = null;

      switch (refDirection.current) {
        case (DIRECTION.RIGHT):
          newHeadPosition = {...snake[0], col: snake[0].col+1};
          break;
        case(DIRECTION.LEFT):
          newHeadPosition = {...snake[0], col: snake[0].col-1};
          break
        case(DIRECTION.UP):
          newHeadPosition = {...snake[0], row: snake[0].row-1};
          break;
        case(DIRECTION.DOWN):
          newHeadPosition = {...snake[0], row: snake[0].row+1};
          break;
        default:
          throw Error(`Direction error! Direction can't be "${refDirection.current}"`);
      }

      let newSnake = snake;
      if (newHeadPosition) {
        newSnake = [newHeadPosition, ...snake];
        newSnake.pop()
      }

      return newSnake;
    })

    setStep(step => step+1);
  }

  React.useEffect(() => {

    window.addEventListener("keydown", onKeyDown);
    refInterval.current = setInterval(snakeStep, 300);

    return () => {
      clearInterval(refInterval.current);
      window.removeEventListener("keydown", onKeyDown);
    }

  }, [])


  React.useEffect(() => {

    const snakeHead = snake[0];
    const snakeTail = snake.slice(1);
    const tailCollision = snakeTail.some(el => el.row === snakeHead.row && el.col === snakeHead.col);
    const snakeAteFood = snakeHead.row === food.row && snakeHead.col === food.col;
    const snakeIsOutColumns = snakeHead.col < 1 || snakeHead.col > numberColumns;
    const snakeIsOutRows    = snakeHead.row < 1 || snakeHead.row > numberRows;

    if (tailCollision) {
      clearInterval(refInterval.current);
      alert("Столкновение с хвостом")
    }

    if (snakeAteFood) {
      setSnake(snake => [...snake, {row:snakeHead.row, col:snakeHead.col}])
      setFood(getRandomCell());
    }

    if (snakeIsOutColumns || snakeIsOutRows) {

      setSnake(snake => {
        const newSnake = [...snake];

        if (snakeIsOutColumns) {
          newSnake[0].col = snakeHead.col < 1 ? numberColumns : 1;
        } else {
          newSnake[0].row = snakeHead.row < 1 ? numberRows : 1;
        }

        return newSnake;
      })
      setStep(step => step+1);
    }

  }, [step])

  return (
      cells.length > 0 &&
      <div className="field" style={{width: width + "px", height: height + "px"}}>
        {
          cells.map(cell => (
              <Cell
                  key={`${cell.row}_${cell.col}`}
                  row={cell.row}
                  col={cell.col}
                  area={cellArea}
                  isFood={cell.row === food.row && cell.col === food.col}
                  snake={snake.find(tail => cell.row === tail.row && cell.col === tail.col)}
                  snakeHead={snake[0].row === cell.row && snake[0].col === cell.col}
              />
          ))
        }
      </div>

  )
}

export default Field;