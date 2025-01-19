export type FilterAction =
  | { type: "SET_TEXT"; payload: string }
  | { type: "TOGGLE_ENERGY" }
  | { type: "TOGGLE_CRITICAL" };

