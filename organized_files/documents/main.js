//take input from user
let fs= require('fs');
let path= require('path');
let os= require('os');
let inputArray= process.argv.slice(2)
console.log(inputArray)
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex','js'
    ],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help
let command= inputArray[0];
//console.log(command);
switch(command){
    case "tree":
        break;
    case "organize":
        organizeFn(inputArray[1]);
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
    let destinationPath;
    // console.log("organize command will be executed...");
    // 1)take input directory 
    // 2)create folder organized_files
    // 3)identify categories of all files present in dirpath
    // 4)copy/cut any file to right destination folder.

    // 1)take input path given
    if(dirpath==undefined){
        console.log("Kindly enter the path");
        return;
    }else{
        if(fs.existsSync(dirpath)){
            destinationPath= path.join(dirpath, 'organized_files');
            if(fs.existsSync(destinationPath)==false){
                fs.mkdirSync(destinationPath);
            }
            organizeHelper(dirpath, destinationPath)
        }
        
    }

}
function organizeHelper(src, dest){
    let childNames= fs.readdirSync(src);
    console.log(childNames);
    for(let i=0; i<childNames.length; i++){
        let childAddress= path.join(src, childNames[i]);
        let isFile= fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category=getCategory(childNames[i]);
            // console.log("Category of "+childNames[i] +category);
            sendFiles(childAddress,dest, category);
            
        }
    }


}
function sendFiles(srcFilePath,dest,category){
    let categoryPath= path.join(dest, category);
    let isExist= fs.existsSync(categoryPath);
    if(isExist==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName= path.basename(srcFilePath);
    let destFilePath= path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);

}
function getCategory(name){
    let extension= path.extname(name);
    extension= extension.slice(1);
    for(let type in types){
        let cTypeArray= types[type];
        for(let i=0; i<cTypeArray.length; i++){
            if(cTypeArray[i]==extension)return type;
        }
    }
    return 'others';


}




















function helpFn(){
    console.log(`
        List of all commands supported:
            tree "directoryPath"
            main.js organize "directoryPath"
            main.js help
        `)
}