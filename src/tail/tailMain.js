const { tail } = require('./tailLib.js');
const { tailArgsParser } = require('./tailArgsParser.js');
const { usage, createFileErrorMessage } = require('./errorHandler.js');

const createHeader = (filename) => {
  return `==> ${filename} <==\n`;
};

const addHeader = (header, heading, text) => {
  return `${header(heading)}${text}`;
};

const tailFile = (filename, fileReader, header, options) => {
  try {
    const content = fileReader(filename, 'utf8');
    const text = addHeader(header, filename, tail(content, options));
    return { text };
  } catch (error) {
    return { error };
  }
};

const tailFiles = (filenames, fileReader, options) => {
  let header = createHeader;
  if (filenames.length <= 1 || options.supressHeadings) {
    header = () => '';
  }
  return filenames.map(
    (filename) => tailFile(filename, fileReader, header, options)
  );
};

const printTailOfFiles = (tailOfFiles, console) => {
  tailOfFiles.forEach(tailOfFiles => {
    if (tailOfFiles.error) {
      return console.errorLogger(createFileErrorMessage(tailOfFiles.error));
    }
    console.logger(tailOfFiles.text);
  });
};

const getExitCode = (tailOfFiles) => {
  return tailOfFiles.some(tailOfFiles => tailOfFiles.error) ? 1 : 0;
};

const assertFile = (files) => {
  if (files.length === 0) {
    throw {
      code: 'NO_FILE_PROVIDED',
      showUsage: true
    };
  }
};

const tailMain = (fileReader, args, console) => {
  const { filenames, options } = tailArgsParser(args);
  const exitCode = 0;
  const [firstArg] = args;
  if (firstArg === '--help') {
    console.logger(usage());
    return exitCode;
  }
  assertFile(filenames);

  const tailOfFiles = tailFiles(filenames, fileReader, options);
  printTailOfFiles(tailOfFiles, console);

  return getExitCode(tailOfFiles);
};

exports.tailFile = tailFile;
exports.tailFiles = tailFiles;
exports.printTailOfFiles = printTailOfFiles;
exports.getExitCode = getExitCode;
exports.tailMain = tailMain;
