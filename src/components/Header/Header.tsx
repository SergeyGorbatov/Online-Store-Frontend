import { FC, useRef, SetStateAction, Dispatch, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import Search from "components/Search/Search";
import AccountMenu from "components/AccountMenu/AccountMenu";
import logoStore from "img/logo-apple.png";
import "./style.scss";

interface IMenuProps {
  menuActive: boolean;
  setMenuActive: Dispatch<SetStateAction<boolean>>;
}

const Header: FC<IMenuProps> = ({ menuActive, setMenuActive }) => {
  const refHeader = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery("only screen and (min-width: 600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (refHeader.current !== null) {
        window.scrollY > 50
          ? (refHeader.current.className = "header subsequent-header")
          : (refHeader.current.className = "header");
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header" ref={refHeader}>
      <div className="content">
        <div className="menu">
          <button
            type="button"
            className="menu__logo-menu"
            onClick={() => setMenuActive(!menuActive)}
          />
          <img
            src={logoStore}
            alt="Логотип интернет-магазина"
            className="menu__logo-store"
          />
        </div>
        {matches && <Search />}
        <div className="user-block">
          <button
            type="button"
            className="user-block__logo-bag"
            onClick={() => navigate("/basket")}
          />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
