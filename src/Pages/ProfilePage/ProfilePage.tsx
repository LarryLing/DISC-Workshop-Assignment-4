import { useParams } from 'react-router-dom';
import { DetailedProfile, EditProfileModal, UserContactsModal } from '../../Components';
import { useFetchUser } from '../../Hooks';
import { useModal } from '../../Hooks/useModal';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const id = useParams().id;
    const fetchUserHook= useFetchUser(id);
    const userContactsModal = useModal();
    const editProfileModal = useModal();

    const { errorOccured, isLoading, isUser, fetchedUser, fetchedProfile, fetchUserAndProfile } = fetchUserHook;

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
            <DetailedProfile user={ fetchedUser } profile={ fetchedProfile } isUser={ isUser } openEditProfileModal={ editProfileModal.openModal } openContactInfoModal={ userContactsModal.openModal }/>
            <EditProfileModal user={ fetchedUser } profile={ fetchedProfile } modalHook={ editProfileModal } fetchUserAndProfile={ fetchUserAndProfile }/>
            <UserContactsModal user={ fetchedUser } modalHook={ userContactsModal }/>
        </div>
    )
}