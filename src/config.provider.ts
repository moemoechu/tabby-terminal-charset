import { ConfigProvider } from "tabby-core";

export type CharsetPluginConfig = {};

/** @hidden */
export class CharsetConfigProvider extends ConfigProvider {
  defaults: { charsetPlugin: any } = {
    charsetPlugin: {},
  };
}
