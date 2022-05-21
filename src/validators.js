const optionName = (option) => {
  const [optionName] = option.split('-').reverse();
  return optionName;
};

const cantBeCombined = (newOption, prevOptions) => {
  const prevOptionsKeys = Object.keys(prevOptions);
  const [newOptionsKey] = Object.keys(newOption);
  const differentKey = prevOptionsKeys.find(key => key !== newOptionsKey);
  return differentKey !== undefined;
};

const optionKey = (option) => {
  const [key] = Object.keys(option);
  return key;
};

const isNotValidOption = (option) => {
  const validOptions = ['-n', '-c'];
  return !validOptions.includes(optionKey(option));
};

const validateOptionValue = (option) => {
  const optionsRules = {
    '-n': {
      name: 'line',
      minValue: 1
    },
    '-c': {
      name: 'byte',
      minValue: 1
    }
  };
  const key = optionKey(option);
  const optionValue = option[key];
  const rule = optionsRules[key];
  if (rule.minValue > optionValue) {
    throw {
      code: 'ILLEGALCOUNT',
      message: 'illegal ' + rule.name + ' count -- ' + optionValue
    };
  }
};

const validateOption = (newOptions, prevOptions) => {
  if (isNotValidOption(newOptions)) {
    throw {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- ' + optionName(optionKey(newOptions))
    };
  }

  validateOptionValue(newOptions);

  if (cantBeCombined(newOptions, prevOptions)) {
    throw {
      code: 'CANTCOMBINE',
      message: 'can\'t combine line and byte counts'
    };
  }

  return newOptions;
};

exports.validateOption = validateOption;
exports.validateOptionValue = validateOptionValue;
