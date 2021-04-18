import React from "react";
import Cell from "./Cell";
import getRandomInt from "../utils/getRandomInt";
import classNames from "classnames";
import {DIRECTION} from "../constants"

const generateCells = ((numberRows, numberColumns) => {
  const cells = [];

  for (let row=1; row < numberRows + 1; row++) {
    for (let col=1; col < numberColumns + 1; col++) {
      cells.push({row, col})
    }
  }
  return cells;
})


function Field({width, height, cellArea, onFoodEat, defaultSpeed, fastSpeed, onGameOver}) {
  const numberRows = Math.floor(height / cellArea);
  const numberColumns = Math.floor(width / cellArea);
  const [cells, setCells] = React.useState(() => generateCells(numberRows, numberColumns)); // [{row:1, col:1}, {row:1, col:2}...]
  const [snake, setSnake] = React.useState([{row:getRandomInt(1, numberRows), col:getRandomInt(1, numberColumns)}, {}]);

  const getRandomCellWithoutSnake = () => {
    const allowedCells = cells.filter(cell => !snake.find( snakeCell => cell.row === snakeCell.row && cell.col === snakeCell.col));
    return allowedCells[getRandomInt(0, allowedCells.length)];
  }

  const [direction, setDirection] = React.useState(DIRECTION.RIGHT);
  const [food, setFood] = React.useState(getRandomCellWithoutSnake);
  const [accelerationMode, setAccelerationMode] = React.useState(false);
  const [isLosing, setIsLosing] = React.useState(false);

  const refDirection = React.useRef(direction);
  refDirection.current = direction;

  const refInterval = React.useRef({id:null, speed: defaultSpeed});
  refInterval.current.speed = accelerationMode ? fastSpeed : defaultSpeed;

  const onKeyDown = (evt) => {
    const controlButtonPressed = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "ControlLeft"].some(key => key === evt.code);

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
      } else if (evt.code === "ControlLeft") {
        setAccelerationMode(true);
      }
    }
  }

  const onKeyUp = (evt) => {
    if (evt.code === "ControlLeft") {
      evt.preventDefault();
      setAccelerationMode(false);
    }
  }

  const gameOver = () => {
    setIsLosing(true);
    if (onGameOver) {
      onGameOver();
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
  }

  React.useEffect(() => {
    if (!isLosing) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    }

  }, [isLosing])

  React.useEffect(() => {
    if (!isLosing) {
      refInterval.current.id = setInterval(snakeStep, refInterval.current.speed);
    }
    return () => clearInterval(refInterval.current.id)
  }, [accelerationMode, isLosing])


  React.useEffect(() => {
    const snakeHead         = snake[0];
    const snakeTail         = snake.slice(1);
    const tailCollision     = snakeTail.some(el => el.row === snakeHead.row && el.col === snakeHead.col);
    const snakeAteFood      = snakeHead.row === food.row && snakeHead.col === food.col;
    const snakeIsOutColumns = snakeHead.col < 1 || snakeHead.col > numberColumns;
    const snakeIsOutRows    = snakeHead.row < 1 || snakeHead.row > numberRows;

    if (tailCollision) {
      gameOver();
    }

    if (snakeAteFood) {
      setSnake([...snake, {}]) //row:snakeHead.row, col:snakeHead.col
      setFood(getRandomCellWithoutSnake());
      if (onFoodEat) {
        onFoodEat();
      }
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
    }

  }, [snake])

  return (
      !!cells.length &&
      <div className={classNames("field", {isLosing: isLosing})} style={{width: width + "px", height: height + "px"}}>
        {
          cells.map(cell => (<Cell
                key={`${cell.row}_${cell.col}`}
                row={cell.row}
                col={cell.col}
                area={cellArea}
                isFood={cell.row === food.row && cell.col === food.col}
                snake={snake.find(tail => cell.row === tail.row && cell.col === tail.col)}
                snakeHead={snake[0].row === cell.row && snake[0].col === cell.col}
                direction={refDirection.current}
            />
          ))
        }
      </div>
  )
}

export default Field;