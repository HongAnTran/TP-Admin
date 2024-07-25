// assets

import { MenuItemChildren } from '@/types/menuitem';

import Inventory2Icon from '@mui/icons-material/Inventory2';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //
import CategoryIcon from '@mui/icons-material/Category';

const product: MenuItemChildren = {
        id: 'product-group',
        title: 'Sản phẩm',
        type: "collapse",
        icon: <Inventory2Icon />,
        breadcrumbs: true,
        children: [
                {
                        id: 'category',
                        title: 'Danh mục sản phẩm',
                        type: "item",
                        url: '/category',
                        icon: <CategoryIcon />,
                        breadcrumbs: true,
                },
                {
                        id: 'product',
                        title: 'Tất cả sản phẩm',
                        type: "item",
                        url: '/product',
                        icon: <Inventory2Icon />,
                        breadcrumbs: true,
                },
            
        ]

};

export default product;
