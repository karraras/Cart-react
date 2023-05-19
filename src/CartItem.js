import React from "react";
import { useGlobalContext } from "./context";

const CartItem = () => {
  const { data, setAll, setTotal } = useGlobalContext();
  const inial = {
    count1: 1,
    count2: 1,
    count3: 1,
    count4: 1,
    price: 0,
  };
  // price: 2199.96,
  const getNumber = (state, action) => {
    switch (action.type) {
      case "increase0":
        return {
          ...state,
          count1: state.count1 + 1,
          price: state.price + action.price,
        };
      case "decrease0":
        return {
          ...state,
          count1: state.count1 - 1,
          price: state.price - action.price,
        };
      case "increase1":
        return {
          ...state,
          count2: state.count2 + 1,
          price: state.price + action.price,
        };
      case "decrease1":
        return {
          ...state,
          count2: state.count2 - 1,
          price: state.price - action.price,
        };
      case "increase2":
        return {
          ...state,
          count3: state.count3 + 1,
          price: state.price + action.price,
        };
      case "decrease2":
        return {
          ...state,
          count3: state.count3 - 1,
          price: state.price + action.price,
        };
      case "increase3":
        return {
          ...state,
          count4: state.count4 + 1,
          price: state.price + action.price,
        };
      case "decrease3":
        return {
          ...state,
          count4: state.count4 - 1,
          price: state.price - action.price,
        };
      default:
        return state;
    }
  };
  const [num0, disPatch0] = React.useReducer(getNumber, inial);
  const [num1, disPatch1] = React.useReducer(getNumber, inial);
  const [num2, disPatch2] = React.useReducer(getNumber, inial);
  const [num3, disPatch3] = React.useReducer(getNumber, inial);
  React.useEffect(() =>
    setAll(() => num0.count1 + num1.count2 + num2.count3 + num3.count4)
  );
  React.useEffect(() =>
    setTotal(num0.price + num1.price + num2.price + num3.price + 2199.96)
  );
  const [newData, setData] = React.useState(data);

  const removeItem = (id) => {
    const newz = newData.filter((item) => {
      return item.id !== id;
    });
    setData(newz);
  };
  return newData.map((item, index) => {
    return (
      <article className="cart-item" key={index}>
        <img src={item.img} alt="" />
        <div>
          <h4>{item.title}</h4>
          <h4 className="item-price">${item.price}</h4>
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            remove
          </button>
        </div>
        <div>
          <button
            className="amount-btn"
            onClick={
              index === 0
                ? () =>
                    disPatch0({ type: "increase0", price: Number(item.price) })
                : index === 1
                ? () =>
                    disPatch1({ type: "increase1", price: Number(item.price) })
                : index === 2
                ? () =>
                    disPatch2({ type: "increase2", price: Number(item.price) })
                : () =>
                    disPatch3({ type: "increase3", price: Number(item.price) })
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
            </svg>
          </button>
          {index === 0 ? (
            <p className="amount">{num0.count1}</p>
          ) : index === 1 ? (
            <p className="amount">{num1.count2}</p>
          ) : index === 2 ? (
            <p className="amount">{num2.count3}</p>
          ) : (
            <p className="amount">{num3.count4}</p>
          )}

          <button
            className="amount-btn"
            onClick={
              index === 0
                ? () =>
                    disPatch0({
                      type: "decrease0",
                      price: Number(item.price),
                    })
                : index === 1
                ? () =>
                    disPatch1({ type: "decrease1", price: Number(item.price) })
                : index === 2
                ? () =>
                    disPatch2({ type: "decrease2", price: Number(item.price) })
                : () =>
                    disPatch3({ type: "decrease3", price: Number(item.price) })
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </button>
        </div>
      </article>
    );
  });
};

export default CartItem;
