import { useContext } from 'react'
import { UserConnectionsContext } from '../App';

export function useConnections() {
    const currentUserConnectionsContext = useContext(UserConnectionsContext);
        
    if (!currentUserConnectionsContext) throw new Error("UserConnectionsContext is undefined!");
        
    const connections = currentUserConnectionsContext.connections;
    const setConnections = currentUserConnectionsContext.setConnections;

    return { connections, setConnections }
}
