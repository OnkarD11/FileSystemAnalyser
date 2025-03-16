function helpFn(){
    console.log(`
        List of all commands supported:
            tree "directoryPath"
            main.js organize "directoryPath"
            main.js help
        `)
}
module.exports={
    helpKey: helpFn
}