"use strict";
const av = require('./src/application_views.js');
const CxAccount = require('./src/customer_account.js');
const db = require('./src/dollars_bank.js');
const ps = require("prompt-sync");

const prompt = ps();

console.log("\n")
av.printInABox('DollarsBank ATM welcomes you');
var x = true;
while(x == true)
{
    let initalChoice = prompt("\nWhat would you like to do\n1. Create an account\n2. Login\n0. Exit\n");
    if(initalChoice == 1)
    {
        let firstName = prompt("what is your first name: ");
        let lastName = prompt("what is your last name: ");
        let phone = prompt("what us your phone number: ");
        let amount = prompt("How much money will you be depositing to open this account: ");
        while (Number.isFinite(amount) != true && amount < 0 && amount != "exit")
        {
            console.log("Please enter a valid amount or type exit to end account creation");
            amount = prompt("How much money will you be depositing to open this account: ");
            if (amount == 'exit')
            {
                continue;
            }
        }
        let pin = prompt("Please enter a secure pin you will remember: ");
        let id = db.firstAvalibleId();
        let toAdd = new CxAccount.Cx(id,firstName,lastName,phone, amount ,pin);
        db.addAccount(toAdd);
        console.log("\n\nPlease write down your Id number ass you will need it to login.");
        av.printInABox('Your account Id number is ' + toAdd.getId());
    }
    else if (initalChoice == 2)
    {
        let loggedIn = false;
        let loginId = prompt("\nPlease enter your customer account id: ");
        let accountToLoginInTo = db.getAccount(loginId);
        if (accountToLoginInTo == undefined)
        {
            console.log('\nAccount not found');
            continue;
        }
        let loginPin = prompt("Please enter your secure pin: ");
        if (accountToLoginInTo.getPin() == loginPin)
        {
            loggedIn = true;
        }
        else
        {
            console.log('\nYour credentials are incorrect\n');
            continue;
        }
        av.printInABox("Welcome " + accountToLoginInTo.getName())
        while(loggedIn == true)
        {
            
            let loggedInChoice = prompt("\nWhat would you like to do\n1. Check Balance \n2. Print Last Transactions \n3. Update pin\n4. Withdraw \n5. Deposit\n0. Exit\n");
            if (loggedInChoice == 1)
            {

            }
            else if (loggedInChoice == 2)
            {
                db.getAccount(loginId).printLast5Transactions();
            }
            else if (loggedInChoice == 3)
            {
                let changePin = prompt("Please enter your pin to confirm you want to change your pin: ");
                if (changePin == db.getAccount(loginId).getPin)
                {
                    let newPin = prompt("What would you like your new pin to be: ");
                    db.getAccount(loginId).setPin(newPin);
                }
            }
            else if (loggedInChoice == 4)
            {
                
            }
            else if (loggedInChoice == 5)
            {
                
            }
            /*else if (loggedInChoice == 0)
            {
                
            }*/
            else if (loggedInChoice == 0)
            {
                loggedIn = false;
            }
            else
            {
                console.log("Please enter a valid choice")
            }
            
        }
    }
    else if (initalChoice == 0)
    {
        av.printInABox('Thank you for baking with DollarsBank');
        x = false;
    }
    else
    {
        console.log("Please enter a valid selection");
    }
    //rl.close();
}