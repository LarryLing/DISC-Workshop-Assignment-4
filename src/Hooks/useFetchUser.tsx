import { useEffect, useState } from 'react'
import { User, UserProfile } from '../Types';
import { MyID } from '../Definitions';

export function useFetchUser(user_id : string | undefined) {
    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);
    const [fetchedProfile, setFetchedProfile] = useState<UserProfile | undefined>(undefined);

    useEffect(() => {
        async function fetchUserAndProfile() {
            setIsLoading(true);

            try {
                const userPromise = fetch("http://localhost:3009/api/users/" + user_id);
                const profilePromise = fetch("http://localhost:3009/api/user_profiles/" + user_id);

                const responses = await Promise.all([userPromise, profilePromise]);

                const userResponse = responses[0];
                const profileResponse = responses[1];

                if (userResponse.ok) {
                    const user = (await userResponse.json()) as User;
                    setFetchedUser(user);
                    setIsUser(user.user_id === MyID)
                    // TODO: Use local storage to hold individual user's id
                }
                else {
                    setErrorOccured(true);
                }

                if (profileResponse.ok) {
                    const profile = (await profileResponse.json()) as UserProfile;
                    setFetchedProfile(profile);
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

        fetchUserAndProfile();
    }, [user_id])

    return { errorOccured, isLoading, isUser, fetchedUser, fetchedProfile }
}
