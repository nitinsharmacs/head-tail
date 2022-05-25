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

const hasKey = (obj, key) => {
  const keys = Object.keys(obj);
  return keys.includes(key);
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
      prefix: true
    };
  }
};

const assertOptionRepition = (newOption, prevOptions) => {
  const newOptionName = optionKey(newOption);
  if (hasKey(prevOptions, newOptionName)) {
    throw {
      code: 'REPEATING_OPTION',
      message: '',
      prefix: false,
      showUsage: true
    };
  }
};

const validateOptionValue = (option) => {
  const key = optionKey(option);
  const optionValue = option[key];
  assertOptionRequireArg(option);
  if (isNaN(+optionValue)) {
    throw {
      code: 'ILLEGAL_OFFSET',
      message: 'illegal offset -- ' + optionValue,
      prefix: true
    };
  }
};

const validateOption = (newOptions, prevOptions) => {
  if (isNotValidOption(newOptions)) {
    throw {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- ' + optionName(optionKey(newOptions)),
      showUsage: true,
      prefix: true
    };
  }
  assertOptionRepition(newOptions, prevOptions);
  validateOptionValue(newOptions);

  if (cantBeCombined(newOptions, prevOptions)) {
    throw {
      code: 'CANT_COMBINE',
      message: '',
      prefix: false,
      showUsage: true
    };
  }

  return newOptions;
};

exports.validateOption = validateOption;
exports.validateOptionValue = validateOptionValue;
