import { ConnectButton, IconButton } from '../../Components';
import { User, UserProfile } from '../../Types';
import ProfilePageStyles from './DetailedProfile.module.css';

interface Props {
    user : User;
    profile : UserProfile;
    isUser : boolean;
    isModalOpen : boolean;
    setIsModalOpen : (arg0 : boolean) => void;
}

export function DetailedProfile({ user, profile, isUser, isModalOpen, setIsModalOpen } : Props) {
    const { first_name, last_name, hometown } = user;
    const { profile_url, background_url, major, class_of, bio, date_of_birth, pronouns, created_at, connections } = profile;

    return (
        <div className={ ProfilePageStyles.detailedProfile }>
            <div className={ ProfilePageStyles.background }>
                <img src={ background_url } alt="background image"/>
            </div>
            <div className={ ProfilePageStyles.profilePicture }>
                <img src={ profile_url } alt="profile picture"/>
            </div>
            { isUser && <IconButton children="Edit"/> }
            <div className={ ProfilePageStyles.userInfo}>
                <div className={ ProfilePageStyles.simpleInfoContainer }>
                    <div className={ ProfilePageStyles.basicInfoContainer }>
                        <BasicInfoItem title="Name" info={ first_name + " " + last_name }/>
                        <BasicInfoItem title="Major" info={ major }/>
                        <BasicInfoItem title="Class of" info={ class_of }/>
                    </div>
                    <div className={ ProfilePageStyles.hometown }>{ hometown }</div>
                </div>
                <div className={ ProfilePageStyles.buttonContainer}>
                    { !isUser && <ConnectButton user={ user }/>}
                    <button onClick={ () => setIsModalOpen(!isModalOpen) }>Contact Info</button>
                </div>
                <div className={ ProfilePageStyles.detailedInfoContainer}>
                    <DetailedInfoItem title="Bio" info={ bio }/>
                    <DetailedInfoItem title="Pronouns" info={ pronouns }/>
                    <DetailedInfoItem title="Date of Birth" info={ GetDate(date_of_birth) }/>
                </div>
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

interface BasicInfoItemProps {
    title : string;
    info : string | number;
}

function BasicInfoItem({ title, info } : BasicInfoItemProps) {
    return (
        <div>
            <h3>{ title }</h3>
            <p>{ info }</p>
        </div>
    )
}

interface DetailedInfoItemProps {
    title : string;
    info : string | undefined;
}

function DetailedInfoItem({ title, info } : DetailedInfoItemProps) {
    return (
        <div className={ ProfilePageStyles.detailedInfoItem }>
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