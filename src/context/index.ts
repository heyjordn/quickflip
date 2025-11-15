import { createContext } from "react";
import { initialState } from "./initialState";
import type { JSONArray } from "./types";

type StateContextType = {
    initialCards: JSONArray
    cards: JSONArray
};

const StateContext = createContext<StateContextType>(initialState);

export default StateContext