import React from "react";
import classNames from "classnames";

import getRandomInt from "../utils/getRandomInt";
import foods from "../assets/img/food";

function Cell({area, isFood, snakeHead, snake, snakeEnd}) {
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
            "snakeEnd": snakeEnd,
            "food": isFood
          })}
      >
        {isFood && <img src={foodImg}/>}
      </div>
  )
}

export default Cell;