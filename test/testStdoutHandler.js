const assert = require('assert');
const { createStdoutMessage } = require('../src/studoutHandler.js');

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
