//take input from user
let inputArray= process.argv.slice(2)
console.log(inputArray)
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help
let command= inputArray[0];
//console.log(command);
switch(command){
    case "tree":
        break;
    case "organize":
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please 🙌 Input Right Command...");
        break;
}
function treeFn(dirpath){
    console.log("Tree command will be executed...")
}

function organizeFn(dirpath){
    console.log("organize command will be executed...");

}
function helpFn(){
    console.log(`
        List of all commands supported:
            tree "directoryPath"
            main.js organize "directoryPath"
            main.js help
        `)
}