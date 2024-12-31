import { MouseEventHandler } from 'react';
import IconButtonStyles from './IconButton.module.css';

interface Props {
    onClick : MouseEventHandler;
    children : string
}

export function IconButton({ onClick, children } : Props) {
    return (
        <button onClick={ onClick } className={ IconButtonStyles.iconButton }>
            {children}
        </button>
    )
}
