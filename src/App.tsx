import { useState } from 'react'
import { Navbar } from './Components';
import { Profile } from './Types';
import { DiscoverPage, ProfilePage } from './Pages';
import './App.css'

function App() {
    const [connections, setConnections ] = useState<Profile[]>([]);

    return (
        <>
            <Navbar/>
            <div className="content">
                <DiscoverPage connections={ connections } setConnections={ setConnections }/>
            </div>
        </>
    )
}

export default App
