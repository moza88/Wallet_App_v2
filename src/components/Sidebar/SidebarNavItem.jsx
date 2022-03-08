import './SidebarNavItem.css';
import { Link } from 'react-router-dom';
import usePathName from '../../hooks/usePathName';
import classNames from 'classnames';
import { Tooltip } from '..';
import useMediaQuery from '../../hooks/useMediaQuery';

const SidebarNavItem = ({ to, icon, text, closeMenuMobile }) => {
	let isWidthMax1300 = useMediaQuery('(max-width: 1300px)');
	const { page } = usePathName();
	const inMobileMenu = Boolean(closeMenuMobile);

	const sidebarNavItemClasses = classNames({
		SidebarNavItem: true,
		hasTooltip: !inMobileMenu && isWidthMax1300,
		'sidebarNavItem-active': page === text,
	});

	return (
		<Link to={to} className={sidebarNavItemClasses} onClick={closeMenuMobile}>
			<div className="sidebarNavItem__circle">
				<div className="sidebarNavItem__icon">{icon}</div>
			</div>
			<div className="sidebarNavItem__text">{text}</div>
			{!inMobileMenu && isWidthMax1300 && <Tooltip>{text}</Tooltip>}
		</Link>
	);
};

export default SidebarNavItem;
