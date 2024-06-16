// assets

import { MenuItemChildren } from '@/types/menuitem';

import Inventory2Icon from '@mui/icons-material/Inventory2';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const categoryArtice :MenuItemChildren = {
        id: 'categoryArtice',
        title: 'Danh mục bài viết',
        type: 'item',
        url: '/categoryArtice',
        icon: Inventory2Icon,
        breadcrumbs: true,    
    
};

export default categoryArtice;
