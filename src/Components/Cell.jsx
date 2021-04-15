import React from "react";
import classNames from "classnames";
import cherry from "../assets/img/food/cherry.png";

function Cell({row, col, area, isFood, snakeHead, snake}) {
  return (
      <div
          style={{width: area + "px", height: area + "px"}}
          className={classNames("cell", {
            "snakeHead": snakeHead,
            "snake": snake
          })}
      >
        {isFood && <img src={cherry}/>}
      </div>
  )
}

export default Cell;