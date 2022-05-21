**TODO:**

- [ ] Implemented headFiles function
- [ ] Make it working for multilpe files
- [ ] Handle no file provided
- [ ] Validate parsed arguments
  - [ ] Validate files
  - [x] Validate options
  - [x] Validate options values
- [ ] Implement `head --help`
- [ ] Update sidenote from README.md of providing both options
- [ ] Handled ` head -nc0 head.js`
- [ ] Rework on parser with loop using Jayanth's method of iterator using closer
- [ ] Test all the helping functions

**MAYBE:**

- [ ] Consider change contract of firstNLines and pass content as string
- [ ] Change the test description of firstNLines, change `get` to `give`
- [ ] Remove magic number lint errors from firstNLines and nBytesFrom
- [ ] Correct `nByesFrom` in contracts.md


**PROBLEMS:**

- [ ] `head file` gives 1 line if the file is empty

**DONE:**

- [x] Option validator is not working of invalid option value
  - [x] Value should be a number
- [x] Validate throw object should have code
- [x] Compile parsed options to domain options
  - [x] Only one option is given at a time
- [x] Provide argument to `headMain`
  - [x] Options separated by their values
  - [x] Options not separated by their values
- [x] Implement -n option from cli
- [x] Implement -c option from cli
- [x] 0 bytes case should be handled. On shell, it gives error
- [x] Set default option in parseArgs
- [x] Move validators to separate lib
- [x] Compile options while parsing
- [x] Test validateOption
- [x] Implement parseArgs
  - [x] Parse files when options with separated values given alongwith
  - [x] Parse files when options with their valus given alongwith
  - [x] Parse options separated with their values
  - [x] Parse options with their values
- [x] Provide args to `head.js`
- [x] Implement `head file` for single file
- [x] Implement `head` working for getting bytes from the content
- [x] Consider giving option as object to head()
- [x] Add a function contracts file
- [x] Pass `lines` first and then `count` to firstNLines
- [x] Implement nBytesFrom function
- [x] Test stringUtils.js functions
  - [x] splitLines
  - [x] joinLines
- [x] Move splitLines, joinLines and SEPARATOR to new lib
- [x] Implement splitLines function
- [x] Implement joinLines function
- [x] Implement head function
- [x] Implement firstNLines function
- [x] Create directory structure
