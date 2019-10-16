export class DataService {
  private data: string[] = [];
  private workarr: Array<any> = [];
  private lineArray: Array<string> = [];
  private csvContent: string;
  private xmlContent: string;
  private xmlArray: Array<string> = [];

  addData(name: string) {
    this.data = name.split(".").filter(el => el !== "");
    this.workarr.length = 0;

    this.data.forEach(item =>
      this.workarr.push(
        item
          .match(/\b(\w+)\b/g)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      )
    );
  }

  //  make XML
  getDataXML() {
    this.xmlArray.length = 0;
    for (const sentence of Object.keys(this.workarr)) {
      this.xmlArray.push("<sentence>");

      this.workarr[sentence].forEach(el => {
        this.xmlArray.push("<word>" + el + "</word>");
      });

      this.xmlArray.push("</sentence>");
    }
  
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+"<text>"+this.xmlArray.join("") +"</text>" );
  }

  //  make csv
  getDataCSV() {
    this.lineArray.length = 0;
    for (const m of Object.keys(this.workarr)) {
      const line = this.workarr[m].join(",");
      this.lineArray.push(line);
      this.csvContent = this.lineArray.join("\n");
    }

    return this.csvContent;
  }
}
