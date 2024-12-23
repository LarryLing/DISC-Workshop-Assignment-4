import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../../Types';
import DetailedProfile from '../../Components/DetailedProfile/DetailedProfile';
import { MyID } from '../../Definitions';

interface Props {
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export function ProfilePage({ connections, setConnections } : Props) {
    const id = useParams().id;

    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);

            try {
                const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users/" + id);

                if (response.ok) {
                    const parsedResponse = (await response.json()) as User;
                    setFetchedUser(parsedResponse);
                }
                else {
                    setFetchedUser(undefined);
                    setErrorOccured(true);
                }
            } catch {
                setErrorOccured(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Unable to fetch user...</div>
    }

    return (
        <DetailedProfile user={ fetchedUser } isUser={ Number(id) === MyID } connections={ connections } setConnections={ setConnections }/>
    )
}