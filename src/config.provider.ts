import { ConfigProvider } from "tabby-core";
import { CharsetPluginConfig } from "./api";

/** @hidden */
export class CharsetConfigProvider extends ConfigProvider {
  defaults: { charsetPlugin: CharsetPluginConfig } = {
    charsetPlugin: { enable: true, perSessionCharsetEnabled: true, perSessionCharsetMap: [] },
  };
}
