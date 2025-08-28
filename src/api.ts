import { BaseTerminalTabComponent } from "tabby-terminal";

export interface CharsetEngagedTab extends BaseTerminalTabComponent<any> {
  charset?: {
    name: string;
    charset: string;
  };
}

export type Charset = { name: string; charset: string };
export type CharsetGroup = { groupName: string; charset: Charset[] };

// 理论上iconv-lite支持的字符集都能支持喵，就是要手工编写配置太麻烦了喵，先只支持一部分好了喵
export const SupportedCharsetGroups: CharsetGroup[] = [
  {
    groupName: "Common",
    charset: [
      {
        name: "UTF-8",
        charset: "utf-8",
      },
      {
        name: "GBK",
        charset: "gbk",
      },
      {
        name: "GB2312",
        charset: "gb2312", //cp936
      },
      {
        name: "GB18030",
        charset: "gb18030",
      },
      {
        name: "Big5",
        charset: "big5",
      },
      {
        name: "Shift_JIS",
        charset: "shiftjis", //cp932
      },
      {
        name: "EUC-JP",
        charset: "eucjp",
      },
      {
        name: "EUC-KR",
        charset: "euckr", //cp949
      },
    ],
  },
  {
    groupName: "ISO",
    charset: Array.from({ length: 15 }, (_, index) => {
      const charsetNumber = index + 1;
      return {
        name: `ISO-8859-${charsetNumber}`,
        charset: `ISO-8859-${charsetNumber}`,
      };
    }),
  },
  {
    groupName: "Win",
    charset: [874, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258].map((value) => {
      return {
        name: `cp${value}`,
        charset: `cp${value}`,
      };
    }),
  },
  {
    groupName: "IBM",
    charset: [
      437, 720, 737, 775, 808, 850, 852, 855, 856, 857, 858, 860, 861, 862, 863, 864, 865, 866, 869,
      922, 1046, 1124, 1125, 1129, 1133, 1161, 1162, 1163,
    ].map((value) => {
      return {
        name: `cp${value}`,
        charset: `cp${value}`,
      };
    }),
  },
  {
    groupName: "Mac",
    charset: [
      "maccroatian",
      "maccyrillic",
      "macgreek",
      "maciceland",
      "macroman",
      "macromania",
      "macthai",
      "macturkish",
      "macukraine",
      "maccenteuro",
      "macintosh",
    ].map((value) => {
      return {
        name: `${value}`,
        charset: `${value}`,
      };
    }),
  },
  {
    groupName: "KOI8",
    charset: ["koi8-r", "koi8-u", "koi8-ru", "koi8-t"].map((value) => {
      return {
        name: `${value}`,
        charset: `${value}`,
      };
    }),
  },
  {
    groupName: "Misc",
    charset: [
      "armscii8",
      "rk1048",
      "tcvn",
      "georgianacademy",
      "georgianps",
      "pt154",
      "viscii",
      "iso646cn",
      "iso646jp",
      "hproman8",
      "tis620",
    ].map((value) => {
      return {
        name: `${value}`,
        charset: `${value}`,
      };
    }),
  },
];

export const SupportedCharset = SupportedCharsetGroups.reduce((acc, current) => {
  return acc.concat(current.charset);
}, [] as Charset[]);

export type CharsetPluginConfig = {
  enable: boolean;
  perSessionCharsetEnabled: boolean;
  perSessionCharsetMap: { sessionId: string; charset: Charset }[];
};
