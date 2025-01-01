import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IconButton } from '../index';
import { ModalHookType, User, UserProfile } from '../../Types';
import { GetInputDate } from '../../Utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalStyles from './EditProfileModal.module.css';

const formSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    phoneNumber : z.string(),
    email : z.string().email(),
    hometown : z.string(),
    profileUrl : z.string().url(),
    backgroundUrl : z.string().url(),
    major : z.string(),
    class : z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), { message: "Expected number, received a string" }),
    bio : z.string(),
    dateOfBirth : z.string(),
    pronouns : z.string(),
})

type FormFields = z.infer<typeof formSchema>;

interface Props {
    user : User;
    profile : UserProfile;
    modalHook : ModalHookType;
    fetchUserAndProfile : () => Promise<void>;
}

export function EditProfileModal({ user, profile, modalHook, fetchUserAndProfile } : Props) {
    const { user_id, first_name, last_name, phone_number, email, hometown } = user;
    const { profile_url, background_url, major, class_of, bio, date_of_birth, pronouns, created_at, connections } = profile;
    const { modalRef, closeModal } = modalHook;

    const { register, handleSubmit, setError, formState : {  errors, isSubmitting } } = useForm<FormFields>({
        defaultValues: {
            firstName : first_name,
            lastName : last_name,
            phoneNumber : phone_number,
            email : email,
            hometown : hometown,
            profileUrl : profile_url,
            backgroundUrl : background_url,
            major : major,
            class : String(class_of),
            bio : bio,
            dateOfBirth : GetInputDate(date_of_birth),
            pronouns : pronouns
        },
        resolver : zodResolver(formSchema)
    });

    async function onSubmit(data : FormFields) {
        const updatedUser : User = {
            user_id : user_id,
            first_name : data.firstName,
            last_name : data.lastName,
            email : data.email,
            phone_number : data.phoneNumber,
            hometown : data.hometown
        }

        const updatedProfile : UserProfile = {
            user_id : user_id,
            profile_url : data.profileUrl,
            background_url : data.backgroundUrl,
            major : data.major,
            class_of : parseInt(data.class),
            bio : data.bio,
            date_of_birth : data.dateOfBirth,
            pronouns : data.pronouns,
            created_at : created_at,
            connections : connections
        }
    
        try {
            const updatedUserRequestOptions= {
                method : "PUT",
                headers : { 
                    'Accept': 'application/json',
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify(updatedUser)
            }   
    
            const updatedProfileRequestOptions= {
                method : "PUT",
                headers : { 
                    'Accept': 'application/json',
                    "Content-Type" : "application/json" 
                },
                body: JSON.stringify(updatedProfile)
            }   
    
            const updatedUserPromise = fetch("http://localhost:3009/api/users/" + user_id, updatedUserRequestOptions);
            const updatedProfilePromise = fetch("http://localhost:3009/api/user_profiles/" + user_id, updatedProfileRequestOptions);
    
            const updatedResponses = await Promise.all([updatedUserPromise, updatedProfilePromise]);
    
            const updatedUserResponse = updatedResponses[0];
            const updatedProfileResponse = updatedResponses[1];

            if (!updatedUserResponse.ok || !updatedProfileResponse.ok) {
                setError("root", { message : "Unable to update profile..." });
                return;
            } else {
                closeModal();
            }

            fetchUserAndProfile();
        } catch (error) {
            setError("root", { message : "Something went wrong..." });
        }
    }

    return (
        <dialog ref={ modalRef } className={ ModalStyles.modal }>
            <IconButton onClick={ closeModal } children='Close'/>
            <div className={ ModalStyles.modalTitle }>
                <h2>Edit Profile </h2>
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="firstName">First Name</label>
                    <input {...register("firstName") } type="text" id="firstName" name="firstName"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="lastName">Last Name</label>
                    <input {...register("lastName") } type="text" id="lastName" name="lastName"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="major">Major</label>
                    <input {...register("major") } type="text" id="major" name="major"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="class">Class</label>
                    <input {...register("class") } type="number" id="class" name="class"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="hometown">Hometown</label>
                    <input {...register("hometown") } type="text" id="hometown" name="hometown"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="email">Email</label>
                    <input {...register("email") } type="email" id="email" name="email"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input {...register("phoneNumber") } type="text" id="phoneNumber" name="phoneNumber"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="profileUrl">Profile URL</label>
                    <input {...register("profileUrl") } type="url" id="profileUrl" name="profileUrl"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="backgroundUrl">Background URL</label>
                    <input {...register("backgroundUrl") } type="url" id="backgroundUrl" name="backgroundUrl"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="bio">Bio</label>
                    <input {...register("bio") } type="text" id="bio" name="bio"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="pronouns">Pronouns</label>
                    <input {...register("pronouns") } type="text" id="pronouns" name="pronouns"/>
                </div>
                <div className={ ModalStyles.formField }>
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <input {...register("dateOfBirth") } type="date" id="dateOfBirth" name="dateOfBirth"/>
                </div>
                { errors.root && <div>{ errors.root.message }</div> }
                <button disabled={ isSubmitting } type="submit">{ isSubmitting ? "Submitting..." : "Submit" }</button>       
            </form>
        </dialog>
    )
}
