
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
    
    setAmount(x)
    {
        if (Number.isFinite(x) != true && x < 0)
        {
            console.log("Can't update account balance");
        }
        else
        {
            this.amount = x;
        }
    }

    trackTransaction(x)
    {
        for (let i = 0; i < 5; i++)
        {
            this.lastTransactions[i+1] = this.lastTransactions[i];
        }
        this.lastTransactions[0] = x;
    }

    printLast5Transactions()
    {
        for (let i = 0; i < 5; i++)
        {
            if (this.lastTransactions[i] != undefined)
            {
                console.log(i + ". " + this.lastTransactions[i]);
            }
        }
    }
}
module.exports = {Cx};