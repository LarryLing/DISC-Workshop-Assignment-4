export type User = {
    id : number;
    firstname : string;
    lastname : string;
    email : string;
    bio : string;
    major : string;
    graduationyear : number;
    created_at : string;
    profilepicture : string;
}

export type userConnectionsContextType = {
    connections : User[];
    setConnections : (arg0 : User[]) => void;
}