import { FC } from "react";
import Sliders from "components/Slider/Slider";
// @ts-ignore
import { productСategoryHeaders } from "constants";
import "./style.scss";

interface IProductСategoryHeaders {
  value: string;
  id: number;
}

const Home: FC = () => {
  return (
    <div className="home-page">
      <div className="home-page__slogan-banner" />
      {productСategoryHeaders.map((title: IProductСategoryHeaders) => (
        <div className="slider-wrap" key={title.id}>
          <h1 className="slider-wrap__title">{title.value}</h1>
          <Sliders title={title.value} />
        </div>
      ))}
    </div>
  );
};

export default Home;
