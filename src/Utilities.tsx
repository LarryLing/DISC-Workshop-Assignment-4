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