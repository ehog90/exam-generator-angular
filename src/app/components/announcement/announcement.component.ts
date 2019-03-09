import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { IRibbonAnnouncement } from "../../contracts";
import {
  announcementsNamespace,
  versionKey,
  versionNamespace
} from "../../preference-keys-namespaces";
import {
  AnnouncementService,
  DeviceService,
  PersistenceService
} from "../../services";

@Component({
  selector: "regor-announcement",
  templateUrl: "./announcement.component.html",
  styleUrls: ["./announcement.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AnnouncementComponent implements AfterViewInit {
  private static VERSION = 24;
  public announcements: IRibbonAnnouncement[] = [];
  @ViewChild("changelogModal") public changelogModal: ModalDirective;
  public modalText: string;

  constructor(
    private announcementService: AnnouncementService,
    private localStorageService: PersistenceService,
    public deviceService: DeviceService
  ) {}

  public dismiss(announcement: IRibbonAnnouncement) {
    this.localStorageService.setBoolean(
      announcementsNamespace,
      `${announcement.id}_dismissed`,
      true
    );
    announcement.dismissed = true;
  }

  public async ngAfterViewInit() {
    const versionStored: number = Number(
      this.localStorageService.getString(versionKey, versionNamespace)
    );
    if (versionStored === 0 || versionStored < AnnouncementComponent.VERSION) {
      this.modalText = await this.announcementService
        .getChangelog()
        .toPromise();
      this.changelogModal.show();
      this.localStorageService.setString(
        versionNamespace,
        versionKey,
        `${AnnouncementComponent.VERSION}`
      );
    }
    this.announcements = await this.announcementService
      .getAnnouncements()
      .toPromise();
    this.announcements.forEach((announcement) => {
      if (
        this.localStorageService.getBoolean(
          announcementsNamespace,
          `${announcement.id}_dismissed`
        )
      ) {
        announcement.dismissed = true;
      }
    });
  }
}
