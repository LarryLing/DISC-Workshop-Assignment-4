import { useEffect, useState } from "react";
import { ProfileCard } from "../../Components";
import { User } from "../../Types";
import DiscoverPageStyles from './DiscoverPage.module.css';

interface Props {
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export function DiscoverPage({ connections, setConnections } : Props) {
    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("https://disc-assignment-5-users-api.onrender.com/api/users")
            .then(promise => {
                return promise.json();
            })
            .then(users => {
                setFetchedUsers(users);
            })
    }, [])

    return (
        <div className={ DiscoverPageStyles.profiles }>
            {fetchedUsers.map((fetchedUser) => (
                <ProfileCard
                    key={ fetchedUser.id } 
                    user={ fetchedUser }
                    backgroundURL="https://i.imgur.com/Ddu7o5o.jpeg"
                    connections={ connections }
                    setConnections={ setConnections }/>
            ))}
        </div>
    )
}