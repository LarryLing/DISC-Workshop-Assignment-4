import { useContext, useEffect, useState } from 'react';
import { User } from '../../Types';
import { UserConnectionsContext } from '../../App';
import ConnectButtonStyles from './ConnectButton.module.css';

interface Props {
    user : User;
    // connections : User[];
    // setConnections : (arg0 : User[]) => void;
}

export function ConnectButton({ user } : Props) {
    const currentUserConnectionsContext = useContext(UserConnectionsContext);

    if (!currentUserConnectionsContext) throw new Error("UserConnectionsContext is undefined!");

    const connections = currentUserConnectionsContext.connections;
    const setConnections = currentUserConnectionsContext.setConnections;

    const [isConnected, setIsConnected] = useState(false);

    function handleClick() {
        if (!isConnected) {
            const updatedConnections = [...connections, user];

            setConnections(updatedConnections);
        }
        else {
            const updatedProfiles = connections.filter(filteredUser => filteredUser.id !== user.id);

            setConnections(updatedProfiles);
        }

        setIsConnected(!isConnected);
    }

    useEffect(() => {
        if (connections.some(connection => connection.id === user.id)) {
            setIsConnected(true);
        }
    }, [])

    return (
        <button
            className={ ConnectButtonStyles.connectButton } 
            style={{ background: isConnected ? 'var(--purple)' : '', color: isConnected ? 'white' : '' }} 
            onClick={ handleClick }>
                { isConnected ? "Connected" : "Connect" }
        </button>
    )
}
