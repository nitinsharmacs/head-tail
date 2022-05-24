const usage = () => 'usage: tail [-c # | -n #] [file ...]';

const prefix = (text) => `tail: ${text}`;

const createStderrMessage = (error) => {
  let message = error.message;
  if (error.prefix) {
    message = prefix(message);
  }
  if (error.showUsage) {
    message += usage();
  }
  return message;
};

exports.usage = usage;
exports.createStderrMessage = createStderrMessage;
