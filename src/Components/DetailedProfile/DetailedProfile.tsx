import { User } from '../../Types';
import { InfoContainer } from '../InfoContainer/InfoContainer';
import DetailedProfileStyles from './DetailedProfile.module.css';
import { ConnectButton } from '../ConnectButton/ConnectButton';

interface Props {
    user : User | undefined;
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export default function DetailedProfile({ user, connections, setConnections } : Props) {
    if (!user) {
        return <div>Tried to display an undefined user!</div>
    }

    // TODO: make api call to get respective backgroundURL
    const backgroundURL = "https://i.imgur.com/Ddu7o5o.jpeg";
    
    return (
        <div className={ DetailedProfileStyles.profile }>
            <div className={ DetailedProfileStyles.background }>
                <img src={ backgroundURL } alt="background image"/>
            </div>
            <div className={ DetailedProfileStyles.profilePicture }>
                <img src={ user.profilepicture } alt="profile picture"/>
            </div>
            <div className={ DetailedProfileStyles.userInfo}>
                <div className={ DetailedProfileStyles.basicInfo }>
                    <div>
                        <h3>Name</h3>
                        <p>{ user.firstname + " " + user.lastname }</p>
                    </div>
                    <div>
                        <h3>Major</h3>
                        <p>{ user.major }</p>
                    </div>
                    <div>
                        <h3>Graduation Year</h3>
                        <p>{ user.graduationyear }</p>
                    </div>
                </div>
                <ConnectButton user={ user } connections={ connections } setConnections={ setConnections }/>
                <InfoContainer title="Bio" info={ user?.bio }/>
            </div>
        </div>
    )
}
