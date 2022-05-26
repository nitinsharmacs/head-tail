const assert = require('assert');

const mockReadFileSync = (expectedFilenames, contents, expectedEncoding) => {
  let index = 0;
  return function (filename, encoding) {
    if (filename !== expectedFilenames[index]) {
      throw {
        code: 'ENOENT',
        path: filename
      }
    }
    assert.strictEqual(encoding, expectedEncoding);
    const actualContent = contents[index];
    index++;
    return actualContent;
  };
};

const mockLogger = (expectedTexts) => {
  let index = 0;
  return function (actualText) {
    assert.strictEqual(actualText, expectedTexts[index]);
    index++;
  };
};

exports.mockReadFileSync = mockReadFileSync;
exports.mockLogger = mockLogger;
