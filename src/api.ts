import { SplitTabComponent } from "tabby-core";
import { BaseTerminalTabComponent } from "tabby-terminal";

export interface CharsetEngagedTab extends BaseTerminalTabComponent<any> {
  charset: string;
}

export const SupportedCharset = [
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
    charset: "gb2312",
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
    charset: "Shift_JIS",
  },
]
  .concat(
    Array.from({ length: 15 }, (_, index) => {
      const charsetNumber = index + 1;
      return {
        name: `ISO-8859-${charsetNumber}`,
        charset: `ISO-8859-${charsetNumber}`,
      };
    })
  )
  .concat(
    [874, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258].map((value) => {
      return {
        name: `cp${value}`,
        charset: `cp${value}`,
      };
    })
  )
  .concat(
    [
      437, 720, 737, 775, 808, 850, 852, 855, 856, 857, 858, 858, 860, 861, 862, 863, 864, 865, 866,
      869, 922, 1046, 1124, 1125, 1129, 1133, 1161, 1162, 1163,
    ].map((value) => {
      return {
        name: `cp${value}`,
        charset: `cp${value}`,
      };
    })
  );
