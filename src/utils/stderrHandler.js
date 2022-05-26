const newLine = (message) => {
  return message === '' ? '' : '\n';
};

const createStderrMessage = (error, prefix, usage) => {
  let message = error.message;
  if (error.prefix) {
    message = prefix(message);
  }
  if (error.showUsage) {
    message += newLine(message) + usage();
  }
  return message;
};

const fileErrorMessage = ({ path: filename, code }, prefix) => {
  const fileErrors = {
    ENOENT: 'No such file or directory',
    EACCES: 'Permission denied'
  };
  const errorMessage = `${filename}: ${fileErrors[code]}`;
  return prefix(errorMessage);
};

exports.createStderrMessage = createStderrMessage;
exports.fileErrorMessage = fileErrorMessage;
