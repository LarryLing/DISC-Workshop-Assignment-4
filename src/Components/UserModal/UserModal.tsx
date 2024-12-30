import { User } from '../../Types';
import UserModalStyles from './UserModal.module.css';

interface Props {
    user : User;
}

export function UserModal({ user } : Props) {
    const { phone_number, email } = user;

    return (
        <div className={ UserModalStyles.userModal }>
            <h3>Contact Info</h3>
            <ContactInfoItem title="Phone" contact={ phone_number }/>
            <ContactInfoItem title="Email" contact={ email }/>
        </div>
    )
}

interface ContactInfoItemProps {
    title : string;
    contact : string | undefined;
}

function ContactInfoItem({ title, contact } : ContactInfoItemProps) {
    return (
        <div className={ UserModalStyles.contactInfoItem }>
            <h4>{ title }</h4>
            <p>{ contact }</p>
        </div>
    )
}