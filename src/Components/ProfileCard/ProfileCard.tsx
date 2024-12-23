import { User } from '../../Types';
import { Link } from 'react-router-dom';
import ProfileCardStyles from './ProfileCard.module.css';
import { ConnectButton } from '../ConnectButton/ConnectButton';

interface Props {
    user : User;
    backgroundURL : string;
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}

export function ProfileCard({ user, backgroundURL, connections, setConnections } : Props) {
    return (
        <div className={ ProfileCardStyles.profileCard }>
            <Link to={`/user/${ user.id }`} className={ ProfileCardStyles.clickableContainer }>
                <div className={ ProfileCardStyles.background }>
                    <img src={ backgroundURL } alt="background image"/>
                </div>
                <div className={ ProfileCardStyles.profilePicture }>
                    <img src={ user.profilepicture } alt="profile picture"/>
                </div>
                <div className={ ProfileCardStyles.text }>
                    <h3>{ `${ user.firstname } ${ user.lastname }` }</h3>
                    <p>{ user.major + " • " + user.graduationyear }</p>
                    <p>{ user.bio }</p>
                </div>
            </Link>
            <ConnectButton user={ user } connections={ connections } setConnections={ setConnections }/>
        </div>
    )
}