import { FC, useEffect } from "react";
import { shallowEqual } from "react-redux";
import Progress from "components/Progress/Progress";
import Button from "@mui/material/Button";
import {
  decreaseProductCart,
  clearBasket,
  getBasket,
} from "store/amountProductSlice";
import { useAppDispatch, useAppSelector } from "hook";
import { formatter } from "helpers/formatter";
import deleteCard from "img/delete.png";
import tumbleweed from "img/tumbleweed.png";
import "./style.scss";

const Basket: FC = () => {
  const { basket, loadingBasket } = useAppSelector(
    (state) => state.amountProduct,
    shallowEqual
  );

  const dispatch = useAppDispatch();

  const deleteProduct = async (id: number) => {
    await dispatch(decreaseProductCart(id));
    dispatch(getBasket());
  };

  const clearCart = async () => {
    console.log("click");

    await dispatch(clearBasket());
    dispatch(getBasket());
  };

  useEffect(() => {
    dispatch(getBasket());
  }, [dispatch]);

  if (loadingBasket === "loading") {
    return <Progress />;
  }

  return (
    <div className="basket-wrap">
      <div className="basket-wrap__header">
        <div className="basket-wrap__title">Shopping Cart</div>
        <Button variant="contained" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
      {!!basket.length ? (
        <ul className="basket-wrap__list">
          {basket.map((card: any) => (
            <li key={card.product.id} className="cards-basket">
              <div className="cards-basket__logo">
                <img
                  src={`${process.env.REACT_APP_URL}/${card.product.image[0].path}`}
                  alt="product"
                />
              </div>
              <div className="cards-basket__content">
                <div className="cards-basket__header">{card.product.name}</div>
                <div className="cards-basket__count">Count: {card.count}</div>
                <div className="cards-basket__price">
                  {formatter.format(card.product.cost * card.count)}
                </div>
                <button
                  className="cards-basket__delete"
                  onClick={() => deleteProduct(card.product.id)}
                >
                  <img src={deleteCard} alt="delete-card" />
                </button>
              </div>
            </li>
          ))}
          <div className="place-order-wraper">
            <Button variant="contained" className="place-order">
              Place Order
            </Button>
          </div>
        </ul>
      ) : (
        <div>
          <p className="basket-empty">Your basket is empty :&#40;</p>
          <img src={tumbleweed} alt="" className="tumbleweed" />
        </div>
      )}
    </div>
  );
};

export default Basket;
