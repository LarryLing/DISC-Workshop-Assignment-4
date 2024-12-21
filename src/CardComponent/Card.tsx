import { Profile } from '../Types'
import './Card.css'

export default function Card({id, name, intro, pictureURL, backgroundURL} : Profile ) {
    return (
        <div key={id} className="profile-card">
            <div className="background">
                <img src={backgroundURL} alt="background image"/>
                <div className="profile-picture">
                    <img src={pictureURL} alt="profile picture"/>
                </div>
            </div>
            <div className="text-info">
                <h3>{name}</h3>
                <p className="intro">{intro}</p>
                <button className="connect-button">
                    Connect
                </button>
            </div>
        </div>
    )
}
