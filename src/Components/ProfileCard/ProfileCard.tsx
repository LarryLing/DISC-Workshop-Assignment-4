import { User } from '../../Types';
import { Link } from 'react-router-dom';
import { ConnectButton } from '../';
import ProfileCardStyles from './ProfileCard.module.css';

interface Props {
    user : User;
    backgroundURL : string;
}

export function ProfileCard({ user, backgroundURL } : Props) {
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
            <div className={ ProfileCardStyles.buttonContainer }>
                <ConnectButton user={ user }/>
            </div>
        </div>
    )
}