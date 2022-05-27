const { validateOption } = require('./validators.js');
const { parseCombinedOption,
  parseNonCombinedOption,
  parseNumericOption,
  parseStandAloneOption } = require('../utils/optionParsers.js');

const isCombinedOption = (text) => /^-[a-z][-+]?[a-z0-9]+$/.test(text);

const isNonCombinedOption = (text) => /^-[a-z]+$/.test(text);

const isNumericOption = (text) => /^-[0-9]+$/.test(text);

const createOption = (name, value) => {
  const option = {};
  option[name] = value;
  return option;
};

const separateCombinedOption = (option) => {
  const optionName = option.substring(0, 2);
  const optionValue = option.substring(2);
  return createOption(optionName, optionValue);
};

const numericOptionValue = (option) => {
  const [, value] = option.split('-');
  return value;
};

const isNotOption = (text) => {
  return !(isCombinedOption(text) ||
    isNonCombinedOption(text) ||
    isNumericOption(text));
};

const isStandAloneOption = () => {
  return false;
};

const parserConfig = {
  optionParsers: [
    {
      parser: parseCombinedOption,
      predicate: isCombinedOption,
      separator: separateCombinedOption
    },
    {
      parser: parseNonCombinedOption,
      predicate: isNonCombinedOption
    },
    {
      parser: parseNumericOption,
      predicate: isNumericOption,
      separator: numericOptionValue,
      optionName: '-n'
    },
    {
      parser: parseStandAloneOption,
      predicate: isStandAloneOption
    }
  ],
  notOption: {
    predicate: isNotOption
  },
  validator: validateOption
};

exports.parserConfig = parserConfig;
exports.separateCombinedOption = separateCombinedOption;
exports.numericOptionValue = numericOptionValue;
