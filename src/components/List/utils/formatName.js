
export const formatName = (name, type) => {
    if (type === 'dir') {
        return name;
    }
    const indexExtension = name.indexOf('.');
    return name.slice(0, indexExtension)
}