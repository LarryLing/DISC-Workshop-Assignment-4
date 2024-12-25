import { ProfileCard } from "../../Components";
import { MyID } from "../../Definitions";
import { useFetchUsers } from "../../Hooks";
import DiscoverPageStyles from './DiscoverPage.module.css';

export function DiscoverPage() {
    const { errorOccured, isLoading, fetchedUsers } = useFetchUsers();

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
                        backgroundURL="https://i.imgur.com/Ddu7o5o.jpeg"/>
                )
            })}
        </div>
    )
}