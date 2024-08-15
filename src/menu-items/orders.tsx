// assets

import { MenuItemChildren } from '@/types/menuitem';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
import ListAltIcon from '@mui/icons-material/ListAlt';
const orders: MenuItemChildren = {
        id: 'orders-group',
        title: 'Đơn hàng',
        type: "item",
        icon: <ListAltIcon />,
        breadcrumbs: true,
        url: '/orders',


};

export default orders;
