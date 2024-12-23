import { useEffect, useState } from 'react';
import { User } from '../../Types';
import ConnectButtonStyles from './ConnectButton.module.css';

interface Props {
    user : User;
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export function ConnectButton({ user, connections, setConnections } : Props) {
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
            console.log("Added " + user.firstname + " " + user.lastname + " to your list of connections!");
        }
        else {
            console.log("Removed " + user.firstname + " " + user.lastname + " from your list of connections!");
        }
    }, [isConnected]);

    return (
        <div className={ ConnectButtonStyles.buttonContainer }>
            <button
                className={ConnectButtonStyles.connectButton} 
                style={{ background: isConnected ? 'var(--purple)' : '', color: isConnected ? 'white' : '' }} 
                onClick={ handleClick }>
                    { isConnected ? "Connected" : "Connect" }
            </button>
        </div>
    )
}
