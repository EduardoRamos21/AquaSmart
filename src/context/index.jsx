import { createContext, useContext, useReducer } from "react";

// Estado inicial
const initialState = {
  openSidenav: true,
  sidenavColor: "blue",
  sidenavType: "dark",
};

// Acciones
const SET_SIDENAV = "SET_SIDENAV";

// Reductor
const reducer = (state, action) => {
  switch (action.type) {
    case SET_SIDENAV:
      return { ...state, openSidenav: action.value };
    default:
      return state;
  }
};

// Crear contexto
const MaterialTailwindContext = createContext(null);

// Proveedor
export const MaterialTailwindControllerProvider = ({ children }) => {
  const [controller, dispatch] = useReducer(reducer, initialState);

  return (
    <MaterialTailwindContext.Provider value={[controller, dispatch]}>
      {children}
    </MaterialTailwindContext.Provider>
  );
};

// Hooks personalizados
export const useMaterialTailwindController = () =>
  useContext(MaterialTailwindContext);

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: SET_SIDENAV, value });
