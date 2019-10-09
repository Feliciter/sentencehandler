import { Component } from "@angular/core";
import { DataService } from "./appdata.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [DataService]
})
export class AppComponent {}
