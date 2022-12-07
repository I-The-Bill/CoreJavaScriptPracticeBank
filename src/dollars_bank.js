const Cx = require('./customer_account.js')

const CxAccounts = [];


function getAccount(id)
{
   return CxAccounts.find(function(x) {return x.id == id});
}

function getAllAccounts()
{
    return CxAccounts;
}

function firstAvalibleId()
{
    return CxAccounts.length;
}

function addAccount(x)
{
    CxAccounts.push(x);
}

module.exports = {getAccount, getAllAccounts,firstAvalibleId,addAccount};