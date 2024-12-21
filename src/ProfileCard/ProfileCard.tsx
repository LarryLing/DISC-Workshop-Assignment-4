import { useEffect, useState } from 'react';
import { Profile } from '../Types'
import ProfileCardStyles from './ProfileCard.module.css'

interface Props {
    profile : Profile;
    connections : Profile[];
    setConnections : (arg0 : Profile[]) => void;
}

export default function ProfileCard(props : Props) {
    const [isConnected, setIsConnected] = useState(false);

    function handleClick() {
        if (!isConnected) {
            const updatedProfiles = [...props.connections, props.profile];

            props.setConnections(updatedProfiles);
        }
        else {
            const updatedProfiles = props.connections.filter((profile) => profile !== props.profile);

            props.setConnections(updatedProfiles);
        }

        setIsConnected(!isConnected);
    }

    useEffect(() => {
        if (isConnected) {
            console.log("Added " + props.profile.name + " to your list of connections!");
        }
        else {
            console.log("Removed " + props.profile.name + " from your list of connections");
        }
    }, [isConnected]);
    
    return (
        <div className={ ProfileCardStyles.profileCard }>
            <a className={ ProfileCardStyles.clickableContainer } href={ props.profile.profileURL }>
                <div className={ ProfileCardStyles.background }>
                    <img src={ props.profile.backgroundURL } alt="background image"/>
                </div>
                <div className={ ProfileCardStyles.profilePicture }>
                    <img src={ props.profile.pictureURL } alt="profile picture"/>
                </div>
                <div className={ ProfileCardStyles.text }>
                    <h3>{ props.profile.name }</h3>
                    <p className={ ProfileCardStyles.intro }>{ props.profile.intro }</p>
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