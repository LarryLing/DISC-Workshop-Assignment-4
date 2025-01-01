import { FormEvent, MouseEventHandler, MutableRefObject } from 'react'
import { IconButton } from '../index';
import { User, UserProfile } from '../../Types';
import { GetInputDate } from '../../Utilities';
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

    // awful terrible no good very bad and unelegant way to handle input values
    async function submitAction(event : FormEvent<HTMLFormElement>) {
        // TODO: Add client side form validation
        // event.preventDefault();

        const formData = new FormData(event.currentTarget);
        console.log(formData.get("class"));

        const updatedUser : User = {
            user_id : user_id,
            first_name : formData.get("first_name") as string,
            last_name : formData.get("last_name") as string,
            phone_number : formData.get("phone_number") as string,
            email : formData.get("email") as string,
            hometown : formData.get("hometown") as string
        }

        const updatedProfile : UserProfile = {
            user_id : user_id,
            profile_url : profile_url,
            background_url : background_url,
            major : formData.get("major") as string,
            class_of : parseInt((formData.get("class") as string)),
            bio : formData.get("bio") as string,
            date_of_birth : formData.get("date_of_birth") as string || date_of_birth,
            pronouns : formData.get("pronouns") as string,
            created_at : created_at,
            connections : connections
        }

        putUser(updatedUser, updatedProfile);
    }

    return (
        <dialog ref={ modalRef } className={ ModalStyles.modal }>
            <IconButton onClick={ closeModal } children='Close'/>
            <div className={ ModalStyles.modalTitle }>
                <h2>Edit Profile </h2>
            </div>
            <form onSubmit={ (e) => submitAction(e) }>
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
                <FormField title='Date of birth' id="date_of_birth" type="date" defaultValue={ GetInputDate(date_of_birth) }/>
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

async function putUser(user : User, profile : UserProfile) {
    console.log("Started loading");

    try {
        const userRequestOptions= {
            method : "PUT",
            headers : { 
                'Accept': 'application/json',
                "Content-Type" : "application/json" },
            body: JSON.stringify(user)
        }   

        const profileRequestOptions= {
            method : "PUT",
            headers : { 
                'Accept': 'application/json',
                "Content-Type" : "application/json" },
            body: JSON.stringify(profile)
        }   

        console.log(userRequestOptions.body);
        console.log(profileRequestOptions.body);

        const userPromise = fetch("http://localhost:3009/api/users/" + user.user_id, userRequestOptions);
        const profilePromise = fetch("http://localhost:3009/api/user_profiles/" + user.user_id, profileRequestOptions);

        const responses = await Promise.all([userPromise, profilePromise]);

        const userResponse = responses[0];
        const profileResponse = responses[1];

        if (!userResponse.ok) {
            console.log("An error occured");
        } else if (!profileResponse.ok) {
            console.log("An error occured");
        }
    } catch {
        console.log("An error occured");
    } finally {
        console.log("Finished loading");
    }
}