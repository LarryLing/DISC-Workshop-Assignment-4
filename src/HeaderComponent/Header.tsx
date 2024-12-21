import './Header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="title-search">
                <h2 className="title">
                    CatsConnect
                </h2>
                <input type="text" className="search-bar" placeholder="Search"></input>
            </div>
            <div className="buttons">
                <button className="header-button">
                    Home
                </button>
                <button className="header-button">
                    Discover
                </button>
                <button className="header-button">
                    Messages
                </button>
                <button className="header-button">
                    Profile
                </button>
            </div>
        </div>
    )
}
