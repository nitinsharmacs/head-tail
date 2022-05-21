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
const validateOption = (newOptions, prevOptions) => {
  const validOptions = ['-n', '-c'];
  const [optionKey] = Object.keys(newOptions);
  if (cantBeCombined(newOptions, prevOptions)) {
    throw {
      name: 'CANTCOMBINE',
      message: 'can\'t combine line and byte counts'
    };
  }

  if (validOptions.includes(optionKey)) {
    return newOptions;
  }

  throw {
    name: 'ILLEGAL_OPTION',
    message: 'illegal option -- ' + optionName(optionKey)
  };
};

const optionKey = (option) => {
  const [key] = Object.keys(option);
  return key;
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
      name: 'ILLEGALCOUNT',
      message: 'illegal ' + rule.name + ' count -- ' + optionValue
    };
  }
};

exports.validateOption = validateOption;
exports.validateOptionValue = validateOptionValue;
