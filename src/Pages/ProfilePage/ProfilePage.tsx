import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../../Types';
import DetailedProfile from '../../Components/DetailedProfile/DetailedProfile';

export function ProfilePage() {
    const params = useParams();
    const id = params.id;

    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);

            try {
                const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users/" + id);

                if (response.ok) {
                    const parsedResponse = (await response.json()) as User;
                    setFetchedUser(parsedResponse);
                }
                else {
                    setFetchedUser(undefined);
                    setErrorOccured(true);
                }
            } catch {
                setErrorOccured(true);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchUser();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Unable to fetch user...</div>
    }

    // TODO: make api call to get respective backgroundURL
    const backgroundURL = "https://i.imgur.com/Ddu7o5o.jpeg";

    return (
        // <div className={ ProfilePageStyles.profile }>
        //     <div className={ ProfilePageStyles.background }>
        //         <img src={ backgroundURL } alt="background image"/>
        //     </div>
        //     <div className={ ProfilePageStyles.profilePicture }>
        //         <img src={ user?.profilePicture } alt="profile picture"/>
        //     </div>
        //     <div className={ ProfilePageStyles.userInfo}>
        //         <div className={ ProfilePageStyles.basicInfo }>
        //             <div>
        //                 <h3>Name</h3>
        //                 <p>{ user?.firstName + " " + user?.lastName }</p>
        //             </div>
        //             <div>
        //                 <h3>Major</h3>
        //                 <p>{ user?.major }</p>
        //             </div>
        //             <div>
        //                 <h3>Graduation Year</h3>
        //                 <p>{ user?.graduationYear }</p>
        //             </div>
        //         </div>
        //         <InfoContainer title="Bio" info={ user?.bio }/>
        //     </div>
        // </div>
        <DetailedProfile user={ fetchedUser } backgroundURL={ backgroundURL }/>
    )
}