import { useEffect, useState } from 'react';
import { User, UserProfile } from '../../Types';
import { useFetchUser } from '../../Hooks';
import { MyID } from '../../Definitions';
import { PutUserProfile } from '../../Utilities';
import ConnectButtonStyles from './ConnectButton.module.css';

interface Props {
    user : User;
}

export function ConnectButton({ user } : Props) {
    const { user_id } = user;
    
    const { fetchedProfile, setFetchedProfile } = useFetchUser(String(MyID));
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!fetchedProfile) {
            return
        }

        PutUserProfile(fetchedProfile);

        setIsConnected(() => fetchedProfile.connections.includes(user_id));
    }, [fetchedProfile])

    async function handleClick() {
        try {
            const profilePromise = fetch("http://localhost:3009/api/user_profiles/" + MyID);

            const responses = await Promise.all([profilePromise]);

            const profileResponse = responses[0];

            if (!profileResponse.ok) {
                console.log("Request failed...");
                return;
            }

            const profile = (await profileResponse.json()) as UserProfile;

            if (!isConnected) {
                setFetchedProfile({
                    ...profile,
                    connections : [...profile.connections, user_id]
                })
            }
            else {
                setFetchedProfile({
                    ...profile,
                    connections : profile.connections.filter((connection: number) => connection !== user_id)
                })
            }
        }
        catch {
            console.log("Something went wrong...");
        }     
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