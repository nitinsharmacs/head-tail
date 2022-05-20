const isCombinedOption = (text) => /^-[a-z][0-9]+$/.test(text);
const isNonCombinedOption = (text) => /^-[a-z]+$/.test(text);

const createOption = (name, value) => {
  const option = {};
  option[name] = +value;
  return option;
};

const separateCombinedOption = (option) => {
  const charRegex = /^-[a-z]+/;
  const numRegex = /\d+/;
  const optionName = option.match(charRegex)[0];
  const optionValue = option.match(numRegex)[0];
  return createOption(optionName, optionValue);
};

const validateOption = (option) => {
  const validOptions = ['-n', '-c'];
  const [optionName] = Object.keys(option);
  if (validOptions.includes(optionName)) {
    return option;
  }
  throw { name: 'INVALID_OPTION', message: 'Invalid Option ' + optionName };
};

const isNotOption = (text) => {
  return !(isCombinedOption(text) || isNonCombinedOption(text));
};

const parseOptions = (args, options) => {
  const text = args[0];
  if (isNotOption(text)) {
    return options;
  }
  if (isCombinedOption(text)) {
    return parseOptions(args.slice(1), {
      ...options,
      ...validateOption(separateCombinedOption(text))
    });
  }
  const optionValue = args[1];
  return parseOptions(args.slice(2), {
    ...options,
    ...validateOption(createOption(text, optionValue))
  });
};

const parseFileNames = (args) => {
  if (args.length === 0) {
    return [];
  }
  if (isCombinedOption(args[0])) {
    return parseFileNames(args.slice(1));
  }
  if (isNonCombinedOption(args[0])) {
    return parseFileNames(args.slice(2));
  }
  return args;
};

const parseArgs = (args) => {
  return {
    filenames: parseFileNames(args),
    options: parseOptions(args, {})
  };
};

exports.parseOptions = parseOptions;
exports.parseFileNames = parseFileNames;
exports.parseArgs = parseArgs;
