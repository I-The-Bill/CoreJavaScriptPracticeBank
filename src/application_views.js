

function printInABox(x)
{
    
    let out = "+";
    for (let i = 0; i<x.length+2;i++)
    {
        out += "-";
    }
    out += "+\n| ";
    out += x;
    out += " |\n+";
    for (let i = 0; i<x.length+2;i++)
    {
        out += "-";
    }
    out += "+";
    console.log('\x1B[32m' + out + '\x1B[37m');
}

function error(x)
{
    console.log("\n\x1B[31m"+x+"\n\x1B[37m")
}
module.exports = {printInABox, error};