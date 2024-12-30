import { useParams } from 'react-router-dom';
import { DetailedProfile, UserModal } from '../../Components';
import { useFetchUser } from '../../Hooks';
import { useState } from 'react';
import ProfilePageStyles from './ProfilePage.module.css';

export function ProfilePage() {
    const id = useParams().id;
    const { errorOccured, isLoading, isUser, fetchedUser, fetchedProfile } = useFetchUser(id);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <DetailedProfile user={ fetchedUser } profile={ fetchedProfile } isUser={ isUser } isModalOpen={ isModalOpen } setIsModalOpen={ setIsModalOpen }/>
            { isModalOpen && <UserModal user={ fetchedUser }/> }
        </div>
    )
}