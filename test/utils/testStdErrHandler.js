const assert = require('assert');
const {
  createStderrMessage,
  fileErrorMessage } = require('../../src/utils/stderrHandler.js');
const {
  prefix: headPrefixer,
  usage: headUsage } = require('../../src/head/errorHandler.js');

const {
  prefix: tailPrefixer,
  usage: tailUsage } = require('../../src/tail/errorHandler.js');

describe('createStderrMessage [head]', () => {
  it('should prefix with head', () => {
    const error = {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- 0',
      prefix: true,
      showUsage: false
    };
    const outMessage = 'head: illegal line count -- 0';
    assert.strictEqual(
      createStderrMessage(error, headPrefixer, headUsage),
      outMessage
    );
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
    assert.strictEqual(
      createStderrMessage(error, headPrefixer, headUsage),
      outMessage
    );
  });
});

describe('fileErrorMessage [head]', () => {
  it('should give error message for non-existing file', () => {
    const error = {
      code: 'ENOENT',
      path: 'file'
    };
    const message = 'head: file: No such file or directory';
    assert.strictEqual(fileErrorMessage(error, headPrefixer), message);
  });

  it('should give error message if permission denied', () => {
    const error = {
      code: 'EACCES',
      path: 'file'
    };
    const message = 'head: file: Permission denied';
    assert.strictEqual(fileErrorMessage(error, headPrefixer), message);
  });
});

describe('createStderrMessage [tail]', () => {
  it('should prefix with tail', () => {
    const error = {
      code: 'ILLEGAL_COUNT',
      message: 'illegal line count -- 0',
      prefix: true,
      showUsage: false
    };
    const outMessage = 'tail: illegal line count -- 0';
    assert.strictEqual(
      createStderrMessage(error, tailPrefixer, headUsage),
      outMessage
    );
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
    assert.strictEqual(
      createStderrMessage(error, tailPrefixer, tailUsage),
      outMessage
    );
  });
});

describe('fileErrorMessage [tail]', () => {
  it('should give error message for non-existing file', () => {
    const error = {
      code: 'ENOENT',
      path: 'file'
    };
    const message = 'tail: file: No such file or directory';
    assert.strictEqual(fileErrorMessage(error, tailPrefixer), message);
  });

  it('should give error message if permission denied', () => {
    const error = {
      code: 'EACCES',
      path: 'file'
    };
    const message = 'tail: file: Permission denied';
    assert.strictEqual(fileErrorMessage(error, tailPrefixer), message);
  });
});
