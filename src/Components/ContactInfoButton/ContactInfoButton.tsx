import ContactInfoStyles from './ContactInfoButton.module.css';

interface Props {
    isModalOpen : boolean;
    setIsModalOpen : (arg0 : boolean) => void;
}

export function ContactInfoButton({ isModalOpen, setIsModalOpen } : Props) {
    return (
        <button
            className={ ContactInfoStyles.contactInfoButton }
            onClick={ () => setIsModalOpen(!isModalOpen) }>
                Contact Info
        </button>
    )
}
