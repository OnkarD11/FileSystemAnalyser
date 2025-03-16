function organizeFn(dirpath){
    let destinationPath;
    // console.log("organize command will be executed...");
    // 1)take input directory 
    // 2)create folder organized_files
    // 3)identify categories of all files present in dirpath
    // 4)copy/cut any file to right destination folder.

    // 1)take input path given
    if(dirpath==undefined){
        // console.log("Kindly enter the path");
        destinationPath= path.join(process.cwd(), 'organized_files');
            if(fs.existsSync(destinationPath)==false){
                fs.mkdirSync(destinationPath);
            }
            organizeHelper(process.cwd(), destinationPath)
        // return;
    }else{
        if(fs.existsSync(dirpath)){
            destinationPath= path.join(dirpath, 'organized_files');
            if(fs.existsSync(destinationPath)==false){
                fs.mkdirSync(destinationPath);
            }
            organizeHelper(dirpath, destinationPath)
        }else{
            console.log("Kindly enter the correct path")
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
    // fs.unlinkSync(srcFilePath);//to cut the file

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
module.exports={
    organizekey: organizeFn
}