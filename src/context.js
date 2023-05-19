import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();
const intialValue = {
  loading: true,
  error: "",
  post: {},
};
const getState = (state, action) => {
  switch (action.type) {
    case "success":
      return {
        loading: false,
        error: "",
        post: action.payload,
      };
    case "fail":
      return {
        loading: false,
        error: "something get wrong!",
        post: {},
      };

    default:
      return state;
  }
};
const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItems);
  const [all, setAll] = useState(4);
  const [total, setTotal] = useState(0);
  const [count, disPatch] = useReducer(getState, intialValue);
  const getFetch = async () => {
    const response = await fetch(url).then((response) => response.json());
    disPatch({ type: "success", payload: response });
  };
  useEffect(() => {
    getFetch();
  }, []);
  return (
    <AppContext.Provider
      value={{
        cart,
        loading: count.loading,
        data: count.post,
        all,
        setAll,
        total,
        setTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
