const assert = require('assert');
const {
  stderrMessage,
  createFileErrorMessage } = require('../../src/head/errorHandler.js');

describe('stderrMessage', () => {
  it('should prefix with head', () => {
    const error = {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- 0',
      prefix: true,
      showUsage: false
    };
    const outMessage = 'head: illegal line count -- 0';
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
      'head: illegal option -- f\nusage: head [-n lines | -c bytes] [file ...]';
    assert.strictEqual(stderrMessage(error), outMessage);
  });
});

describe('createFileErrorMessage', () => {
  it('should give error message for non-existing file', () => {
    const error = {
      code: 'ENOENT',
      path: 'file'
    };
    const message = 'head: file: No such file or directory';
    assert.strictEqual(createFileErrorMessage(error), message);
  });

  it('should give error message if permission denied', () => {
    const error = {
      code: 'EACCES',
      path: 'file'
    };
    const message = 'head: file: Permission denied';
    assert.strictEqual(createFileErrorMessage(error), message);
  });
});
