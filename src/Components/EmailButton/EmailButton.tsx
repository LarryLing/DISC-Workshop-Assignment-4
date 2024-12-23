import EmailButtonStyle from './EmailButton.module.css';

interface Props {
    email : string;
}

export function EmailButton({ email } : Props) {
    function handleClick() {
        navigator.clipboard.writeText(email);
        // TODO: Add toaster pop-up when user copies email
    }

    return (
        <button
            className={ EmailButtonStyle.emailButton }  
            onClick={ handleClick }>
                Copy email
        </button>
    )
}
