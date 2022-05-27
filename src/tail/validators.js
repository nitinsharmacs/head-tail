const objectKeys = Object.keys;

// optionName(option: String)
const optionName = (option) => {
  const [name] = option.split('-').reverse();
  return name;
};

const intersection = function (list1, list2) {
  return list1.reduce(function (intersects, element) {
    if (list2.indexOf(element) < 0) {
      return intersects;
    }
    intersects.push(element);
    return intersects;
  }, []);
};

const cantBeCombined = (newOption, prevOptions) => {
  const nonCombinatives = ['-n', '-c'];
  const newOptionsNames = objectKeys({ ...newOption, ...prevOptions });
  return intersection(
    nonCombinatives,
    newOptionsNames
  ).length === nonCombinatives.length;
};

const optionKey = (option) => {
  const [key] = objectKeys(option);
  return key;
};

const isNotValidOption = (option) => {
  const validOptions = ['-n', '-c', '-q', '-r'];
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

const hasKey = (obj, key) => {
  const keys = objectKeys(obj);
  return keys.includes(key);
};

const assertOptionRepetition = (newOption, prevOptions) => {
  const newOptionKey = optionKey(newOption);
  if (hasKey(prevOptions, newOptionKey)) {
    throw {
      code: 'REPEATING_OPTION',
      message: '',
      prefix: false,
      showUsage: true
    };
  }
};

const isStandAloneOption = (optionKey) => {
  return ['-q', '-r'].includes(optionKey);
};

const validateOptionValue = (option) => {
  const key = optionKey(option);

  if (isStandAloneOption(key)) {
    return;
  }

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

const assertValidOption = (option) => {
  if (isNotValidOption(option)) {
    throw {
      code: 'ILLEGAL_OPTION',
      message: 'illegal option -- ' + optionName(optionKey(option)),
      showUsage: true,
      prefix: true
    };
  }
};

const validateOption = (newOption, prevOptions) => {
  assertValidOption(newOption);
  assertOptionRepetition(newOption, prevOptions);
  validateOptionValue(newOption);

  if (cantBeCombined(newOption, prevOptions)) {
    throw {
      code: 'CANT_COMBINE',
      message: '',
      prefix: false,
      showUsage: true
    };
  }

  return newOption;
};

exports.validateOption = validateOption;
exports.validateOptionValue = validateOptionValue;
