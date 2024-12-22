import { useEffect, useState } from 'react';
import { User } from '../../Types';
import { Link } from 'react-router-dom';
import ProfileCardStyles from './ProfileCard.module.css';

interface Props {
    user : User;
    backgroundURL : string;
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export function ProfileCard({ user, backgroundURL, connections, setConnections } : Props) {
    const [isConnected, setIsConnected] = useState(false);

    function handleClick() {
        if (!isConnected) {
            const updatedConnections = [...connections, user];

            setConnections(updatedConnections);
        }
        else {
            const updatedProfiles = connections.filter((filteredUser) => filteredUser !== user);

            setConnections(updatedProfiles);
        }

        setIsConnected(!isConnected);
    }

    useEffect(() => {
        if (isConnected) {
            console.log("Added " + user.firstName + " " + user.lastName + " to your list of connections!");
        }
        else {
            console.log("Removed " + user.firstName + " " + user.lastName + " from your list of connections!");
        }
    }, [isConnected]);
    
    return (
        <div className={ ProfileCardStyles.profileCard }>
            <Link to={`/user/${ user.id }`} className={ ProfileCardStyles.clickableContainer }>
                <div className={ ProfileCardStyles.background }>
                    <img src={ backgroundURL } alt="background image"/>
                </div>
                <div className={ ProfileCardStyles.profilePicture }>
                    <img src={ user.profilePicture } alt="profile picture"/>
                </div>
                <div className={ ProfileCardStyles.text }>
                    <h3>{ user.firstName + " " + user.lastName }</h3>
                    <p>{ user.major + " • " + user.graduationYear }</p>
                    <p>{ user.bio }</p>
                </div>
            </Link>
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