import { Profile } from '../../Types';
import { InfoContainer } from '../../Components';
import ProfilePageStyles from './ProfilePage.module.css';

interface Props {
    profile : Profile;
}

export function ProfilePage({ profile } : Props) {
    return (
        <div className={ ProfilePageStyles.profile }>
            <div className={ ProfilePageStyles.background }>
                <img src={ profile.backgroundURL } alt="background image"/>
            </div>
            <div className={ ProfilePageStyles.profilePicture }>
                <img src={ profile.user.profilePicture } alt="profile picture"/>
            </div>
            <div className={ ProfilePageStyles.userInfo}>
                <div className={ ProfilePageStyles.basicInfo }>
                    <div>
                        <h3>Name</h3>
                        <p>{ profile.user.firstName + " " + profile.user.lastName }</p>
                    </div>
                    <div>
                        <h3>Major</h3>
                        <p>{ profile.user.major }</p>
                    </div>
                    <div>
                        <h3>Graduation Year</h3>
                        <p>{ profile.user.graduationYear }</p>
                    </div>
                </div>
                <InfoContainer title="Bio" info={ profile.user.bio }/>
            </div>
        </div>
    )
}