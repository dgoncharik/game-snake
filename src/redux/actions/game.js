export const SET_STARTED = "SET_STARTED";
export const SCORE_ADD = "SCORE_ADD";
export const SCORE_RESET = "SCORE_RESET";

export const setStarted = (boolean) => ({type:SET_STARTED, payload:boolean});
export const scoreAdd = (number) => ({type:SCORE_ADD, payload: number});
export const scoreReset = () => ({type:SCORE_RESET});