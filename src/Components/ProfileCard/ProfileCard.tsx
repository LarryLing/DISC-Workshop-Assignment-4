import { User, UserProfile } from '../../Types';
import { Link } from 'react-router-dom';
import { ConnectButton } from '../index';
import ProfileCardStyles from './ProfileCard.module.css';
import { memo } from 'react';

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

function arePropsEqual(prevProps : Props, nextProps : Props) {
    return (
        prevProps.user.first_name === nextProps.user.first_name &&
        prevProps.user.last_name === nextProps.user.last_name &&
        prevProps.profile.profile_url === nextProps.profile.profile_url &&
        prevProps.profile.background_url === nextProps.profile.background_url &&
        prevProps.profile.major === nextProps.profile.major &&
        prevProps.profile.class_of === nextProps.profile.class_of &&
        prevProps.profile.bio === nextProps.profile.bio
    )
}

export const MemoProfileCard = memo(ProfileCard, arePropsEqual); 

