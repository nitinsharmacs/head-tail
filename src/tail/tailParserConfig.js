const { validateOption } = require('./validators.js');
const { parsers } = require('../utils/parsers/optionParsers.js');

const isCombinedOption = (text) => {
  const rule = /^-[a-z0-9]{2,}|-[a-z]+[-+][0-9]+$/;
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

const isNumericOption = (text) => {
  return /^[-+][0-9]+$/.test(text);
};

const numericOptionValue = (option) => {
  return option;
};

const isNotOption = (text) => {
  return !(isCombinedOption(text) ||
    isNonCombinedOption(text) ||
    isNumericOption(text));
};

const isStandAloneOption = (text) => {
  return ['-r', '-q'].includes(text);
};

const parserConfig = {
  optionParsers: [
    {
      parser: parsers.combinedOption,
      predicate: isCombinedOption,
      separator: separateCombinedOption
    },
    {
      parser: parsers.nonCombinedOption,
      predicate: isNonCombinedOption
    },
    {
      parser: parsers.numericOption,
      predicate: isNumericOption,
      separator: numericOptionValue,
      optionName: '-n'
    },
    {
      parser: parsers.standAloneOption,
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
