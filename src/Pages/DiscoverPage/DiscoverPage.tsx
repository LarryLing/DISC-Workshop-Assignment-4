import { ProfileCard } from "../../Components";
import { useConnections, useFetchUsers } from "../../Hooks";
import DiscoverPageStyles from './DiscoverPage.module.css';

export function DiscoverPage() {
    const { connections } = useConnections();
    const { errorOccured, isLoading, fetchedUsers } = useFetchUsers();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Something went wrong...</div>
    }

    // TODO: probably the most expensive operation, in addition to being called on every rerender when a new connection is added (which updates the connections state). 
    // TODO: planning on fixing this in assignment 7 by storing the list of connections for each user in the database and 
    // TODO: making an API call to update the database instead of updating state. that way this filter operation is only performed on
    // TODO: the initial page render when fetching data.
    const unconnectedUsers = fetchedUsers.filter(user => !connections.includes(user.id));

    return (
        <div className={ DiscoverPageStyles.profiles }>
            {unconnectedUsers.map((user) => {
                return (
                    <ProfileCard
                        key={ user.id } 
                        user={ user }/>
                )
            })}
        </div>
    )
}