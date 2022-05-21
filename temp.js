

const isCombinedOption = (text) => /^-[a-z][0-9]+$/.test(text);
const isNonCombinedOption = (text) => /^-[a-z]+$/.test(text);
const isNotOption = (text) => {
  return !(isCombinedOption(text) || isNonCombinedOption(text));
};

const validateOption = (option) => {
  const validOptions = ['-n', '-c'];
  const [optionName] = Object.keys(option);
  if (validOptions.includes(optionName)) {
    return option;
  }
  throw { name: 'INVALID_OPTION', message: 'Invalid Option ' + optionName };
};

const createOption = (name, value) => {
  const option = {};
  option[name] = value;
  return option;
};

const separateCombined = (option) => {
  const charRegex = /^-[a-z]+/;
  const numRegex = /\d+/;
  const optionName = option.match(charRegex)[0];
  const optionValue = option.match(numRegex)[0];
  return createOption(optionName, optionValue);
};

const parseOptions = (args) => {
  let options = {};
  let index = 0;
  while (index < args.length) {
    const text = args[index];
    if (isNotOption(text)) {
      return { options, fileNames: args.slice(index) };
    }
    if (isCombinedOption(text)) {
      options = { ...options, ...separateCombined(text) };
      index++;
    } else {
      const optionValue = args[index + 1];
      options = {
        ...options,
        ...createOption(text, optionValue)
      };
      index += 2;
    }
  }
  return { options, fileNames: [] };
};


// const parse = (args) => {
//   while(index < args.length) {
//     if ()
//   }
// }

// -n 1 filename
const parseArgs = (args) => {
  const { options, optionsEntAt } = parseOptions(args);
  const fileNames = args.slice(optionsEntAt);
  return { options, fileNames };
};

// const parse = (args) => {
//   const fileNames = [];
//   const options = {};
//   let index = 0;
//   let optionsDone = false;
//   while (index < args.length) {
//     const text = args[index];
//     if (!optionsDone) {
//       if (isCombinedOption(text)) {
//         const option = separateCombined(text);
//         options[option.name] = option.value;
//         index++;
//         continue;
//       }
//       if (isNonCombinedOption(text)) {
//         const optionValue = args[index + 1];
//         options.push(createOption(text, optionValue));
//         index += 2;
//         continue;
//       }
//     }
//     optionsDone = true;
//     fileNames.push(text);
//     index++;
//   }
//   return { fileNames, options };
// }

