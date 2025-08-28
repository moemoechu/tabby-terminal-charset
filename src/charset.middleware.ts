import { Injector } from "@angular/core";
import iconv from "iconv-lite";
import { SessionMiddleware } from "tabby-terminal";
import { CharsetEngagedTab } from "./api";

export default class CharsetMiddleware extends SessionMiddleware {
  tab: CharsetEngagedTab;

  constructor(injector: Injector, tab: CharsetEngagedTab) {
    super();
    this.tab = tab;
  }

  feedFromSession(data: Buffer): void {
    const { charset } = this.tab.charset;
    // console.log(`session raw ${data.toString()}`, data);
    // console.log(data);
    if (!charset || charset === "utf-8") {
      return super.feedFromSession(data);
    }
    // console.log(`session raw ${data.toString()}`, data);
    const decodedData = Buffer.from(iconv.decode(data, charset));
    // console.log(`session decoded ${decodedData.toString()}`);
    super.feedFromSession(decodedData);
  }

  feedFromTerminal(data: Buffer): void {
    const { charset } = this.tab.charset;
    if (!charset || charset === "utf-8") {
      return super.feedFromTerminal(data);
    }
    // console.log(`term raw input:${data.toString()}`);
    // console.log(data);
    const encodedData = iconv.encode(data.toString(), charset);
    // console.log(`term encoded input:${encodedData.toString()}`, encodedData);
    super.feedFromTerminal(encodedData);
  }

  close(): void {
    super.close();
  }
}
