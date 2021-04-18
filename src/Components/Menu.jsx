import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {scoreReset, setStarted} from "../redux/actions/game";


const Menu = () => {

  const dispatch = useDispatch();

  const {fieldWidth, fieldHeight} = useSelector(({settings}) => {
    return {
      fieldWidth: settings.fieldWidth,
      fieldHeight: settings.fieldHeight,
    }
  })

  const startGame = () => {
    dispatch(scoreReset());
    dispatch(setStarted(true));
  }

  return (
        <div className="menu" >
          <h1>Snake</h1>
          <div className="menu__wrapper" style={{width: fieldWidth, height: fieldHeight}}>
            <NavLink to="/run" className="button" onClick={startGame}>Старт</NavLink>
            <NavLink to="/settings" className="button">Настройки</NavLink>
          </div>
        </div>
  )
}

export default Menu;