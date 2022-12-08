"use strict";
const av = require('./src/application_views.js');
const CxAccount = require('./src/customer_account.js');
const db = require('./src/dollars_bank.js');
const ps = require("prompt-sync");

const prompt = ps();

console.log("\n")
av.printInABox('DollarsBank ATM welcomes you');
var x = true;
let fn = 'System';
let ln = 'Admin'
let aPhone = '1800111999'
let aAmount = 10000;
let aPin = '0000'
let aId = 0;
let adMinAdd = new CxAccount.Cx(aId,fn,ln,aPhone, aAmount ,aPin);
db.addAccount(adMinAdd);
while(x == true)
{

    let initalChoice = prompt("\nWhat would you like to do\n1. Create an account\n2. Login\n0. Exit\n");
    if(initalChoice == 1)
    {
        let firstName = prompt("what is your first name: ");
        let lastName = prompt("what is your last name: ");
        let phone = prompt("what is your 10 digit phone number: ");
        let phoneTest = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        while (phoneTest.test(phone) != true && phone != "exit")
        {
            console.log("\n\x1B[31mPlease enter a valid 10 digit Phone Number or type exit to end account creation\n\x1B[37m");
            phone = prompt("what is your phone number:  ");
            if (phone == 'exit')
            {
                continue;
            }
        }
        let amount = prompt("How much money will you be depositing to open this account: ");
        let amountTest = /^(?:(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
        let isvalidAmount = amountTest.test(amount);
        //console.log(isvalidAmount);
        while (isvalidAmount == false && amount != "exit")
        {
            console.log("\n\x1B[31mPlease enter a valid amount or type exit to end account creation\n\x1B[37m");
            amount = prompt("How much money will you be depositing to open this account: ");
            if (amount == 'exit')
            {
                continue;
            }
            isvalidAmount = amountTest.test(amount)
        }
        /*while (amount < 0)
        {
            console.log("\n\x1B[31mPlease enter a valid amount or type exit to end account creation\n\x1B[37m");
            amount = prompt("How much money will you be depositing to open this account: ");
            if (amount == 'exit')
            {
                continue;
            }
        }*/
        let pin = prompt("Please enter a secure 4 digit pin you will remember: ");
        let pinTest = /^\d{4}$/;
        while (pinTest.test(pin) != true && pin != "exit")
        {
            console.log("\n\x1B[31mPlease enter a valid Pin or type exit to end account creation\n\x1B[37m");
            pin = prompt("Please enter a secure 4 digit pin: ");
            if (pin == 'exit')
            {
                continue;
            }
        }
        if (pin == 'exit' || amount == 'exit' || phone == 'exit')
        {
            console.log("\n\x1B[31mAccount Could not be created\n\x1B[37m");1
            
            continue;
        }
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
            console.log('\n\x1B[31mAccount not found\x1B[37m');
            continue;
        }
        let loginPin = prompt("Please enter your secure pin: ");
        if (accountToLoginInTo.getPin() == loginPin)
        {
            loggedIn = true;
        }
        else
        {
            console.log('\n\x1B[31mYour credentials are incorrect\x1B[37m\n');
            continue;
        }
        av.printInABox("Welcome " + accountToLoginInTo.getName())
        while(loggedIn == true)
        {
            
            let loggedInChoice = prompt("\nWhat would you like to do\n1. Check Balance \n2. Print Last Transactions \n3. Update pin\n4. Withdraw \n5. Deposit\n0. Exit\n");
            if (loggedInChoice == 1)
            {
                console.log("\n");
                console.log("Current Balance: \x1B[36m$" + db.getAccount(loginId).getBalance() + "\x1B[37m");
            }
            else if (loggedInChoice == 2)
            {
                console.log("\n");
                av.printInABox("Previous Transactions");
                db.getAccount(loginId).printLast5Transactions();
            }
            else if (loggedInChoice == 3)
            {
                console.log("\n");
                let changePin = prompt("Please enter your pin to confirm you want to change your pin: ");
                if (changePin == db.getAccount(loginId).getPin())
                {
                    let newPin = prompt("What would you like your new pin to be: ");
                    db.getAccount(loginId).setPin(newPin);
                }
                else
                {
                    console.log("\x1B[31mInccorrect Pin \x1B[37m")
                }
            }
            else if (loggedInChoice == 4)
            {
                console.log("\n");
                let toWithdraw = prompt("How much would you like to withdraw: ");
                db.getAccount(loginId).withdraw(toWithdraw);
            }
            else if (loggedInChoice == 5)
            {
                console.log("\n");
                let toDeposit = prompt("How much would you like to Deposit: ");
                db.getAccount(loginId).deposit(toDeposit);
            }
            else if (loggedInChoice == 6 && loginId == 0)
            {
                console.log("\n");
                console.log(db.getAllAccounts());
            }
            else if (loggedInChoice == 0)
            {
                console.log("\n");
                loggedIn = false;
                av.printInABox("Logged Out");
            }
            else
            {
                console.log("\n");
                console.log("\x1B[31mPlease enter a valid choice\x1B[37m")
            }
            
        }
    }
    else if (initalChoice == 0)
    {
        av.printInABox('Thank you for banking with DollarsBank');
        x = false;
    }
    else
    {
        console.log("\x1B[31mPlease enter a valid selection\x1B[37m");
    }
    //rl.close();
}