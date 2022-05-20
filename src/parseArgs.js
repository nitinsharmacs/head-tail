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
  const [optionName] = option.match(charRegex);
  const [optionValue] = option.match(numRegex);
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

const parseOptions = ([text, ...restArgs], options) => {
  if (isNotOption(text)) {
    return options;
  }
  if (isCombinedOption(text)) {
    return parseOptions(restArgs, {
      ...options,
      ...validateOption(separateCombinedOption(text))
    });
  }
  const [optionValue] = restArgs;
  return parseOptions(restArgs.slice(1), {
    ...options,
    ...validateOption(createOption(text, optionValue))
  });
};

const parseFileNames = (args) => {
  if (args.length === 0) {
    return [];
  }
  const [text] = args;
  if (isCombinedOption(text)) {
    return parseFileNames(args.slice(1));
  }
  if (isNonCombinedOption(text)) {
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
