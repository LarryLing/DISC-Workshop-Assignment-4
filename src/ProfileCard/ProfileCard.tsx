import { useState } from 'react';
import { Profile } from '../Types'
import ProfileCardStyles from './ProfileCard.module.css'

interface Props {
    profile : Profile;
    profilesAdded : Profile[];
    setProfilesAdded : (arg0 : Profile[]) => void;
}

export default function ProfileCard(props : Props) {
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
        <div className={ProfileCardStyles.profileCard}>
            <div className={ProfileCardStyles.background}>
                <img src={ props.profile.backgroundURL } alt="background image"/>
                <div className={ProfileCardStyles.profilePicture}>
                    <img src={ props.profile.pictureURL } alt="profile picture"/>
                </div>
            </div>
            <div className={ProfileCardStyles.textInfo}>
                <h3>
                    { props.profile.name }
                </h3>
                <p className={ProfileCardStyles.intro}>
                    { props.profile.intro }
                </p>
                <button
                    className={ProfileCardStyles.connectButton} 
                    style={{background: isConnected ? 'var(--purple)' : '', color: isConnected ? 'white' : ''}} 
                    onClick={ handleClick }>
                        {isConnected ? "Connected" : "Connect"}
                </button>
            </div>
        </div>
    )
}