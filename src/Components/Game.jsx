import React from "react";
import Field from "./Field";
import {useDispatch, useSelector} from "react-redux";
import {scoreAdd, scoreReset, setStarted} from "../redux/actions/game";
import {Redirect} from "react-router-dom";

const Game = () => {

  const dispatch = useDispatch();

  const {started, scores, fieldWidth, fieldHeight, cellArea, defaultSpeed, fastSpeed} = useSelector(({game, settings}) => {
    return {
      started: game.started,
      scores: game.scores,
      fieldWidth: settings.fieldWidth,
      fieldHeight: settings.fieldHeight,
      cellArea: settings.cellArea,
      defaultSpeed: settings.defaultSpeed,
      fastSpeed: settings.fastSpeed
    }
  })

  const [numberStarts, setNumberStarts] = React.useState(1);

  const stopGame = () => {
    dispatch(scoreReset());
    dispatch(setStarted(false));
  }

  const restart = () => {
    dispatch(scoreReset());
    setNumberStarts(n => n+1);
  }

  const onFoodEat = () => {
    dispatch(scoreAdd(1));
  }

  if (!started) {
    return <Redirect to="/menu"/>
  }

  return (
      <div className="game">
        <h1 className="game__title">Очки: {scores}
          <div className="game__button-wrapper">
            <button onClick={restart} className="button game__button">Рестарт</button>
            <button onClick={stopGame} className="button game__button">Выход</button>
          </div>
        </h1>
        <Field key={numberStarts} width={fieldWidth} height={fieldHeight} cellArea={cellArea} onFoodEat={onFoodEat} defaultSpeed={defaultSpeed} fastSpeed={fastSpeed}/>
      </div>
  )
}

export default Game;