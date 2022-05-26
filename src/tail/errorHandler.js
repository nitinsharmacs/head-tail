const {
  createStderrMessage,
  fileErrorMessage } = require('../utils/stderrHandler.js');

const usage = () => 'usage: tail [-r] [-q] [-c # | -n #] [file ...]';

const prefix = (text) => `tail: ${text}`;

const stderrMessage = (error) => {
  return createStderrMessage(error, prefix, usage);
};

const createFileErrorMessage = (error) => {
  return fileErrorMessage(error, prefix);
};

exports.usage = usage;
exports.prefix = prefix;
exports.stderrMessage = stderrMessage;
exports.createFileErrorMessage = createFileErrorMessage;
