import { Injectable } from "@angular/core";
import {
  ConfigService,
  LogService,
  MenuItemOptions,
  TabContextMenuItemProvider,
  TranslateService,
} from "tabby-core";
import {
  BaseTerminalTabComponent,
  SessionMiddleware,
  UTF8SplitterMiddleware,
} from "tabby-terminal";
import { CharsetEngagedTab, SupportedCharsetGroups } from "./api";

@Injectable()
export class CharsetContextMenu extends TabContextMenuItemProvider {
  weight = 1;
  charset: string;

  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService
  ) {
    super();
  }

  async getItems(tab: CharsetEngagedTab): Promise<MenuItemOptions[]> {
    if (!(tab instanceof BaseTerminalTabComponent)) {
      return [];
    }
    // console.log(tab);
    const groups = SupportedCharsetGroups;
    const submenu = [];
    for (const group of groups) {
      const { groupName, charset } = group;
      const groupCharset = charset.map((value) => ({
        type: "normal",
        label: this.translate.instant(value.name),
        click: () => {
          // 使用一种不那么优雅的方式在字符集不是UTF-8的时候把Tabby的UTF-8边界插件拿掉喵，这也是没办法的喵，不拿掉Tabby会吃字符喵，不要怪咱喵
          const stack = (tab.session.middleware as any).stack as SessionMiddleware[];
          // console.log((tab.session.middleware as any).stack);
          const utf8SplitterMiddleware = stack.find(
            (value) => value instanceof UTF8SplitterMiddleware
          );
          if (value.charset !== "utf-8" && utf8SplitterMiddleware) {
            tab.session.middleware.remove(utf8SplitterMiddleware);
          } else if (value.charset === "utf-8" && !utf8SplitterMiddleware) {
            tab.session.middleware.push(new UTF8SplitterMiddleware());
          }
          // console.log((tab.session.middleware as any).stack);
          tab.charset = value;
        },
      }));
      const submenuGroup = {
        label: this.translate.instant(groupName),
        type: "submenu",
        submenu: groupCharset,
      };

      submenu.push(submenuGroup);
    }
    return [
      {
        label: this.translate.instant("Charset") + ` (${tab.charset.name})`,
        type: "submenu",
        submenu,
      },
    ];
  }
}
