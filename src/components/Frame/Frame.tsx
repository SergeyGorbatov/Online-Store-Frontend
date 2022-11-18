import { FC, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menu from "components/Menu/Menu";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import "./style.scss";

interface Props {
  children?: React.ReactNode;
}

const Frame: FC<Props> = ({ children }) => {
  const [menuActive, setMenuActive] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="frame">
      <Header menuActive={menuActive} setMenuActive={setMenuActive} />
      <main className="frame__content">{children ? children : <Outlet />}</main>
      <Menu menuActive={menuActive} setMenuActive={setMenuActive} />
      <Footer />
    </div>
  );
};

export default Frame;
