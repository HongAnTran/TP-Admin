// assets

import { MenuItemChildren } from '@/types/menuitem';

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
import NewspaperIcon from '@mui/icons-material/Newspaper';
const article :MenuItemChildren = {
        id: 'article',
        title: 'bài viết',
        type: 'item',
        url: '/article',
        icon: NewspaperIcon,
        breadcrumbs: true,    
    
};

export default article;
