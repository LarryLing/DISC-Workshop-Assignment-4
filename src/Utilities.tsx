import { User, UserProfile } from "./Types";

export function GetDisplayDate(datetime : string) {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const date = new Date(datetime);

    return `${ monthNames[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }`;
}

export function GetInputDate(datetime : string) {
    const date = new Date(datetime);

    return `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
}

export async function PutUserProfile(profile : UserProfile) {
    const { user_id } = profile;

    try {
        const myConnectionsRequestOptions = {
            method : "PUT",
            headers : {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(profile)
        }

        const myConnectionsRequest = fetch("http://localhost:3009/api/user_profiles/" + user_id, myConnectionsRequestOptions);

        const response = await Promise.all([myConnectionsRequest]);

        const myConnectionsResponse = response[0];

        if (!myConnectionsResponse.ok) {
            console.log("Unable to update my connections");
        } 
    }
    catch (error) {
        console.log("Something went wrong...");
    }
}