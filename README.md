# Tabby Terminal Charset Plugin

Add a tab context menu to switch charset in Tabby terminal like gbk, shift_jis, euc-kr etc...

## Features

- [x] Support GBK/GB2312/GB18030/Big5/Shift_JIS/EUC-JP/EUC-KR charset.
- [x] Support ISO charset (ISO-8859-1 - ISO-8859-16).
- [x] Support Windows codepage (cp874, cp1250 - cp1258).
- [x] Support IBM codepage (437, 720, 737, 775, 808, 850, 852, 855-858, 860-866, 869, 922, 1046, 1124, 1125, 1129, 1133, 1161-1163).
- [x] Support KOI8 codepage (koi8-r, koi8-u, koi8-ru, koi8-t).
- [x] Support Mac codepage (maccroatian, maccyrillic, macgreek, maciceland, macroman, macromania, macthai, macturkish, macukraine, maccenteuro, macintosh).
- [x] Support Miscellaneous codepage (armscii8, rk1048, tcvn, georgianacademy, georgianps, pt154, viscii, iso646cn, iso646jp, hproman8, tis620).

## Usage

### Install

To install, use Tabby builtin plugin manager.

### Change Charset

To change terminal charset, use the context menu from tab header.

Current charset will show on context menu.

### Known Issue

#### Cursor issue

Cursor is abnormal when navigate between wide characters

#### Delete issue

When delete wide characters, terminal may only delete 1byte of character, so you must delete multiple times. This also happened in editor like vi/vim.

#### Chaos

The terminal output my dive into BIG CHAOS when there are multiply charset mixed in one page.

This plugin is design for **EMERGENCY USE**. you'd better edit file other then UTF-8 outside terminal, the plugin is not guarantee actual content write in your file.

## Screenshot

### Context Menu

![Context Menu](screenshots/context-menu.png)

### Test case

![Test case](screenshots/tests.png)

## Plan

- [x] Persist charset settings in config
- [ ] Settings UI for more advanced config(maybe not needed?)
- [ ] Setting: input always UTF-8(maybe not needed?)
- [ ] Setting: output always UTF-8(maybe not needed?)
- [ ] Setting: input & output different charset(maybe not needed)
- [ ] Setting: debug options

## Changelog

- 2.0.0: Support persist session charset settings in config.
- 1.1.0: Support more charset and group menu items.
- 1.0.2: Support input & output.
- 1.0.0: Initial version.
