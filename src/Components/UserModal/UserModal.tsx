import { useEffect, useRef } from 'react';
import { User } from '../../Types';
import UserModalStyles from './UserModal.module.css';
import { IconButton } from '../IconButton/IconButton';

interface Props {
    user : User;
    isModalOpen : boolean;
    setIsModalOpen : (arg0 : boolean) => void;
}

export function UserModal({ user, isModalOpen, setIsModalOpen } : Props) {
    const modalRef = useRef<HTMLDialogElement | null>(null);

    function exitModal() {
        setIsModalOpen(false);
        modalRef.current?.close();
    }

    useEffect(() => {
        function handleClickOutside(event : MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                exitModal();
            }
        }

        function handleKeyDown(event : KeyboardEvent) {
            if (modalRef.current && event.key === 'Escape') {
                exitModal();
            }
        }

        if (isModalOpen) {
            modalRef.current?.showModal();
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);
    
    const { first_name, last_name, phone_number, email } = user;

    return (
        <dialog ref={ modalRef } className={ UserModalStyles.userModal }>
            <IconButton clickHandler={ () => exitModal() } children='Close'/>
            <div className={ UserModalStyles.userModalTitle }>
                <h2>{ first_name + ' ' + last_name }</h2>
            </div>
            <div className={ UserModalStyles.userModalContent }>
                <h3>Contact Info</h3>
                <ul className={ UserModalStyles.contactInfoContainer }>
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
        <li className={ UserModalStyles.contactInfoItem }>
            <h4>{ title }</h4>
            <p>{ contact }</p>
        </li>
    )
}