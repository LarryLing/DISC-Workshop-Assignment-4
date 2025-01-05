import { useState } from 'react'
import Navbar from './Navbar/Navbar'
import ProfileCard from './ProfileCard/ProfileCard';
import { profiles } from './Definitions';
import { Profile } from './Types';
import './App.css'

function App() {
    const [connections, setConnections ] = useState<Profile[]>([]);

    return (
        <>
            <Navbar/>
            <div className="content">
                <div className="profiles">
                    {profiles.map((profile) => (
                        <ProfileCard
                            key={ profile.id } 
                            profile={ profile }
                            connections={ connections }
                            setConnections={ setConnections }/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default App
