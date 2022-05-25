const usage = () => 'tail [-r] [-q] [-c # | -n #] [file ...]';

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

exports.usage = usage;
exports.createStderrMessage = createStderrMessage;
