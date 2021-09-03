const nodeToHtml = require("node-html-to-image");
/**
 *
 * @param {*} outputPath Path to save image to (.png file)
 * @param {*} content Text to create image from
 */

module.exports = async (outputPath, content) => {
  try {
    await nodeToHtml({
      output: outputPath,
      html: `<html>
                        <head>
                          <style>
                            body {
                              width: 800px;
                              height: 700px;
                              font-size: 16px;
                              background-color: black;
                              color: white;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              line-height: 1.5;
                              text-align: center;
                              padding: 15px 15px;
                            }
                          </style>
                        </head>
                        <body>
                        {{content}}
                        </body>
                      </html>`,
      content: { content },
    });
  } catch (error) {
    console.log(error);
    process.abort;
  }
};
