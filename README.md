# Tabby Terminal Charset Plugin

Change Tabby terminal output charset from utf-8 to gbk, gb2312 etc...

## Features

- [x] Support GBK charset.
- [x] Support GB2312 charset.
- [x] Support output.
- [x] Support input.
- [x] Tested on Windows and MacOS with Tabby version 1.0.205.

## Usage

### Install

To install, use Tabby builtin plugin manager.

### Change Charset

To change terminal charset, use the context menu from tab header.

### Tips

This plugin is only for emergency use, the output may become mess if there are multiply charset mixed in one page.

### Known Issue

When use charset other then UTF-8, but the file you view is using UTF-8, the terminal is also display as well.
That is mean the terminal will both support UTF-8 and selected charset.

## Screenshot

### UTF-8

![Context UTF8](screenshots/context_utf8.png)
![Terminal UTF8](screenshots/terminal_utf8.png)

### GBK

![Context GBK](screenshots/context_gbk.png)
![Terminal GBK](screenshots/terminal_gbk.png)

## Changelog

- 1.0.2: Support input & output.
- 1.0.0: Initial version.
