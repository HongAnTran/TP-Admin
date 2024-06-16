import dashboard from './dashboard';
import product from './product';
import categoryArtice from './categoryArtice';
import article from './article';
import { MenuItems } from '@/types/menuitem';
// ==============================|| MENU ITEMS ||============================== //


const menuItems: MenuItems = {
    items: [dashboard,  product,  categoryArtice ,article]
};

export default menuItems;
