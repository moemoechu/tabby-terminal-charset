import iconv from "iconv-lite";
import { Logger } from "tabby-core";
import { BaseTerminalTabComponent, SessionMiddleware } from "tabby-terminal";
import { CharsetPluginConfig } from "./configProvider";

export default class CharsetMiddleware extends SessionMiddleware {
  tab: BaseTerminalTabComponent<any>;
  config: CharsetPluginConfig;
  logger: Logger;
  toast: Function;

  constructor(
    tab: BaseTerminalTabComponent<any>,
    config: CharsetPluginConfig,
    logger?: Logger,
    toast?: Function
  ) {
    super();
    this.tab = tab;
    this.config = config;
    this.logger = logger;
    this.toast = toast;
  }

  feedFromSession(data: Buffer): void {
    // const dataString = data.toString();
    const charset = (this.tab.parent as any)._charset;
    if (!charset || charset === "utf-8") {
      return super.feedFromSession(data);
    }
    const decodedDataString = iconv.decode(data, charset);
    const decodedData = Buffer.from(decodedDataString);
    super.feedFromSession(decodedData);
  }

  close(): void {
    super.close();
  }
}
