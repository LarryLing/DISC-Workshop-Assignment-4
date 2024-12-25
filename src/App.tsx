import { createContext, useState } from 'react'
import { Navbar } from './Components';
import { User, UserConnectionsContextType } from './Types';
import { DiscoverPage, HomePage, ProfilePage } from './Pages';
import { Route, Routes } from 'react-router-dom';
import './App.css';

export const UserConnectionsContext = createContext<UserConnectionsContextType | undefined>(undefined);

function App() {
    const [connections, setConnections] = useState<User[]>([]);

    return (
        <>
            <Navbar/>
            <div className="content">
                <UserConnectionsContext.Provider value={{ connections, setConnections }}>
                    <Routes>
                        <Route path="/" element={ <HomePage/> }/>
                        <Route path='/discover' element={ <DiscoverPage/> }/>
                        <Route path='/user/:id' element={ <ProfilePage/> }/>
                    </Routes>
                </UserConnectionsContext.Provider>
            </div>
        </>
    )
}

export default App
