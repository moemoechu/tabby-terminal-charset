import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ConfigService, TranslateService } from "tabby-core";
import { ElectronHostWindow, ElectronService } from "tabby-electron";
import { debounce } from "utils-decorators";

/** @hidden */
@Component({
  template: "",
  styles: [``],
})
export class CharsetSettingsTabComponent {
  alertMessage: string;
  alertType: "info" | "success" | "danger";
  constructor(
    public config: ConfigService,
    private electron: ElectronService,
    private hostWindow: ElectronHostWindow,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  async pickFile(): Promise<void> {
    const paths = (
      await this.electron.dialog.showOpenDialog(this.hostWindow.getWindow(), {
        filters: [
          { name: "Profile", extensions: ["thp", "json"] },
          { name: "All Files", extensions: ["*"] },
        ],
        properties: ["openFile", "showHiddenFiles"],
      })
    ).filePaths;
    if (paths[0]) {
      this.config.store.backgroundPlugin.backgroundPath = paths[0];
      this.apply();
    }
  }

  // 为了防止频繁保存可能导致的潜在的风险（其实没有），加入了防抖
  @debounce(500)
  apply() {
    this.config.save();
    // this.background.applyCss();
    this.toastr.info(this.translate.instant("Charset applied!"));
  }
}
