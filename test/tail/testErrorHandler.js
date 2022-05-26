const assert = require('assert');
const {
  stderrMessage,
  createFileErrorMessage } = require('../../src/tail/errorHandler.js');

describe('stderrMessage', () => {
  it('should prefix with tail', () => {
    const error = {
      code: 'ILLEGAL_COUNT',
      message: 'illegal offset -- 0',
      prefix: true,
      showUsage: false
    };
    const outMessage = 'tail: illegal offset -- 0';
    assert.strictEqual(stderrMessage(error), outMessage);
  });

  it('should add usage to error message', () => {
    const error = {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- f',
      prefix: true,
      showUsage: true
    };
    const outMessage =
      `tail: illegal option -- f
usage: tail [-r] [-q] [-c # | -n #] [file ...]`;
    assert.strictEqual(stderrMessage(error), outMessage);
  });
});

describe('createFileErrorMessage', () => {
  it('should give error message for non-existing file', () => {
    const error = {
      code: 'ENOENT',
      path: 'file'
    };
    const message = 'tail: file: No such file or directory';
    assert.strictEqual(createFileErrorMessage(error), message);
  });

  it('should give error message if permission denied', () => {
    const error = {
      code: 'EACCES',
      path: 'file'
    };
    const message = 'tail: file: Permission denied';
    assert.strictEqual(createFileErrorMessage(error), message);
  });
});
