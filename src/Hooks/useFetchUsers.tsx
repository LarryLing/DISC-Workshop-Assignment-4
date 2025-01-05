import { useEffect, useState } from 'react'
import { User, UserProfile } from '../Types';
import { MyID } from '../Definitions';

export function useFetchUsers() {
    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
    const [fetchedProfiles, setFetchedProfiles] = useState<UserProfile[]>([]);

    useEffect(() => {
        async function fetchUsersAndProfiles() {
            setIsLoading(true);

            try {
                const usersPromise = fetch("http://localhost:3009/api/users");
                const profilesPromise = fetch("http://localhost:3009/api/user_profiles");

                const responses = await Promise.all([usersPromise, profilesPromise]);

                const usersResponse = responses[0];
                const profilesResponse = responses[1]; 

                if (usersResponse.ok) {
                    const users = (await usersResponse.json()) as User[];
                    setFetchedUsers(users.filter(user => user.user_id !== MyID));
                }
                else {
                    setErrorOccured(true);
                }

                if (profilesResponse.ok) {
                    const profiles = (await profilesResponse.json()) as UserProfile[];
                    setFetchedProfiles(profiles.filter(profile => profile.user_id !== MyID));
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

        fetchUsersAndProfiles();
    }, [])
        
    return { errorOccured, isLoading, fetchedUsers, fetchedProfiles }
}
