export function logger({ groupName, values = [], type = 'log' }, ...args) {
    console.group(groupName);
    console[type](values);
    console.groupEnd();
}
