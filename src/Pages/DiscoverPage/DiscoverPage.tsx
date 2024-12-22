import { ProfileCard } from "../../Components";
import { profiles } from "../../Definitions";
import { Profile } from "../../Types";
import DiscoverPageStyles from './DiscoverPage.module.css';

interface Props {
    connections : Profile[];
    setConnections : (arg0 : Profile[]) => void;
}

export function DiscoverPage({ connections, setConnections } : Props) {
    return (
        <div className={ DiscoverPageStyles.profiles }>
            {profiles.map((profile) => (
                <ProfileCard
                    key={ profile.user.id } 
                    profile={ profile }
                    connections={ connections }
                    setConnections={ setConnections }/>
            ))}
        </div>
    )
}