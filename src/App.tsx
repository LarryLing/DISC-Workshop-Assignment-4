import { useState } from 'react'
import { Navbar } from './Components';
import { Profile } from './Types';
import { DiscoverPage, HomePage, ProfilePage } from './Pages';
import { profiles } from './Definitions';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    const [connections, setConnections] = useState<Profile[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <>
            <Navbar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={ <HomePage/> }/>
                    <Route path='/discover' element={ <DiscoverPage connections={ connections } setConnections={ setConnections }/> }/>
                    <Route path='/myprofile' element={ <ProfilePage profile={ profiles[0] }/> }/>
                </Routes>
            </div>
        </>
    )
}

export default App
