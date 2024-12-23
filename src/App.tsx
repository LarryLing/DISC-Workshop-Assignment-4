import { useState } from 'react'
import { Navbar } from './Components';
import { User } from './Types';
import { DiscoverPage, HomePage, ProfilePage } from './Pages';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    const [connections, setConnections] = useState<User[]>([]);

    return (
        <>
            <Navbar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={ <HomePage/> }/>
                    <Route path='/discover' element={ <DiscoverPage connections={ connections } setConnections={ setConnections }/> }/>
                    {/* <Route path='/myprofile' element={ <ProfilePage/> }/> */}
                    <Route path='/user/:id' element={ <ProfilePage connections={ connections } setConnections={ setConnections }/> }/>
                </Routes>
            </div>
        </>
    )
}

export default App
