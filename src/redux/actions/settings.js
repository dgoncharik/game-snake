export const SET_DEFAULT_SPEED = "SET_DEFAULT_SPEED";
export const SET_FAST_SPEED = "SET_FAST_SPEED";

export const setDefaultSpeed = (speed) => ({type:SET_DEFAULT_SPEED, payload:speed});
export const setFastSpeed = (speed) => ({type:SET_FAST_SPEED, payload:speed});