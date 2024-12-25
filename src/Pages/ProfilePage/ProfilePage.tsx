import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '../../Types';
import { MyID } from '../../Definitions';
import { ConnectButton, EmailButton, IconButton } from '../../Components';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const id = useParams().id;
    const [errorOccured, setErrorOccured] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [fetchedUser, setFetchedUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        async function fetchUser() {
            setIsLoading(true);

            try {
                const response = await fetch("https://disc-assignment-5-users-api.onrender.com/api/users/" + id);

                if (response.ok) {
                    const parsedResponse = (await response.json()) as User;
                    setFetchedUser(parsedResponse);
                    setIsUser(parsedResponse.id === MyID)
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
    }, [id])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Unable to fetch user...</div>
    }

    if (!fetchedUser) {
        return <div>Tried to display an undefined user!</div>;
    }

    // TODO: make api call to get respective backgroundURL
    const backgroundURL = "https://i.imgur.com/Ddu7o5o.jpeg";

    return (
        <div className={ ProfilePageStyles.profile }>
            <div className={ ProfilePageStyles.background }>
                <img src={ backgroundURL } alt="background image"/>
            </div>
            <div className={ ProfilePageStyles.profilePicture }>
                <img src={ fetchedUser.profilepicture } alt="profile picture"/>
            </div>
            { isUser && <IconButton children="Edit"/> }
            <div className={ ProfilePageStyles.userInfo}>
                <div className={ ProfilePageStyles.basicInfo }>
                    <div>
                        <h3>Name</h3>
                        <p>{ fetchedUser.firstname + " " + fetchedUser.lastname }</p>
                    </div>
                    <div>
                        <h3>Major</h3>
                        <p>{ fetchedUser.major }</p>
                    </div>
                    <div>
                        <h3>Graduation Year</h3>
                        <p>{ fetchedUser.graduationyear }</p>
                    </div>
                </div>
                { !isUser && <div className={ ProfilePageStyles.buttonContainer}>
                                <ConnectButton user={ fetchedUser }/>
                                <EmailButton email={ fetchedUser.email }/>
                            </div> }
                <InfoContainer title="Bio" info={ fetchedUser.bio }/>
                <div className={ ProfilePageStyles.dateJoined }>
                    <div>
                        <h3>Date Joined</h3>
                        <p>{ GetDate(fetchedUser.created_at) }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface InfoContainerProps {
    title : string;
    info : string | undefined;
}

function InfoContainer({ title, info } : InfoContainerProps) {
    return (
        <div className={ ProfilePageStyles.infoContainer }>
            <h3>{ title }</h3>
            <p>{ info }</p>
        </div>
    )
}

function GetDate(datetime : string) {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const date = new Date(datetime);

    return `${ monthNames[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }`;
}