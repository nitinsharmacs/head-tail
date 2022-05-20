const isNotOption = (text) => {
  const rule = /^-[a-z]$/;
  return !rule.test(text);
};

const parseOptions = (args) => {
  const options = {};
  for (let index = 0; index < args.length - 1; index += 2) {
    const key = args[index];
    if (isNotOption(key)) {
      return options;
    }
    const value = +args[index + 1];
    options[key] = value;
  }
  return options;
};

exports.parseOptions = parseOptions;
