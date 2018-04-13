import icons from 'file-icons-js';

const getIconClass = (entry) => {
  if (entry.isDirectory) return 'directory';
  return icons.getClassWithColor(entry.name) || 'file';
};

export default getIconClass;
