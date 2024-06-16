// assets

import { MenuItemChildren } from '@/types/menuitem';

import DashboardIcon from '@mui/icons-material/Dashboard';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard :MenuItemChildren = {
        id: 'dashboard',
        title: 'Tổng quan',
        type: 'item',
        url: '/',
        icon: DashboardIcon,
        breadcrumbs: true,    
    
};

export default dashboard;
