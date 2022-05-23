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

> Only one of the options `-n` or `-c` will work. If provided both, will give error;

---
---

# TAIL

## Name
  **tail** -- display the last part of a file

## Synopsis

`tail [-c # | -n #] [file ...]`

## Description

The display begins at a byte, line or 512-byte block location in the input. Numbers having a leading plus ('+') sign are relative to the beginning of the input, for example, -c +2'' starts the display at the second byte of the input.  Numbers having a leading minus ('-') sign or no explicit sign are relative to the end of the input, for example, '-n 2' displays the last two lines of the input.  The default starting location is '-n 10', or the last 10 lines of the input.

## Options

### `-c number`

The location is number bytes.

### `-n number`

The location is number lines.

## Exit status

The tail utility exits 0 on success, and >0 if an error occurs.
