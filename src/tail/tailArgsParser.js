const hasKey = (obj, key) => {
  const keys = Object.keys(obj);
  return keys.includes(key);
};

const isRelativeToBeginning = (optionValue) => {
  return optionValue.startsWith('+');
};

const compileOptions = (options) => {
  if (hasKey(options, '-c')) {
    const optionValue = options['-c'];
    return {
      askedForBytes: true,
      relativeToBeginning: isRelativeToBeginning(optionValue),
      count: Math.abs(+options['-c'])
    };
  }
  const optionValue = options['-n'];
  return {
    askedForBytes: false,
    relativeToBeginning: isRelativeToBeginning(optionValue),
    count: Math.abs(+options['-n'])
  };
};

exports.compileOptions = compileOptions;
