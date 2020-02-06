const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

async function start() {
  console.log("Create your Engineering Team!");
  let teamHTML = "";
  let teamSize;
  await inquirer
    .prompt({
      type: "number",
      message: "How many people are on your Engineering team?",
      name: "numOfTeam"
    })
    .then(data => {
      teamSize = data.numOfTeam + 1;
    });
  if (teamSize === 0) {
    console.log("You can't make a team without team members...");
    return;
  }
  for (i = 1; i < teamSize; i++) {
    let name;
    let id;
    let title;
    let email;
    await inquirer
      .prompt([
        {
          type: "input",
          message: `What is employee (${i})'s name?`,
          name: "name"
        },
        {
          type: "input",
          message: `What is employee (${i})'s id?`,
          name: "id"
        },
        {
          type: "input",
          message: `What is employee (${i})'s email?`,
          name: "email"
        },
        {
          type: "list",
          message: `What employee (${i})'s role?`,
          name: "title",
          choices: ["Engineer", "Intern", "Manager"]
        }
      ])
      .then(data => {
        name = data.name;
        id = data.id;
        title = data.title;
        email = data.email;
      });
    switch (title) {
      case "Manager":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "What is the Manager's office number?",
              name: "officeNo"
            }
          ])
          .then(data => {
            const manager = new Manager(name, id, email, data.officeNo);

            teamMember = fs.readFileSync("templates/manager.html");

            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;

      //INTERN

      case "Intern":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "What school does your Intern attend?",
              name: "school"
            }
          ])
          .then(data => {
            const intern = new Intern(name, id, email, data.school);
            teamMember = fs.readFileSync("templates/intern.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;

      //ENGINEER

      case "Engineer":
        await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your Engineer's GitHub?",
              name: "github"
            }
          ])
          .then(data => {
            const engineer = new Engineer(name, id, email, data.github);
            teamMember = fs.readFileSync("templates/engineer.html");
            teamHTML = teamHTML + "\n" + eval("`" + teamMember + "`");
          });
        break;
    } // switch case end
  } // end of loop

  const mainHTML = fs.readFileSync("templates/main.html");

  teamHTML = eval("`" + mainHTML + "`");

  // write file to new team.html file
  fs.writeFile("output/team.html", teamHTML, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("Meet your team!");
  });
}

start();
