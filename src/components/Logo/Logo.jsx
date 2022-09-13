import './Logo.css';

import useMediaQuery from '../../hooks/useMediaQuery';

const Logo = () => {
  const isWidthMax1300 = useMediaQuery('(max-width: 1300px)');
  const logoText = isWidthMax1300 ? 'W' : 'wf wallet';

  return <div className='Logo'>{logoText}</div>;
};

export default Logo;
