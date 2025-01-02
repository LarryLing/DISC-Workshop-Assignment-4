import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { MyID } from '../../Definitions';
import NavbarStyles from './Navbar.module.css';

export function Navbar() {
    return (
        <nav className={ NavbarStyles.navbar }>
            <div className={ NavbarStyles.titleSearch }>
                <h2 className={ NavbarStyles.title }>
                    CatsConnect
                </h2>
                <input id="search-bar" type="search" className={ NavbarStyles.searchBar } placeholder="Search"/>
            </div>
            <ul className={ NavbarStyles.linkContainer }>
                <NavbarLink to='/' children="Home"/>
                <NavbarLink to='/discover' children="Discover"/>
                <NavbarLink to={`/user/${ MyID }`} children="My Profile"/>
            </ul>
        </nav>
    )
}

interface NavbarLinkProps {
    to : string;
    children : string;
}

function NavbarLink({to, children} : NavbarLinkProps) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({
        path : resolvedPath.pathname, 
        end : true
    });

    return (
        <Link to={ to }>
            <li className={ NavbarStyles.link } style={{ background : isActive ? "var(--dark-purple)" : ""}}>
                { children }
            </li>
        </Link>
    )
}