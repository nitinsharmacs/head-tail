const objectKeys = Object.keys;

// optionName(option: String), option = '-n'
const optionName = (option) => {
  const [name] = option.split('-').reverse();
  return name;
};

const optionKey = (option) => {
  const [key] = objectKeys(option);
  return key;
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
  assertOptionRequireArg(option);

  const key = optionKey(option);
  const optionValue = option[key];
  const rule = optionsRules[key];
  if (isNaN(+optionValue) || rule.minValue > +optionValue) {
    throw {
      code: 'ILLEGAL_COUNT',
      message: `illegal ${rule.name} count -- ${optionValue}`,
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
  validateOptionValue(newOption);

  if (cantBeCombined(newOption, prevOptions)) {
    throw {
      code: 'CANT_COMBINE',
      message: 'can\'t combine line and byte counts',
      prefix: true
    };
  }
  return newOption;
};

exports.validateOption = validateOption;
exports.validateOptionValue = validateOptionValue;
