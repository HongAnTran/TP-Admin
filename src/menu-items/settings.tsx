// assets

import { MenuItemChildren } from '@/types/menuitem';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
import NewspaperIcon from '@mui/icons-material/Newspaper';
const settings :MenuItemChildren = {
        id: 'settings',
        title: 'Cấu hình',
        type: 'item',
        url: '/settings',
        icon: <NewspaperIcon />,
        breadcrumbs: true,    
    
};

export default settings;
