// material-ui

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 *
 */

// ==============================|| LOGO SVG ||============================== //
import logo from '@/assets/images/avatar.png';
const Logo = () => {
    return (
          <img src={logo} alt="Funbunny" width={50} height={50} />

    );
};

export default Logo;
