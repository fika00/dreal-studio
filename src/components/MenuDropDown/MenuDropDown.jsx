import { Menu } from "@headlessui/react";
import "./MenuDropDown.css";
import { Link, Router } from "react-router-dom";
const MenuDropDown = () => {
  return (
    <Menu>
      <Menu.Button>Navigate</Menu.Button>
      <Menu.Items className={"menu-list-cont"}>
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/"
              className={`${active ? "menu-item active-item" : "menu-item"}`}
            >
              Landing
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/studi"
              className={`${active ? "menu-item active-item" : "menu-item"}`}
            >
              Nemanja Studovic
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/stevo"
              className={`${active ? "menu-item active-item" : "menu-item"}`}
            >
              Balsa Stevovic
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/baki"
              className={`${active ? "menu-item active-item" : "menu-item"}`}
            >
              Balsa Ratkovic
            </Link>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="menu-item in-progress">David Vojvoda</span>
        </Menu.Item>
        <Menu.Item disabled>
          <span className="menu-item in-progress">Filip Radinovic</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default MenuDropDown;
