import { useState } from 'react'
import Navbar from './Navbar/Navbar'
import ProfileCard from './ProfileCard/ProfileCard';
import { profiles } from './Definitions';
import { Profile } from './Types';
import './App.css'

function App() {
    const [profilesAdded, setProfilesAdded ] = useState<Profile[]>([]);

    return (
        <div>
            <Navbar/>
            <div id="content" className="content">
                <div id="profiles" className="profiles">
                    {profiles.map((profile) => (
                        <ProfileCard
                            key={ profile.id } 
                            profile={ profile }
                            profilesAdded={ profilesAdded }
                            setProfilesAdded={ setProfilesAdded }/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
