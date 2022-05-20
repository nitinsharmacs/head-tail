**TODO:**

- [ ] Implement -n option
- [ ] Implement -c option
- [ ] 0 bytes case should be handled. On shell, it gives error
  
**MAYBE:**

- [ ] Consider change contract of firstNLines and pass content as string
- [ ] Change the test description of firstNLines, change `get` to `give`

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
