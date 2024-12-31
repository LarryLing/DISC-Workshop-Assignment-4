import IconButtonStyles from './IconButton.module.css';

interface Props {
    clickHandler : () => void;
    children : string
}

export function IconButton({ clickHandler, children } : Props) {
    return (
        <button onClick={ clickHandler } className={ IconButtonStyles.iconButton }>
            {children}
        </button>
    )
}
