import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ISubjectMetaSmall } from "../../contracts";
import { BackendService } from "../../services";

declare const $: any;

@Component({
  selector: "regor-root",
  templateUrl: "./root.component.html",
  styleUrls: ["./root.component.scss"]
})
export class RootComponent implements OnInit, AfterViewInit {
  public availableSubjects: ISubjectMetaSmall[];

  constructor(private backendService: BackendService) {}

  public ngOnInit() {
    this.backendService.getSubjectList().subscribe((availableSubjects) => {
      this.availableSubjects = availableSubjects;
    });
  }

  public ngAfterViewInit(): void {
   /* $("nav.navbar-fixed-top").autoHidingNavbar();*/
    ((d, s, id) => {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src =
        "//connect.facebook.net/hu_HU/all.js#xfbml=1&appId=203857432984342";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
}
