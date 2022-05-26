const assert = require('assert');
const {
  createStdoutMessage,
  fileErrorMessage } = require('../../src/head/stderrHandler.js');

describe('createStdoutMessage', () => {
  it('should prefix with head', () => {
    const error = {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- 0',
      prefixWithHead: true,
      showUsage: false
    };
    const outMessage = 'head: illegal line count -- 0';
    assert.strictEqual(createStdoutMessage(error), outMessage);
  });

  it('should add usage to error message', () => {
    const error = {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- f',
      prefixWithHead: true,
      showUsage: true
    };
    const outMessage =
      'head: illegal option -- f\nusage: head [-n lines | -c bytes] [file ...]';
    assert.strictEqual(createStdoutMessage(error), outMessage);
  });
});

describe('fileErrorMessage', () => {
  it('should give error message for non-existing file', () => {
    const error = {
      code: 'ENOENT',
      path: 'file'
    };
    const message = 'head: file: No such file or directory';
    assert.strictEqual(fileErrorMessage(error), message);
  });

  it('should give error message if permission denied', () => {
    const error = {
      code: 'EACCES',
      path: 'file'
    };
    const message = 'head: file: Permission denied';
    assert.strictEqual(fileErrorMessage(error), message);
  });
});
