import { Component, Input } from '@angular/core';
import { DataService } from '../appdata.service';


@Component({
  selector: 'app-file-save-as',
  templateUrl: './file-save-as.component.html',
  styleUrls: ['./file-save-as.component.css'],
  providers: [DataService]
})
export class FileSaveAsComponent {
  @Input() fileContent: any;

  constructor(private dataService: DataService) {}

  saveAsProject() {
    this.writeContents(
      this.sortArrPrepareCsv(this.fileContent), 'File' + '.csv', 'text/plain'
    );

    this.writeContents(
      this.sortArrPrepareXML(this.fileContent), 'File' + '.xml',  'xml/plain'
    );
  }

  writeContents(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  sortArrPrepareXML(a) {

    this.dataService.addData(this.fileContent.trim());

    return this.dataService.getDataXML();
  }

  sortArrPrepareCsv(a) {

    this.dataService.addData(this.fileContent.trim());

    return this.dataService.getDataCSV();
  }
}
