import React, { useReducer, ReactNode } from "react";
import { FiltersContext } from "./FiltersContext";

import type { FilterAction } from "./types";
import type { Filters } from "../../types";

import { initialFilters } from "./initialState";

const filterReducer = (state: Filters, action: FilterAction): Filters => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "TOGGLE_ENERGY":
      return { ...state, energy: !state.energy };
    case "TOGGLE_CRITICAL":
      return { ...state, critical: !state.critical };
    default:
      return state;
  }
};

const FiltersProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  
    return (
      <FiltersContext.Provider value={{ filters, dispatch }}>
        {children}
      </FiltersContext.Provider>
    );
  };

  export { FiltersProvider}