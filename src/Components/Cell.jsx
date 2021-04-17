import React from "react";
import classNames from "classnames";

import getRandomInt from "../utils/getRandomInt";
import foods from "../assets/img/food";

const DIRECTION = {
  RIGHT: "RIGHT",
  UP: "UP",
  LEFT: "LEFT",
  DOWN: "DOWN",
}

function Cell({area, isFood, snakeHead, snake, direction}) {
  const [foodImg, setFoodImg] = React.useState(null);

  React.useEffect(() => {
    setFoodImg(foods[getRandomInt(0, foods.length)])
  }, [isFood])

  return (
      <div
          style={{width: area + "px", height: area + "px"}}
          className={classNames("cell", {
            "snakeHead": snakeHead,
            "snake": snake,
            "food": isFood,
            "up": snakeHead && direction === DIRECTION.UP,
            "down": snakeHead && direction === DIRECTION.DOWN,
            "left": snakeHead && direction === DIRECTION.LEFT,
            "right": snakeHead && direction === DIRECTION.RIGHT,
          })}
      >
        {isFood && <img src={foodImg}/>}

        {
          snakeHead && (
              <>
                <div className="snakeEye"/>
                <div className="snakeEye"/>
                <div className= "snakeMouth"/>
              </>
          )

        }
      </div>
  )
}

export default Cell;