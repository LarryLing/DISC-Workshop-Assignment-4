
import { MouseEventHandler, MutableRefObject } from 'react';
import { User } from '../../Types';
import { IconButton } from '../IconButton/IconButton';
import ModalStyles from './UserContactsModal.module.css';

interface Props {
    user : User;
    modalRef : MutableRefObject<HTMLDialogElement | null>;
    closeModal : MouseEventHandler;
}

export function UserContactsModal({ user, modalRef, closeModal } : Props) {
    const { first_name, last_name, phone_number, email } = user;

    return (
        <dialog ref={ modalRef } className={ ModalStyles.modal }>
            <IconButton onClick={ closeModal } children='Close'/>
            <div className={ ModalStyles.modalTitle }>
                <h2>{ first_name + ' ' + last_name }</h2>
            </div>
            <div className={ ModalStyles.modalContent }>
                <h3>Contact Info</h3>
                <ul>
                    <ContactInfoItem title="Email" contact={ email }/>
                    <ContactInfoItem title="Phone" contact={ phone_number }/>
                </ul>
            </div>
        </dialog>
    )
}

interface ContactInfoItemProps {
    title : string;
    contact : string | undefined;
}

function ContactInfoItem({ title, contact } : ContactInfoItemProps) {
    return (
        <li>
            <h4>{ title }</h4>
            <p>{ contact }</p>
        </li>
    )
}