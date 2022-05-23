const assert = require('assert');

const mockReadFileSync = (expectedFileNames, contents, expectedEncoding) => {
  let index = 0;
  return function (fileName, encoding) {
    assert.strictEqual(fileName, expectedFileNames[index]);
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
