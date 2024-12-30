import { User } from '../../Types';
import { Link } from 'react-router-dom';
import { ConnectButton } from '../';
import ProfileCardStyles from './ProfileCard.module.css';

interface Props {
    user : User;
}

export function ProfileCard({ user } : Props) {
    // TODO: replace these explicit definitions of attributes with API call
    const backgroundURL = "https://i.imgur.com/Ddu7o5o.jpeg";
    const profileURL = "https://i.imgur.com/O9Wmyek.jpeg";
    const graduation_year = 2027;
    const major = "Computer Science";
    const bio = "Hello World";

    return (
        <div className={ ProfileCardStyles.profileCard }>
            <Link to={`/user/${ user.id }`} className={ ProfileCardStyles.clickableContainer }>
                <div className={ ProfileCardStyles.background }>
                    <img src={ backgroundURL } alt="background image"/>
                </div>
                <div className={ ProfileCardStyles.profilePicture }>
                    <img src={ profileURL } alt="profile picture"/>
                </div>
                <div className={ ProfileCardStyles.text }>
                    <h3>{ `${ user.first_name } ${ user.last_name }` }</h3>
                    <p>{ major + " • " + graduation_year }</p>
                    <p>{ bio }</p>
                </div>
            </Link>
            <div className={ ProfileCardStyles.buttonContainer }>
                <ConnectButton user={ user }/>
            </div>
        </div>
    )
}