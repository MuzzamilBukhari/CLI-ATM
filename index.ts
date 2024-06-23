#! /usr/bin/env node
import inquirer, { Answers } from "inquirer";

interface AnsType {
  userId: number;
  userPin: number;
  accountType: string;
  transactionType: string;
  amount: number;
}
let answer: AnsType = await inquirer.prompt([
  {
    name: "userId",
    message: "Enter user Id : ",
    type: "number",
  },
  {
    name: "userPin",
    message: "Enter user Pin : ",
    type: "number",
  },
  {
    name: "accountType",
    type: "list",
    message: "Select Account type : ",
    choices: ["Current", "Saving"],
  },
  {
    name: "transactionType",
    type: "list",
    message: "Select Transaction type : ",
    choices: ["Fast Cash", "Withdraw"],
  },
  {
    name: "amount",
    type: "list",
    message: "Select Amount : ",
    choices: ["1000", "2000", "10000", "20000"],
    when(answer) {
      return answer.transactionType === "Fast Cash";
    },
  },
  {
    name: "amount",
    type: "numer",
    message: "Enter Amount : ",
    when(answer) {
      return answer.transactionType === "Withdraw";
    },
  },
]);

if (answer.userId && answer.userPin) {
  let balance = Math.floor(Math.random() * 30000);
  console.log("Your balance before withdraw : " + balance);

  if (balance > answer.amount) {
    balance -= answer.amount;
    console.log("Your remaing account balance is : " + balance);
  } else {
    console.log("You have not enough balance to withdraw!");
  }
} else {
  console.log("Enter a valid value!");
}
