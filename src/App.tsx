import { useState } from 'react'
import Header from './HeaderComponent/Header'
import Card from './CardComponent/Card';
import { profiles } from './Definitions';
import './App.css'

function App() {
    const [profilesAdded, setProfilesConnected] = useState([]);

    return (
        <div>
            <Header/>
            <div id="content" className="content">
                <div id="profiles" className="profiles">
                    {profiles.map((profile) => (
                        <Card 
                            id={profile.id} 
                            name={profile.name} 
                            intro={profile.intro} 
                            pictureURL={profile.pictureURL} 
                            backgroundURL={profile.backgroundURL}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
