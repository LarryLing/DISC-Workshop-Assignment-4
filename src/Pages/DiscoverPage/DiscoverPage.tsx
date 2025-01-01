import { useEffect } from "react";
import { ProfileCard } from "../../Components";
import { MyID } from "../../Definitions";
import { useFetchUser, useFetchUsers } from "../../Hooks";
import DiscoverPageStyles from './DiscoverPage.module.css';

export function DiscoverPage() {
    const fetchUsersHook = useFetchUsers();
    const fetchUserHook = useFetchUser(String(MyID));

    const { fetchedUsers, fetchedProfiles } = fetchUsersHook;
    const { fetchedProfile, setFetchedProfile } = fetchUserHook;

    useEffect(() => {
        async function putConnections() {
            try {
                const myConnectionsRequestOptions = {
                    method : "PUT",
                    headers : {
                        "Accept" : "application/json",
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify(fetchedProfile)
                }
    
                const myConnectionsRequest = fetch("http://localhost:3009/api/user_profiles/" + fetchedProfile?.user_id, myConnectionsRequestOptions);
    
                const response = await Promise.all([myConnectionsRequest]);
    
                const myConnectionsResponse = response[0];
    
                if (!myConnectionsResponse.ok) {
                    console.log("Unable to update my connections");
                } 
            }
            catch (error) {
                console.log("Something went wrong...");
            }
        }

        if (!fetchedProfile) {
            return
        }

        putConnections();
    }, [fetchedProfile])

    if (fetchUsersHook.isLoading || fetchUserHook.isLoading) {
        return <div>Loading...</div>
    }

    if (fetchUsersHook.errorOccured || fetchUserHook.errorOccured) {
        return <div>Something went wrong...</div>
    }

    if (!fetchedProfile) {
        return <div>Could not fetch my profile...</div>
    }

    if (fetchUsersHook.fetchedUsers.length !== fetchUsersHook.fetchedProfiles.length) {
        return <div>Mismatch between users and profiles...</div>
    }

    const indexes = [...Array(fetchedUsers.length).keys()];

    return (
        <div className={ DiscoverPageStyles.profiles }>
            {indexes.map((index) => {
                return (
                    <ProfileCard
                        key={ fetchedUsers[index].user_id } 
                        user={ fetchedUsers[index] }
                        profile={ fetchedProfiles[index] }
                        myProfile={ fetchedProfile }
                        setMyProfile={ setFetchedProfile }/>
                )
            })}
        </div>
    )
}