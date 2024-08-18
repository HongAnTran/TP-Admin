// assets

import { MenuItemChildren } from '@/types/menuitem';
import SettingsIcon from '@mui/icons-material/Settings';
// ==============================|| DASHBOARD MENU ITEMS ||============================== //
const settings :MenuItemChildren = {
        id: 'settings',
        title: 'Cấu hình',
        type: 'item',
        url: '/settings',
        icon: <SettingsIcon />,
        breadcrumbs: true,    
    
};

export default settings;
