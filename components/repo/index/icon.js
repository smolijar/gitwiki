import icons from 'file-icons-js';

const getIconClass = (entry) => {
  if (entry.isDirectory) return 'directory';
  try {
    return icons.getClassWithColor(entry.name) || 'file';
  } catch (e) {
    return 'file';
  }
};

export default getIconClass;
