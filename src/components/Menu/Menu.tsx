import { SetStateAction, Dispatch, FC, useRef, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import Search from "components/Search/Search";
// @ts-ignore
import { dropdownItems } from "constants";
import "./style.scss";

interface IMenuProps {
  menuActive: boolean;
  setMenuActive: Dispatch<SetStateAction<boolean>>;
}

interface INavigationLinks {
  value: string;
  href: string;
  id: number;
}

const Menu: FC<IMenuProps> = ({ menuActive, setMenuActive }) => {
  const refMenu = useRef<HTMLDivElement>(null);
  const matches = useMediaQuery("only screen and (max-width: 600px)");

  useEffect(() => {
    const handleScroll = () => {
      if (refMenu.current !== null) {
        window.scrollY > 50
          ? (refMenu.current.className = "menu-content menu-subsequent")
          : (refMenu.current.className = "menu-content");
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={menuActive ? "menu-dropdown active" : "menu-dropdown"}
      onClick={() => setMenuActive(false)}
    >
      <nav
        className="menu-content"
        onClick={(e) => e.stopPropagation()}
        ref={refMenu}
      >
        {matches && <Search />}
        <ul className="menu-content__list">
          {dropdownItems.map((item: INavigationLinks) => (
            <li key={item.id} className="menu-content__link-element">
              <a
                href={item.href}
                className="menu-content__link"
                onClick={() => setMenuActive(false)}
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
