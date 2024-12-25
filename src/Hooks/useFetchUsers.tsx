import { useEffect, useState } from 'react'
import { User } from '../Types';

export function useFetchUsers() {
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
        
    return { errorOccured, isLoading, fetchedUsers }
}
