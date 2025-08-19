import { Injectable } from "@angular/core";
import {
  ConfigService,
  LogService,
  MenuItemOptions,
  TabContextMenuItemProvider,
  TranslateService,
} from "tabby-core";
import { BaseTerminalTabComponent, UTF8SplitterMiddleware } from "tabby-terminal";
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
        // checked: tab.charset === value.charset,
        click: () => {
          if (value.charset !== "utf-8") {
            const stack = (tab.session.middleware as any).stack as any[];
            // console.log((tab.session.middleware as any).stack);
            const utf8SplitterMiddleware = stack.find(
              (value) => value instanceof UTF8SplitterMiddleware
            );
            if (utf8SplitterMiddleware) {
              tab.session.middleware.remove(utf8SplitterMiddleware);
            }
            // console.log((tab.session.middleware as any).stack);
          } else {
            const stack = (tab.session.middleware as any).stack as any[];
            // console.log((tab.session.middleware as any).stack);
            const utf8SplitterMiddleware = stack.find(
              (value) => value instanceof UTF8SplitterMiddleware
            );
            if (!utf8SplitterMiddleware) {
              tab.session.middleware.push(new UTF8SplitterMiddleware());
            }

            // console.log((tab.session.middleware as any).stack);
          }
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
    // const menu =
    return [
      {
        label: this.translate.instant("Charset") + ` (${tab.charset.name})`,
        type: "submenu",
        submenu,
      },
    ];
  }
}
