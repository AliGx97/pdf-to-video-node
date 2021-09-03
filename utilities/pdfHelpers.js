let PDF = require("pdfinfo");
const pdf = require("pdf-to-text");
module.exports = class PdfHelper {
  /**
   * To know how many pages the provided pdf has
   * @param {*} pdfPath path of the pdf file
   * @returns  number of pages (integer)
   */
  static getLength = (pdfPath) => {
    return new Promise((resolve, reject) => {
      PDF(pdfPath).info((err, meta) => {
        if (err) reject(err);
        resolve(meta.pages);
      });
    });
  };

  /**
   * converts a pdf given pages to text (if only one page is needed to be converted to text, from and to should be equal to that page)
   * @param {*} pdfFilePath a path to the pdf file
   * @param {*} from  starting page
   * @param {*} to  last page (included)
   * @returns
   */
  static convertPageToText = (pdfFilePath, from, to) => {
    return new Promise((resolve, reject) => {
      pdf.pdfToText(pdfFilePath, { from, to }, (err, data) => {
        if (err) reject(err);
        data = data.replace(/(^\s*)|(\s*$)/gi, "");
        data = data.replace(/[ ]{2,}/gi, " ");
        data = data.replace(/(\n{2,})/g, ".\n");
        resolve(data);
      });
    });
  };
};
