import { User, UserProfile } from '../../Types';
import { Link } from 'react-router-dom';
import { ConnectButton } from '../index';
import ProfileCardStyles from './ProfileCard.module.css';

interface Props {
    user : User;
    profile : UserProfile;
}

export function ProfileCard({ user, profile } : Props) {
    const { first_name, last_name } = user;
    const { profile_url, background_url, major, class_of, bio } = profile;

    return (
        <div className={ ProfileCardStyles.profileCard }>
            <Link to={`/user/${ user.user_id }`} className={ ProfileCardStyles.clickableContainer }>
                <div className={ ProfileCardStyles.background }>
                    <img src={ background_url } alt="background image"/>
                </div>
                <div className={ ProfileCardStyles.profilePicture }>
                    <img src={ profile_url } alt="profile picture"/>
                </div>
                <div className={ ProfileCardStyles.text }>
                    <h3>{ `${ first_name } ${ last_name }` }</h3>
                    <p>{ major + " • " + class_of }</p>
                    <p>{ bio }</p>
                </div>
            </Link>
            <div className={ ProfileCardStyles.buttonContainer }>
                <ConnectButton user={ user }/>
            </div>
        </div>
    )
}