export function logger({ groupName, values = [], type = 'log' }, ...args) {
    console.group(groupName);
    values.forEach((item, index) => {
        console[type](`Nth ${index}`, item);
    });
    console.groupEnd();
}
