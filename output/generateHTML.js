const path = require("path");
const fs = require("fs");
const templatesDir = path.resolve(__dirname, "../templates");





const generateMain = html => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "main.html"),
    "utf8"
  );
  return replacePlaceholders(template, "team", html);
};
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};
//module.exports = generateHTML;