import IconButtonStyles from './IconButton.module.css';

interface Props {
    children : string
}

export function IconButton({ children } : Props) {
    return (
        <button className={ IconButtonStyles.iconButton }>
            {children}
        </button>
    )
}
