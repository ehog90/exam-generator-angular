import { Component, OnInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'regor-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  public toggleSidebar() {
    $("#sidebar").addClass("active");
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
    $("#logo").addClass("d-none");
  }

  public async ngOnInit() {
    const _this = this;
    // TODO: Refactor
    $("#dismiss, .overlay, ul.components>li>a").on("click", function() {
      $("#sidebar").removeClass("active");
      $(".overlay").removeClass("active");
      $("#logo").removeClass("d-none");
    });
  }
}
