import { InfoContainer } from '../../Components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../../Types';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const params = useParams();
    const id = params.id;

    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        fetch("https://disc-assignment-5-users-api.onrender.com/api/users/" + id)
            .then(promise => {
                return promise.json();
            })
            .then(user => {
                setUser(user);
            })
            .catch(() => {
                throw new Error("Failed to get user from API");
            })
    }, [])

    // TODO: make api call to get respective backgroundURL
    const backgroundURL = "https://i.imgur.com/Ddu7o5o.jpeg";

    return (
        <div className={ ProfilePageStyles.profile }>
            <div className={ ProfilePageStyles.background }>
                <img src={ backgroundURL } alt="background image"/>
            </div>
            <div className={ ProfilePageStyles.profilePicture }>
                <img src={ user?.profilePicture } alt="profile picture"/>
            </div>
            <div className={ ProfilePageStyles.userInfo}>
                <div className={ ProfilePageStyles.basicInfo }>
                    <div>
                        <h3>Name</h3>
                        <p>{ user?.firstName + " " + user?.lastName }</p>
                    </div>
                    <div>
                        <h3>Major</h3>
                        <p>{ user?.major }</p>
                    </div>
                    <div>
                        <h3>Graduation Year</h3>
                        <p>{ user?.graduationYear }</p>
                    </div>
                </div>
                <InfoContainer title="Bio" info={ user?.bio }/>
            </div>
        </div>
    )
}