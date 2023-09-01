import { Menu } from "@headlessui/react";
import "./MenuDropDown.css";
const MenuDropDown = () => {
  return (
    <Menu>
      <Menu.Button>Navigate</Menu.Button>
      <Menu.Items className={"menu-list-cont"}>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? "menu-item active-item" : "menu-item"}`}
              href="/"
            >
              Landing
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? "menu-item active-item" : "menu-item"}`}
              href="/studi"
            >
              Nemanja Studovic
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? "menu-item active-item" : "menu-item"}`}
              href="/stevo"
            >
              Balsa Stevovic
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active ? "menu-item active-item" : "menu-item"}`}
              href="/baki"
            >
              Balsa Ratkovic
            </a>
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
