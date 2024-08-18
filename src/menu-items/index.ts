import dashboard from './dashboard';
import product from './product';
import categoryArtice from './categoryArtice';
import article from './article';
import { MenuItems } from '@/types/menuitem';
import orders from './orders';
import settings from './settings';
// ==============================|| MENU ITEMS ||============================== //


const menuItems: MenuItems = {
    items: [dashboard,  product, orders, categoryArtice ,article , settings]
};

export default menuItems;
