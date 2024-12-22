import { User } from '../../Types';
import { InfoContainer } from '../InfoContainer/InfoContainer';
import DetailedProfileStyles from './DetailedProfile.module.css';

interface Props {
    user : User | undefined;
    backgroundURL : string;
}

export default function DetailedProfile({ user, backgroundURL } : Props) {
    return (
        <div className={ DetailedProfileStyles.profile }>
            <div className={ DetailedProfileStyles.background }>
                <img src={ backgroundURL } alt="background image"/>
            </div>
            <div className={ DetailedProfileStyles.profilePicture }>
                <img src={ user?.profilePicture } alt="profile picture"/>
            </div>
            <div className={ DetailedProfileStyles.userInfo}>
                <div className={ DetailedProfileStyles.basicInfo }>
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
