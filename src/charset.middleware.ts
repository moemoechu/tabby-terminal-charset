import iconv from "iconv-lite";
import { Logger } from "tabby-core";
import { BaseTerminalTabComponent, SessionMiddleware } from "tabby-terminal";
import { CharsetPluginConfig } from "./config.provider";
import { Injector } from "@angular/core";
import { CharsetEngagedTab } from "./api";
import { inspect } from "util";

function isUTF8Character(char) {
  // Convert the character to a buffer
  const buffer = Buffer.from(char, "utf8");

  // Check if the buffer is valid UTF-8
  return Buffer.compare(Buffer.from(buffer.toString("utf8")), buffer) === 0;
}

export default class CharsetMiddleware extends SessionMiddleware {
  tab: CharsetEngagedTab;

  constructor(injector: Injector, tab: CharsetEngagedTab) {
    super();
    this.tab = tab;
  }

  feedFromSession(data: Buffer): void {
    // const dataString = data.toString();
    const { charset } = this.tab.charset;
    if (!charset || charset === "utf-8" || isUTF8Character(data)) {
      return super.feedFromSession(data);
    }
    const decodedDataString = iconv.decode(data, charset);
    // console.log(inspect(decodedDataString));
    const decodedData = Buffer.from(decodedDataString);
    // console.log(decodedData);
    super.feedFromSession(decodedData);
  }

  feedFromTerminal(data: Buffer): void {
    // return super.feedFromTerminal(data);
    const { charset } = this.tab.charset;
    if (!charset || charset === "utf-8") {
      return super.feedFromTerminal(data);
    }

    const encodedDataString = iconv.encode(data.toString(), charset);
    const encodedData = Buffer.from(encodedDataString);
    super.feedFromTerminal(encodedData);
  }

  close(): void {
    super.close();
  }
}
