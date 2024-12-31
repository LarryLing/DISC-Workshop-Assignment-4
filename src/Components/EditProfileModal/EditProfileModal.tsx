import { MouseEventHandler, MutableRefObject } from 'react'
import { IconButton } from '../IconButton/IconButton';
import { User, UserProfile } from '../../Types';
import ModalStyles from './EditProfileModal.module.css';

interface Props {
    user : User;
    profile : UserProfile;
    modalRef : MutableRefObject<HTMLDialogElement | null>;
    closeModal : MouseEventHandler;
}

export function EditProfileModal({ user, profile, modalRef, closeModal } : Props) {
    const { user_id, first_name, last_name, phone_number, email, hometown } = user;
    const { profile_url, background_url, major, class_of, bio, date_of_birth, pronouns, created_at, connections } = profile;

    function onSubmitHandler() {
        console.log("Submitted");
    }

    return (
        <dialog ref={ modalRef } className={ ModalStyles.modal }>
            <IconButton onClick={ closeModal } children='Close'/>
            <div className={ ModalStyles.modalTitle }>
                <h2>Edit Profile </h2>
            </div>
            <form onSubmit={ onSubmitHandler }>
                <FormField title='First name' id="first_name" type="text" defaultValue={ first_name }/>
                <FormField title='Last name' id="last_name" type="text" defaultValue={ last_name }/>
                <FormField title='Major' id="major" type="text" defaultValue={ major }/>
                <FormField title='Class' id="class" type="number" defaultValue={ class_of }/>                
                <FormField title='Hometown' id="hometown" type="hometown" defaultValue={ hometown }/>
                <FormField title='Email' id="email" type="email" defaultValue={ email }/>
                <FormField title='Phone number' id="phone_number" type="text" defaultValue={ phone_number }/>
                <FormField title='Profile picture' id="profile_url" type="file"/>
                <FormField title='Background picture' id="background_url" type="file"/>                
                <FormField title='Bio' id="bio" type="text" defaultValue={ bio }/>
                <FormField title='Pronouns' id="pronouns" type="text" defaultValue={ pronouns }/>
                <FormField title='Date of birth' id="date_of_birth" type="date" defaultValue={ date_of_birth }/>
                <input type="submit" id="submit" name="submit"/>             
            </form>
        </dialog>
    )
}

interface FormFieldProps {
    title : string;
    id : string;
    type : string;
    defaultValue? : string | number;
}

function FormField({ title, id, type, defaultValue } : FormFieldProps) {
    return (
        <div className={ ModalStyles.formField }>
            <label htmlFor={ id }>{ title }</label>
            <input type={ type } id={ id } name={ id } defaultValue={ defaultValue }/>
        </div>
    )
}