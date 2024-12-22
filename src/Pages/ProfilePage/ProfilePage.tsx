import { Profile } from '../../Types';
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
            <div className={ ProfilePageStyles.profileInfoContainer}>
                <div className={ ProfilePageStyles.basicInfo }>
                    <div>
                        <h4>Name</h4>
                        <p>{ profile.user.firstName + " " + profile.user.lastName }</p>
                    </div>
                    <div>
                        <h4>Major</h4>
                        <p>{ profile.user.major }</p>
                    </div>
                    <div>
                        <h4>Graduation Year</h4>
                        <p>{ profile.user.graduationYear }</p>
                    </div>
                </div>
                <div>
                    Hello World
                </div>
            </div>
        </div>
    )
}