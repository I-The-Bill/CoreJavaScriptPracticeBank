const Cx = require('./customer_account.js')

const CxAccounts = [];
let accountIds = parseInt(0);

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
    accountIds = accountIds + 1;
    return accountIds;
}

function addAccount(x)
{
    CxAccounts.push(x);
}

module.exports = {getAccount, getAllAccounts,firstAvalibleId,addAccount};