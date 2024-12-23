import { useEffect, useState } from "react";
import { ProfileCard } from "../../Components";
import { User } from "../../Types";
import DiscoverPageStyles from './DiscoverPage.module.css';
import { MyID } from "../../Definitions";

interface Props {
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export function DiscoverPage({ connections, setConnections } : Props) {
    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            setIsLoading(true);

            try {
                const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users");

                if (response.ok) {
                    const parsedResponse = (await response.json()) as User[];
                    setFetchedUsers(parsedResponse);
                }
                else {
                    setFetchedUsers([]);
                    setErrorOccured(true);
                }
            } catch {
                setErrorOccured(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUsers();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorOccured) {
        return <div>Something went wrong...</div>;
    }

    return (
        <div className={ DiscoverPageStyles.profiles }>
            {fetchedUsers.filter(fetchedUser => fetchedUser.id !== MyID).map((fetchedUser) => {
                return (
                    <ProfileCard
                        key={ fetchedUser.id } 
                        user={ fetchedUser }
                        backgroundURL="https://i.imgur.com/Ddu7o5o.jpeg"
                        connections={ connections }
                        setConnections={ setConnections }/>
                )
            })}
        </div>
    )
}