import { useParams } from 'react-router-dom';
import { DetailedProfile, EditProfileModal, UserContactsModal } from '../../Components';
import { useFetchUser } from '../../Hooks';
import { useModal } from '../../Hooks/useModal';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const id = useParams().id;
    const { errorOccured, isLoading, isUser, fetchedUser, fetchedProfile } = useFetchUser(id);
    const userContactsModalHook = useModal();
    const editProfileModalHook = useModal();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (errorOccured) {
        return <div>Unable to fetch user...</div>
    }

    if (!fetchedUser) {
        return <div>Tried to display an undefined user!</div>;
    }

    if (!fetchedProfile) {
        return <div>Tried do display an undefined profile!</div>;
    }

    return (
        <div className={ ProfilePageStyles.profilePage }>
            <DetailedProfile user={ fetchedUser } profile={ fetchedProfile } isUser={ isUser } openEditProfileModal={ editProfileModalHook.openModal } openContactInfoModal={ userContactsModalHook.openModal }/>
            <EditProfileModal user={ fetchedUser } profile={ fetchedProfile } modalRef={ editProfileModalHook.modalRef } closeModal={ editProfileModalHook.closeModal }/>
            <UserContactsModal user={ fetchedUser } modalRef={ userContactsModalHook.modalRef } closeModal={ userContactsModalHook.closeModal }/>
        </div>
    )
}