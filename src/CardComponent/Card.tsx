import { useState } from 'react';
import { Profile } from '../Types'
import './Card.css'

interface Props {
    profile : Profile;
    profilesAdded : Profile[];
    setProfilesAdded : (arg0 : Profile[]) => void;
}

export default function Card(props : Props) {
    const [isConnected, setIsConnected] = useState(false);

    function handleClick() {
        if (!isConnected) {
            const updatedProfiles = [...props.profilesAdded, props.profile];

            props.setProfilesAdded(updatedProfiles);
        }
        else {
            const updatedProfiles = props.profilesAdded.filter((profile) => profile !== props.profile);

            props.setProfilesAdded(updatedProfiles);
        }

        setIsConnected(!isConnected);
    }
    
    return (
        <div className="profile-card">
            <div className="background">
                <img src={ props.profile.backgroundURL } alt="background image"/>
                <div className="profile-picture">
                    <img src={ props.profile.pictureURL } alt="profile picture"/>
                </div>
            </div>
            <div className="text-info">
                <h3>{ props.profile.name }</h3>
                <p className="intro">{ props.profile.intro }</p>
                <button className="connect-button" onClick={ handleClick }>
                    {isConnected ? "Connected" : "Connect"}
                </button>
            </div>
        </div>
    )
}