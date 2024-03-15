import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import TabbyCoreModule, {
  ConfigProvider,
  ConfigService,
  TabContextMenuItemProvider,
} from "tabby-core";
import { SettingsTabProvider } from "tabby-settings";
import { TerminalDecorator } from "tabby-terminal";

import { CharsetConfigProvider } from "./config.provider";
import { CharsetDecorator } from "./charset.decorator";
import { CharsetService } from "./charset.service";
import { CharsetSettingsTabComponent } from "./settingsTab.component";
import { CharsetSettingsTabProvider } from "./settingsTabProvider";
import { CharsetContextMenu } from "./context-menu.provider";

@NgModule({
  imports: [CommonModule, FormsModule, TabbyCoreModule, NgbModule],
  providers: [
    // { provide: ConfigProvider, useClass: CharsetConfigProvider, multi: true },
    // { provide: SettingsTabProvider, useClass: CharsetSettingsTabProvider, multi: true },
    { provide: TerminalDecorator, useClass: CharsetDecorator, multi: true },
    { provide: TabContextMenuItemProvider, useClass: CharsetContextMenu, multi: true },
  ],
  // entryComponents: [CharsetSettingsTabComponent],
  // declarations: [CharsetSettingsTabComponent],
})
export default class CharsetModule {
  constructor(public config: ConfigService, private charset: CharsetService) {}
}
