import { useParams } from 'react-router-dom';
import { ConnectButton, EmailButton, IconButton } from '../../Components';
import { useFetchUser } from '../../Hooks';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const id = useParams().id;
    const { errorOccured, isLoading, isUser, fetchedUser } = useFetchUser(id);

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