import InfoContainerStyles from './InfoContainer.module.css';

interface Props {
    title : string;
    info : string | undefined;
}

export function InfoContainer({ title, info} : Props) {
    return (
        <div className={ InfoContainerStyles.infoWidget }>
            <h3>{ title }</h3>
            <p>{ info }</p>
        </div>
    )
}