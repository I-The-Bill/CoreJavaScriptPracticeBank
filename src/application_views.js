

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
    out = '%c'+out;
    console.log(out,'color: #bada55');
}

function printValue(x)
{
   // let 
}
//export default printInABox;
module.exports = {printInABox};