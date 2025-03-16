function treeFn(dirpath){
    console.log("Tree command will be executed...")
    let destinationPath;
    // console.log("organize command will be executed...");
    // 1)take input directory 
    // 2)create folder organized_files
    // 3)identify categories of all files present in dirpath
    // 4)copy/cut any file to right destination folder.

    // 1)take input path given
    if(dirpath==undefined){
        // console.log("Kindly enter the path");
        treeHelper(process.cwd(),"");
        // return;
    }else{
        if(fs.existsSync(dirpath)){
            treeHelper(dirpath,"");
        }else{
            console.log("kindly enter the correct path")
        }
        
    }

}
function treeHelper(dirpath, indent){
    //isFile or folder
    let isFile= fs.lstatSync(dirpath).isFile();
    if(isFile){
        let filename= path.basename(dirpath)
        console.log(indent, "├──",filename);
    }else{
        let dirname= path.basename(dirpath);
        console.log(indent,"└──",dirname);
        let children=fs.readdirSync(dirpath);
        for(let i=0; i<children.length; i++){
            let childpath= path.join(dirpath,children[i]);
            treeHelper(childpath,indent+"\t");
        }
    }
}
module.exports={
    treeKey: treeFn
}