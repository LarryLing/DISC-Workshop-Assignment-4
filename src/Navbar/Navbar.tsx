import NavbarStyles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={ NavbarStyles.navbar }>
            <div className={ NavbarStyles.titleSearch }>
                <h2 className={ NavbarStyles.title }>
                    CatsConnect
                </h2>
                <input type="text" className={ NavbarStyles.searchBar } placeholder="Search"/>
            </div>
            <div className={ NavbarStyles.buttonContainer }>
                <button className={ NavbarStyles.headerButton }>
                    Home
                </button>
                <button className={ NavbarStyles.headerButton }>
                    Discover
                </button>
                <button className={ NavbarStyles.headerButton }>
                    Messages
                </button>
                <button className={ NavbarStyles.headerButton }>
                    My Profile
                </button>
            </div>
        </nav>
    )
}