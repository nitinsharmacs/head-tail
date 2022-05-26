const usage = () => {
  return 'usage: head [-n lines | -c bytes] [file ...]';
};

const prefix = (text) => `head: ${text}`;

const createStdoutMessage = (error) => {
  let message = error.message;
  if (error.prefixWithHead) {
    message = prefix(message);
  }
  if (error.showUsage) {
    message += '\n' + usage();
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
exports.createStdoutMessage = createStdoutMessage;
exports.fileErrorMessage = fileErrorMessage;
