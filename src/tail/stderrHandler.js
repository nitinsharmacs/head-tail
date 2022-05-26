const usage = () => 'usage: tail [-r] [-q] [-c # | -n #] [file ...]';

const prefix = (text) => `tail: ${text}`;

const newLine = (message) => {
  return message === '' ? '' : '\n';
};

const createStderrMessage = (error) => {
  let message = error.message;
  if (error.prefix) {
    message = prefix(message);
  }
  if (error.showUsage) {
    message += newLine(message) + usage();
  }
  return message;
};

const fileErrorMessage = ({ path: filename, code }) => {
  const fileErrors = {
    ENOENT: 'No such file or directory',
    EACCES: 'Permission denied'
  }
  const errorMessage = `${filename}: ${fileErrors[code]}`;
  return prefix(errorMessage);
};

exports.usage = usage;
exports.createStderrMessage = createStderrMessage;
exports.fileErrorMessage = fileErrorMessage;
