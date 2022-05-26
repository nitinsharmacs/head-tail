const { validateOption } = require('./validators.js');
const { parseCombinedOption,
  parseNonCombinedOption,
  parseNumericOption,
  parseStandAloneOption } = require('../utils/parsers/optionParsers.js');

const isCombinedOption = (text) => {
  const rule = /^-[a-z][0-9a-z]+|-[a-z]+[-+][0-9a-z]+$/;
  return rule.test(text);
};

const isNonCombinedOption = (text) => /^-[a-z]+$/.test(text);

const createOption = (name, value) => {
  const option = {};
  option[name] = value;
  return option;
};

const separateCombinedOption = (option) => {
  const optionNameRegex = /^(-[a-z0-9])/;
  const [, optionName, optionValue] = option.split(optionNameRegex);
  return createOption(optionName, optionValue);
};

const numericOptionValue = (option) => {
  const [, value] = option.split('-');
  return value;
};

const isNumericOption = (text) => {
  return /^-[0-9]+$/.test(text);
};

const isNotOption = (text) => {
  return !(isCombinedOption(text) ||
    isNonCombinedOption(text) ||
    isNumericOption(text));
};

const isStandAloneOption = (text) => {
  return ['-r'].includes(text);
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
