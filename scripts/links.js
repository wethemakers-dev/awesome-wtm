const vfile = require("to-vfile");
const report = require("vfile-reporter");
const remark = require("remark");
const lint = require("remark-lint");
const deadUrls = require("remark-lint-no-dead-urls");
const duplicateUrls = require("remark-lint-are-links-valid-duplicate");
const validateLinks = require("remark-validate-links");

remark()
  .use(lint)
  .use(deadUrls)
  .use(duplicateUrls)
  .use(validateLinks)
  .process(vfile.readSync("./README.md"), (err, file) => {
    const reportData = report(err || file);
    if (!reportData.includes("no issues found")) {
      throw reportData;
    }
  });
