const fs = require('fs');

//let fileName = "USERDATA-TSV-BNE";
let listFiles = [];

module.exports = {

  listFiles: function(){
    listFiles = [];
    fs.readdirSync("../").forEach(file => {

      let fileExtension = file.substr(file.length - 4);
      if(fileExtension == ".txt"){
        listFiles.push(file);
      }
    });
  },
  readAllfiles: function(){
    listFiles.forEach(file => readFile(file));
  },
  consolidateFiles: function(){
    let listObjects = [];
    for(var i = 0; i < listFiles.length; i++){
      let file = listFiles[i];
      let raw = fs.readFileSync('Data/' + file + ".json");
      let json = JSON.parse(raw);
      listObjects.push({fileName: file, content: json}); 
    }
    let objSave = JSON.stringify(listObjects);
    fs.writeFileSync("Data/Data.json", objSave, "utf8");
  }

}


function readFile(fileName){
  let contents = fs.readFileSync('../' + fileName, 'utf8');    
      const lineByLine = contents.split("\n"); 
      let listObjects = [];
      let currentObj = {
        "Date":"",
        "Content":"",
        "Status":""
      };

      for(var i = 0; i < lineByLine.length; i++){
        var line = lineByLine[i];
    
        
        if(line.substring(0, 9) == "Operation"){
          currentObj.Status = line;
          listObjects.push(currentObj);
          i++;
          currentObj = {
            "Date":"",
            "Content":"",
            "Status":""
          };
        }
        else
        {
          if(currentObj.Date == ""){
            currentObj.Date = line;
          }
          else
          {
            currentObj.Content = currentObj.Content + line + "\n";
          }
        }
      }
      fs.writeFileSync("Data/" + fileName + ".json", JSON.stringify(listObjects), "utf8");
}
