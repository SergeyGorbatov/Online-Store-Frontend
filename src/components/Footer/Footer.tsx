import { FC } from "react";
import telegrammIcon from "img/telegrammIcon.svg";
import vkIcon from "img/vkIcon.svg";
// @ts-ignore
import { dropdownItems } from "constants";
import "./style.scss";

interface IDropdownItems {
  value: string;
  href: string;
  id: number;
}

const Footer: FC = () => {
  return (
    <footer className="footer">
      <ul className="footer__list">
        {dropdownItems.map((item: IDropdownItems) => (
          <li key={item.id} className="footer__item">
            <a href={item.href} className="footer__links">
              {item.value}
            </a>
          </li>
        ))}
      </ul>
      <nav className="footer__social-media">
        <a href="/#" className="footer__icons">
          <img src={telegrammIcon} alt="telegrammIcon" />
        </a>
        <a href="/#" className="footer__icons">
          <img src={vkIcon} alt="vkIcon" />
        </a>
      </nav>
      <div className="footer__copyright">
        Copyright © Apple 2022 Ltd. All rights reserved.
      </div>
      <a href="/#" className="footer__privacy-policy">
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
