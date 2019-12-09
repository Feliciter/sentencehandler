export class DataService {
  private workarr: Array<any> = [];
  private lineArray: Array<string> = [];
  private csvContent: string;
  private xmlArray: Array<string> = [];

  addData(name: string) {
    this.workarr.length = 0;
    this.workarr = name
      .split(".")
      .filter(el => el !== "")
      .map(item =>
        item
          .match(/\b(\w+)\b/g)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      );
  }

  //  make XML
  getDataXML() {
    this.xmlArray = [];
    for (const sentence of Object.keys(this.workarr)) {
      this.xmlArray.push("<sentence>");

      this.workarr[sentence].forEach(el => {
        this.xmlArray.push("<word>" + el + "</word>");
      });

      this.xmlArray.push("</sentence>");
    }

    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      "<text>" +
      this.xmlArray.join("") +
      "</text>"
    );
  }

  //  make csv
  getDataCSV() {
    this.lineArray=[];

    Object.keys(this.workarr).forEach(el => {
      const line = this.workarr[el].join(",");
      this.lineArray.push(line);
      this.csvContent = this.lineArray.join("\n");
    });

    return this.csvContent;
  }
}
