import { FC, useEffect } from "react";
import Slider from "react-slick";
import { shallowEqual } from "react-redux";
import CardProduct from "components/CardProduct/CardProduct";
import { useAppDispatch, useAppSelector } from "hook";
import { getNovelties } from "store/newProductsSlice";
import { getCertainProducts } from "store/filteringProductSlice";
// @ts-ignore
import { productSliders } from "constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

type ISliders = {
  title: string;
};

const Sliders: FC<ISliders> = ({ title }) => {
  const newProducts = useAppSelector((state) => state.newProducts.newProducts);
  const { iPads, iPhone, Mac, Watch, AirPods } = useAppSelector(
    (state) => state.certainProducts,
    shallowEqual
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getNovelties());
    productSliders.forEach((filterElement: string) => {
      dispatch(
        getCertainProducts({
          sortOrder: "asc",
          filterBy: "name",
          last: 0,
          sortBy: "name",
          filterOrder: filterElement,
        })
      );
    });
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="sliders">
      <div className="slider">
        {title === "NOVELTIES" && (
          <Slider {...settings}>
            {newProducts.length !== 0 &&
              newProducts.map((product) => {
                return (
                  <CardProduct
                    name={product.name}
                    cost={product.cost}
                    img={`${process.env.REACT_APP_URL}/${product.image[0].path}`}
                    key={product.id}
                    id={product.id}
                  />
                );
              })}
          </Slider>
        )}
        {title === "IPad" && (
          <Slider {...settings}>
            {iPads.length !== 0 &&
              iPads.map((product) => {
                return (
                  <CardProduct
                    name={product.name}
                    cost={product.cost}
                    img={`${process.env.REACT_APP_URL}/${product.image[0].path}`}
                    key={product.id}
                    id={product.id}
                  />
                );
              })}
          </Slider>
        )}
        {title === "IPhone" && (
          <Slider {...settings}>
            {iPhone.length !== 0 &&
              iPhone.map((product) => {
                return (
                  <CardProduct
                    name={product.name}
                    cost={product.cost}
                    img={`${process.env.REACT_APP_URL}/${product.image[0].path}`}
                    key={product.id}
                    id={product.id}
                  />
                );
              })}
          </Slider>
        )}
        {title === "Mac" && (
          <Slider {...settings}>
            {Mac.length !== 0 &&
              Mac.map((product) => {
                return (
                  <CardProduct
                    name={product.name}
                    cost={product.cost}
                    img={`${process.env.REACT_APP_URL}/${product.image[0].path}`}
                    key={product.id}
                    id={product.id}
                  />
                );
              })}
          </Slider>
        )}
        {title === "Watch" && (
          <Slider {...settings}>
            {Watch.length !== 0 &&
              Watch.map((product) => {
                return (
                  <CardProduct
                    name={product.name}
                    cost={product.cost}
                    img={`${process.env.REACT_APP_URL}/${product.image[0].path}`}
                    key={product.id}
                    id={product.id}
                  />
                );
              })}
          </Slider>
        )}
        {title === "AirPods" && (
          <Slider {...settings}>
            {AirPods.length !== 0 &&
              AirPods.map((product) => {
                return (
                  <CardProduct
                    name={product.name}
                    cost={product.cost}
                    img={`${process.env.REACT_APP_URL}/${product.image[0].path}`}
                    key={product.id}
                    id={product.id}
                  />
                );
              })}
          </Slider>
        )}
      </div>
      <a className="sliders__all-products" href="/#">
        View All
      </a>
    </div>
  );
};

export default Sliders;
