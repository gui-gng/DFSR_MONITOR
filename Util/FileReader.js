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
    let listObjects = [];
    listFiles.forEach(file => {
      listObjects[file] = fs.readFileSync('Data/' + file + ".json"); 
    });
    fs.writeFile("Data/Data.json", JSON.stringify(listObjects), "utf8", function(){
      console.log("Saved: Data.json");
    });
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

      fs.writeFile("Data/" + fileName + ".json", JSON.stringify(listObjects), "utf8", function(){
        console.log("Saved: " + fileName + ".json");
      });
}
