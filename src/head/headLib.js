const { splitLines, joinLines } = require('../utils/stringUtils.js');
const { headArgsParser } = require('./headArgsParser.js');
const { usage, createFileErrorMessage } = require('./errorHandler.js');

const firstNLines = (lines, count) => {
  return lines.slice(0, count);
};

const firstNBytes = (content, bytes) => {
  return content.slice(0, bytes);
};

const head = (content, { askedForBytes, count }) => {
  if (askedForBytes) {
    return firstNBytes(content, count);
  }
  const lines = splitLines(content);
  return joinLines(firstNLines(lines, count));
};

const createHeader = (filename) => {
  return `==> ${filename} <==\n`;
};

const addHeader = (header, heading, text) => {
  return `${header(heading)}${text}`;
};

const headFile = (filename, fileReader, header, options) => {
  try {
    const content = fileReader(filename, 'utf8');
    const text = addHeader(header, filename, head(content, options));
    return { text };
  } catch (error) {
    return { error };
  }
};

const headFiles = (filenames, fileReader, options) => {
  let header = () => '';
  if (filenames.length > 1) {
    header = createHeader;
  }
  return filenames.map(
    (filename) => headFile(filename, fileReader, header, options)
  );
};

const printHeadOfFiles = (headOfFiles, console) => {
  headOfFiles.forEach(headOfFile => {
    if (headOfFile.error) {
      return console.errorLogger(createFileErrorMessage(headOfFile.error));
    }
    console.logger(headOfFile.text);
  });
};

const getExitCode = (headOfFiles) => {
  return headOfFiles.some(headOfFile => headOfFile.error) ? 1 : 0;
};

const assertFile = (files) => {
  if (files.length === 0) {
    throw {
      code: 'NO_FILE_PROVIDED',
      message: usage()
    };
  }
};

const headMain = (fileReader, args, console) => {
  const [firstArg] = args;
  if (firstArg === '--help') {
    console.logger(usage());
    return 0;
  }

  const { filenames, options } = headArgsParser(args);
  assertFile(filenames);

  const headOfFiles = headFiles(filenames, fileReader, options);
  printHeadOfFiles(headOfFiles, console);

  return getExitCode(headOfFiles);
};

exports.firstNLines = firstNLines;
exports.firstNBytes = firstNBytes;
exports.assertFile = assertFile;
exports.usage = usage;
exports.createHeader = createHeader;
exports.head = head;
exports.headFile = headFile;
exports.headFiles = headFiles;
exports.printHeadOfFiles = printHeadOfFiles;
exports.getExitCode = getExitCode;
exports.headMain = headMain;
