import iconv from "iconv-lite";
import { Logger } from "tabby-core";
import { BaseTerminalTabComponent, SessionMiddleware } from "tabby-terminal";
import { CharsetPluginConfig } from "./config.provider";
import { Injector } from "@angular/core";
import { CharsetEngagedTab } from "./api";
import { inspect } from "util";
import isValidUTF8 from "utf-8-validate";

function isUTF8Character(char: Buffer) {
  // // Convert the character to a buffer
  // const buffer = Buffer.from(char, "utf8");
  // console.log(buffer);
  // // Check if the buffer is valid UTF-8
  // const result = Buffer.compare(Buffer.from(buffer.toString("utf8")), buffer);
  // console.log(result);
  // return result === 0;
  const result = isValidUTF8(char);
  // console.log(char.toString());
  // console.log(`result:${result}`);
  return result;
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
    // console.log(`session raw ${data.toString()}`, data);
    const decodedDataString = iconv.decode(data, charset);
    // console.log(inspect(decodedDataString));
    const decodedData = Buffer.from(decodedDataString);
    // console.log(`session decoded ${decodedData.toString()}`);
    // console.log(decodedData);
    super.feedFromSession(decodedData);
  }

  feedFromTerminal(data: Buffer): void {
    // return super.feedFromTerminal(data);
    const { charset } = this.tab.charset;
    if (!charset || charset === "utf-8") {
      return super.feedFromTerminal(data);
    }
    // console.log(`term raw input:${data.toString()}`);
    const encodedData = iconv.encode(data.toString(), charset);
    // const encodedData = Buffer.from(encodedDataString);
    // console.log(`term encoded input:${encodedData.toString()}`, encodedData);
    super.feedFromTerminal(encodedData);
  }

  close(): void {
    super.close();
  }
}
