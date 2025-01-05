import { useEffect, useState } from 'react'
import { User } from '../Types';
import { MyID } from '../Definitions';

export function useFetchUser(id : string | undefined) {
    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);

            try {
                const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users/" + id);

                if (response.ok) {
                    const parsedResponse = (await response.json()) as User;
                    setFetchedUser(parsedResponse);
                    setIsUser(parsedResponse.id === MyID)
                    // TODO: Use local storage to hold individual user's id
                }
                else {
                    setErrorOccured(true);
                }
            } catch {
                setErrorOccured(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [id])

    return { errorOccured, isLoading, isUser, fetchedUser }
}
