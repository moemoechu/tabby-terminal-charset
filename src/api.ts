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
];
