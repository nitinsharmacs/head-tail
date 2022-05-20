# HEAD

## Name
  **head** - display first lines of a file

## Synopsis

`head [-n count | -c bytes] [file ...]`

## Description

This filter displays the first count lines or bytes of each of the specified files. If count is omitted it defaults to 10.

## Options

### `-n count`

Display `count` number of lines from the file.

### `-c bytes`
Display only `bytes` from the file.

> Only one of the options `-n` or `-c` will work. If provided both, succeeding option will be taken.