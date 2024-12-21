import { useState } from 'react'
import Header from './HeaderComponent/Header'
import Card from './CardComponent/Card';
import { profiles } from './Definitions';
import { Profile } from './Types';
import './App.css'

function App() {
    const [profilesAdded, setProfilesAdded ] = useState<Profile[]>([]);

    return (
        <div>
            <Header/>
            <div id="content" className="content">
                <div id="profiles" className="profiles">
                    {profiles.map((profile) => (
                        <div key={ profile.id }>
                            <Card 
                                profile={ profile }
                                profilesAdded={ profilesAdded }
                                setProfilesAdded={ setProfilesAdded }/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
