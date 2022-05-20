**TODO:**

- [ ] Compile parsed options to domain options
  - [x] Only one option is given at a time
  - [ ] both options are given at a time
- [ ] Provide argument to `headMain`
  - [x] Options separated by their values
  - [ ] Options not separated by their values
- [ ] Implement parseArgs
  - [x] Parse files when options with separated values given alongwith
  - [] Parse files when options with their valus given alongwith
  - [x] Parse options separated with their values
  - [ ] Parse options with their values
- [ ] Validate parsed arguments
  - [ ] Validate files
  - [ ] Validate options
- [ ] Implement -n option from cli
- [ ] Implement -c option from cli
- [ ] 0 bytes case should be handled. On shell, it gives error
- [ ] Implement `head --help`
- [ ] Update sidenote from README.md of providing both options
  
**MAYBE:**

- [ ] Consider change contract of firstNLines and pass content as string
- [ ] Change the test description of firstNLines, change `get` to `give`
- [ ] Remove magic number lint errors from firstNLines and nBytesFrom
- [ ] Correct `nByesFrom` in contracts.md


**PROBLEMS:**

- [ ] `head file` gives 1 line if the file is empty

**DONE:**
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
