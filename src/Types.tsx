export type User = {
    user_id : number;
    first_name : string;
    last_name : string;
    email : string;
    phone_number : string;
    hometown : string;
}

export type UserProfile = {
    user_id : number;
    profile_url : string;
    background_url : string;
    major : string;
    class_of : number;
    bio : string;
    date_of_birth : string;
    pronouns : string;
    created_at : string;
    connections : number[];
}

export type ModalHookType = {
    modalRef : React.MutableRefObject<HTMLDialogElement | null>;
    openModal : () => void;
    closeModal : () => void;
}

export type FetchUserType = {
    errorOccured : boolean,
    isLoading : boolean,
    isUser : boolean,
    fetchedUser : User | null;
    fetchedProfile : UserProfile | null;
    fetchUserAndProfile : () => Promise<void>;
}

export type UserConnectionsContextType = {
    connections : number[];
    setConnections : (arg0 : number[]) => void;
}