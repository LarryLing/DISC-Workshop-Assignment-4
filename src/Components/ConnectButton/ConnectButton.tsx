import { useState } from 'react';
import { User, UserProfile } from '../../Types';
import ConnectButtonStyles from './ConnectButton.module.css';

interface Props {
    user : User;
    myProfile : UserProfile;
    setMyProfile : React.Dispatch<React.SetStateAction<UserProfile | undefined>>
}

export function ConnectButton({ user, myProfile, setMyProfile } : Props) {
    const { user_id } = user;

    const [isConnected, setIsConnected] = useState(() => myProfile.connections.includes(user_id));

    function handleClick() {
        if (!isConnected) {
            setMyProfile({
                ...myProfile,
                connections : [...myProfile.connections, user_id]
            })
        }
        else {
            setMyProfile({
                ...myProfile,
                connections : myProfile.connections.filter((connection: number) => connection !== user_id)
            })
        }

        setIsConnected(prev => !prev);
    }

    return (
        <button
            className={ ConnectButtonStyles.connectButton } 
            style={{ background: isConnected ? 'var(--purple)' : '', color: isConnected ? 'white' : '' }} 
            onClick={ handleClick }>
                { isConnected ? "Connected" : "Connect" }
        </button>
    )
}
