// optionName(option: String)
const optionName = (option) => {
  const [name] = option.split('-').reverse();
  return name;
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

const assertOptionRequireArg = (option) => {
  const key = optionKey(option);
  const optionValue = option[key];
  if (optionValue === undefined) {
    throw {
      code: 'OPTION_REQUIRES_ARG',
      message: `option requires an argument -- ${optionName(key)}`,
      showUsage: true,
      prefixWithHead: true
    };
  }
};

const validateOptionValue = (option) => {
  const optionsRules = {
    '-n': {
      name: 'line',
      minValue: 1,
      type: 'number'
    },
    '-c': {
      name: 'byte',
      minValue: 1,
    }
  };
  const key = optionKey(option);
  const optionValue = option[key];
  const rule = optionsRules[key];
  assertOptionRequireArg(option);
  if (isNaN(+optionValue) || rule.minValue > +optionValue) {
    throw {
      code: 'ILLEGAL_COUNT',
      message: 'illegal ' + rule.name + ' count -- ' + optionValue,
      prefixWithHead: true
    };
  }
};

const validateOption = (newOptions, prevOptions) => {
  if (isNotValidOption(newOptions)) {
    throw {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- ' + optionName(optionKey(newOptions)),
      showUsage: true,
      prefixWithHead: true
    };
  }

  validateOptionValue(newOptions);

  if (cantBeCombined(newOptions, prevOptions)) {
    throw {
      code: 'CANT_COMBINE',
      message: 'can\'t combine line and byte counts',
      prefixWithHead: true
    };
  }

  return newOptions;
};

exports.validateOption = validateOption;
exports.validateOptionValue = validateOptionValue;
