import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "hook";
import {
  decrement,
  increaseProductCart,
  decreaseProductCart,
  increment,
} from "store/amountProductSlice";
import { addProductToFavorites } from "store/favoriteProductsSlice";
import { formatter } from "helpers/formatter";
import "./style.scss";

interface ICardProductProps {
  name: string;
  cost: number;
  img: string;
  id: number;
}

const CardProduct: FC<ICardProductProps> = ({ name, cost, img, id }) => {
  const [addedProduct, setAddedProduct] = useState(false);
  const { auth, errorAuth } = useAppSelector(
    (state) => state.authentication,
    shallowEqual
  );
  const amountProducts = useAppSelector(
    (state) => state.amountProduct.amountProducts
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addToCard = () => {
    if (!auth && errorAuth) {
      return navigate("/auth/login");
    }

    dispatch(increment(id));
    dispatch(increaseProductCart(id));
    setAddedProduct(true);
  };

  const increaseAmountProduct = () => {
    dispatch(increment(id));
    dispatch(increaseProductCart(id));
  };

  const decreaseAmountProduct = () => {
    if (amountProducts[id] === 1) {
      setAddedProduct(false);
    }

    dispatch(decrement(id));
    dispatch(decreaseProductCart(id));
  };

  const addProductFavorite = () => {
    if (!auth && errorAuth) {
      return navigate("/auth/login");
    }

    dispatch(addProductToFavorites(id));
  };

  return (
    <div className="product-card">
      <div className="product-wrap">
        <img alt={name} src={img} className="product-wrap__image" />
        {addedProduct ? (
          <div className="product-wrap__actions product-wrap__actions-active">
            <button onClick={decreaseAmountProduct}>-</button>
            <p className="product-wrap__quantity">{amountProducts[id]}</p>
            <button onClick={increaseAmountProduct}>+</button>
          </div>
        ) : (
          <div className="product-wrap__actions">
            <button className="product-wrap__add-to-cart" onClick={addToCard} />
            <button
              className="product-wrap__favorite"
              onClick={addProductFavorite}
            />
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-info__title">
          <a className="product-info__name" href="/#">
            {name}
          </a>
        </h3>
        <span className="product-info__price">{formatter.format(cost)}</span>
      </div>
    </div>
  );
};

export default CardProduct;
