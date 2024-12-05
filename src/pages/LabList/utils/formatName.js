export const formatName = (name, type) => {
  if (type === 'dir') {
    return {
      extension: 'dir',
      name,
    };
  }
  const indexExtension = name.indexOf('.');
  const extension = name.slice(indexExtension, name.length);
  const nameWithoutExtension = name.slice(0, indexExtension);
  return {
    extension,
    name: nameWithoutExtension
  }
};
