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

exports.usage = usage;
exports.createStdoutMessage = createStdoutMessage;
