export class DataService {
  private data: string[] = [];
  private workarr: Array<any> = [];
  private lineArray: Array<string> = [];
  private csvContent: string;
  private xmlContent: string;
  private xmlArray: Array<string> = [];

  addData(name: string) {
    this.data = name.split('.').filter(el => el !== '');
    this.workarr.length = 0;
    for (let i of this.data) {
      this.workarr.push(
        i
          .match(/\b(\w+)\b/g)
          .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      );
    }
  }

  // make xml
  getDataXML() {
    this.xmlArray.length = 0;
    for (const sentence of Object.keys(this.workarr)) {
      this.xmlArray.push('<sentence>');
      for (const m of this.workarr[sentence]) {
        this.xmlArray.push('<word>' + m + '</word>');
      }
      this.xmlArray.push('</sentence>');
    }
    return this.xmlContent = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '<text>' + this.xmlArray.join('') + '</text>';

  }

  //  make csv
  getDataCSV() {
    this.lineArray.length = 0;
    for (const m of Object.keys(this.workarr)) {
      const line = this.workarr[m].join(',');
      this.lineArray.push(line);
      this.csvContent = this.lineArray.join('\n');
    }

    return this.csvContent;
  }
}
