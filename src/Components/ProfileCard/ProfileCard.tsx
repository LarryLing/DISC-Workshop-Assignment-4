import { useEffect, useState } from 'react';
import { Profile } from '../../Types';
import ProfileCardStyles from './ProfileCard.module.css';

interface Props {
    profile : Profile;
    connections : Profile[];
    setConnections : (arg0 : Profile[]) => void;
}

export function ProfileCard({ profile, connections, setConnections } : Props) {
    const [isConnected, setIsConnected] = useState(false);

    function handleClick() {
        if (!isConnected) {
            const updatedProfiles = [...connections, profile];

            setConnections(updatedProfiles);
        }
        else {
            const updatedProfiles = connections.filter((filteredProfile) => filteredProfile !== profile);

            setConnections(updatedProfiles);
        }

        setIsConnected(!isConnected);
    }

    useEffect(() => {
        if (isConnected) {
            console.log("Added " + profile.user.firstName + " " + profile.user.lastName + " to your list of connections!");
        }
        else {
            console.log("Removed " + profile.user.firstName + " " + profile.user.lastName + " from your list of connections!");
        }
    }, [isConnected]);
    
    return (
        <div className={ ProfileCardStyles.profileCard }>
            <a className={ ProfileCardStyles.clickableContainer } href={ profile.profileURL }>
                <div className={ ProfileCardStyles.background }>
                    <img src={ profile.backgroundURL } alt="background image"/>
                </div>
                <div className={ ProfileCardStyles.profilePicture }>
                    <img src={ profile.user.profilePicture } alt="profile picture"/>
                </div>
                <div className={ ProfileCardStyles.text }>
                    <h3>{ profile.user.firstName + " " + profile.user.lastName }</h3>
                    <p className={ ProfileCardStyles.bio }>{ profile.user.bio }</p>
                </div>
            </a>
            <div className={ ProfileCardStyles.buttonContainer }>
                <button
                    className={ProfileCardStyles.connectButton} 
                    style={{ background: isConnected ? 'var(--purple)' : '', color: isConnected ? 'white' : '' }} 
                    onClick={ handleClick }>
                        { isConnected ? "Connected" : "Connect" }
                </button>
            </div>
        </div>
    )
}