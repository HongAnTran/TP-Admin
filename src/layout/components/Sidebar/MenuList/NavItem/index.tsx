import { forwardRef, useEffect } from "react";
import {  NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { setMenuOpen , setMenu  } from '@/redux/slices/customSlice/customSlice'
// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //
import type { RootState } from "@/redux/store";
// import type {  MenuItemChildren } from '../../../../../menu-items'
import config from "@/config";
import { MenuItemChildren } from "@/types/menuitem";

const NavItem = ({ item, level }: { item:  MenuItemChildren; level: number }) => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const customization = useSelector((state: RootState) => state.custom);

  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();

  const itemIcon = item?.icon ? (
    <>
    
    {item.icon}</>
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps: any = {
    component: forwardRef((props: any, ref: any) => (
      <NavLink ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch(setMenuOpen(id));
    if (matchesSM) dispatch(setMenu(false));
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(setMenuOpen(item.id));
    }
    else{
      dispatch(setMenuOpen(config.defaultPath));

    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
  
    <ListItemButton
 
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: "flex-start",
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}

      // selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      selected={location.pathname === item.url}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              customization.isOpen.findIndex((id) => id === item.id) > -1
                ? "h5"
                : "body1"
            }
            color="inherit"
          >
            { item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
    </>
  );
};

export default NavItem;
