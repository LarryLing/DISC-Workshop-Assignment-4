import { useParams } from 'react-router-dom';
import { ConnectButton, EmailButton, IconButton } from '../../Components';
import { useFetchUser } from '../../Hooks';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const id = useParams().id;
    const { errorOccured, isLoading, isUser, fetchedUser, fetchedProfile } = useFetchUser(id);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Unable to fetch user...</div>
    }

    if (!fetchedUser) {
        return <div>Tried to display an undefined user!</div>;
    }

    if (!fetchedProfile) {
        return <div>Tried do display an undefined profile!</div>;
    }

    const { first_name, last_name, email, phone_number, hometown } = fetchedUser;
    const { profile_url, background_url, major, class_of, bio, date_of_birth, pronouns, created_at, connections } = fetchedProfile;

    return (
        <div className={ ProfilePageStyles.profile }>
            <div className={ ProfilePageStyles.background }>
                <img src={ background_url } alt="background image"/>
            </div>
            <div className={ ProfilePageStyles.profilePicture }>
                <img src={ profile_url } alt="profile picture"/>
            </div>
            { isUser && <IconButton children="Edit"/> }
            <div className={ ProfilePageStyles.userInfo}>
                <div className={ ProfilePageStyles.basicInfo }>
                    <div>
                        <h3>Name</h3>
                        <p>{ first_name + " " + last_name }</p>
                    </div>
                    <div>
                        <h3>Major</h3>
                        <p>{ major }</p>
                    </div>
                    <div>
                        <h3>Class Of</h3>
                        <p>{ class_of }</p>
                    </div>
                </div>
                { !isUser && <div className={ ProfilePageStyles.buttonContainer}>
                                <ConnectButton user={ fetchedUser }/>
                                <EmailButton email={ fetchedUser.email }/>
                            </div> }
                <InfoContainer title="Bio" info={ bio }/>
                <div className={ ProfilePageStyles.dateJoined }>
                    <div>
                        <h3>Date Joined</h3>
                        <p>{ GetDate(created_at) }</p>
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