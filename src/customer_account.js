
class Cx
{
    constructor(inId, inFirstName, inLastName, inPhone, inAmount, inPin)
    {
        this.id = inId;
        this.firstName = inFirstName;
        this.lastName = inLastName;
        this.phone = inPhone;
        this.amount = inAmount;
        this.pin = inPin;
        this.lastTransactions = [];
    }

    getId()
    {
        return this.id;
    }

    getPin()
    {
        return this.pin;
    }

    setPin(x)
    {
        this.pin = x;
    }

    getName()
    {
        return this.firstName + " " + this.lastName;
    }
    
    getBalance()
    {
        return this.amount;
    }

    setAmount(x)
    {
        if (Number.isFinite(x) != true && x < 0)
        {
            console.log("\x1B[31m0 Can't update account balance \x1B[37m");
        }
        else
        {
            this.amount = x;
        }
    }

    withdraw(x)
    {
        if (x > 0 && x <= this.getBalance() )
        {
            let toMinus = parseFloat(x);
            let Current = parseFloat(this.amount);
            let total = Current - toMinus;
            this.amount = total;
            this.trackTransaction("Withdrew: $" + x +". New Balance: $" + this.amount);
        }
        else
        {
            console.log("\x1B[31m This Transaction couldn't be completed \x1B[37m");
        }
    }

    deposit(x)
    {
        if (x > 0)
        {
            let toAdd = parseFloat(x);
            let Current = parseFloat(this.amount);
            let total = toAdd + Current;
            this.amount = total;
            this.trackTransaction("Deposited: $" + x +". New Balance: $" + this.amount);
        }
        else
        {
            console.error('\x1B[31m This Transaction couldn\'t be completed \x1B[37m');
        }
    }


    trackTransaction(x)
    {
        if (this.lastTransactions.length < 5)
        {
            this.lastTransactions.unshift(x);
        }
        else 
        {
            this.lastTransactions.pop
            this.lastTransactions.unshift(x);
        }
    }

    printLast5Transactions()
    {
        if (this.lastTransactions[0] == undefined)
        {
            console.log("\x1B[31mNo Previous Transactions \x1B[37m");
        }
        else
        {
            for (let i = 0; i < 5; i++)
            {
                if (this.lastTransactions[i] != undefined)
                {
                    console.log((i+1) + ". " + this.lastTransactions[i]);
                }
            }
        }
    }

    printTransactions()
    {
        for (let i = 0; i < 5; i++)
        {
           
                console.log((i+1) + ". " + this.lastTransactions[i]);
            
        }
    }
}
module.exports = {Cx};