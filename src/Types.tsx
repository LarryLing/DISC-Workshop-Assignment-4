export type User = {
    id : number;
    firstName : string;
    lastName : string;
    email : string;
    bio : string;
    major : string;
    graduationYear : string;
    created_at : string;
    profilePicture : string;
}

export type Profile = {
    id : number;
    user : User;
    profileURL : string;
    backgroundURL : string;
}