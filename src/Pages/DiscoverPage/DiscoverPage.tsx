import { ProfileCard } from "../../Components";
import { useFetchUsers } from "../../Hooks";
import DiscoverPageStyles from './DiscoverPage.module.css';

export function DiscoverPage() {
    const { errorOccured, isLoading, fetchedUsers, fetchedProfiles } = useFetchUsers();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Something went wrong...</div>
    }

    if (fetchedUsers.length !== fetchedProfiles.length) {
        return <div>Mismatch between users and profiles</div>
    }

    const indexes = [...Array(fetchedUsers.length).keys()];

    return (
        <div className={ DiscoverPageStyles.profiles }>
            {indexes.map((index) => {
                return (
                    <ProfileCard
                        key={ fetchedUsers[index].user_id } 
                        user={ fetchedUsers[index] }
                        profile={ fetchedProfiles[index] }/>
                )
            })}
        </div>
    )
}