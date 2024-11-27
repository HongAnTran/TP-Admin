import dashboard from "./dashboard";
import product from "./product";
import categoryArtice from "./categoryArtice";
import article from "./article";
import { MenuItems } from "@/types/menuitem";
import orders from "./orders";
import settings from "./settings";
// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
  items: [dashboard, product, orders, categoryArtice, article, settings],
};

export function getMenuByRole(role: string) {
  switch (role) {
    case "ADMIN":
      return {
        items: [dashboard, product, orders, categoryArtice, article, settings],
      };
    case "CONTENT":
      return {
        items: [dashboard, categoryArtice, article],
      };
    default:
      return {
        items: [],
      };
  }
}

export default menuItems;
