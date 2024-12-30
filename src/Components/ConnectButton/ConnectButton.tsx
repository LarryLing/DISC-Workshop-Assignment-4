import { useEffect, useState } from 'react';
import { User } from '../../Types';
import { useConnections } from '../../Hooks';
import ConnectButtonStyles from './ConnectButton.module.css';

interface Props {
    user : User;
}

export function ConnectButton({ user } : Props) {
    const { connections, setConnections } = useConnections();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (connections.some(connection => connection === user.user_id)) setIsConnected(true);
    }, [])

    function handleClick() {
        if (!isConnected) {
            const updatedConnections = [...connections, user.user_id];

            setConnections(updatedConnections);
        }
        else {
            const updatedProfiles = connections.filter(connection => connection !== user.user_id);

            setConnections(updatedProfiles);
        }

        setIsConnected(!isConnected);
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
