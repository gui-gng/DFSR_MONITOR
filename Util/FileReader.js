const fs = require('fs');

let listFiles = [];

module.exports = {
/**
 * List the files and store into the object listFiles
 */
  listFiles: function(){
    listFiles = [];
    fs.readdirSync("../").forEach(file => {
      let fileExtension = file.substr(file.length - 4);
      if(fileExtension == ".txt"){
        listFiles.push(file);
      }
    });
  },
  /**
   * Read the files listed into listFiles and store in json.
   * Consolidate the files into Data.json
   */
  readAllfiles: function(){
<<<<<<< HEAD
    for(var i = 0; i < listFiles.length; i++){
      readFile(listFiles[i]);
    }

    let listObjects = [];
    console.log("Consolidating files");
    for(var i = 0; i < listFiles.length; i++){
      let file = listFiles[i];
      let rawdata = fs.readFileSync('Data/' + file + ".json", 'utf8');
      let json = JSON.parse(rawdata);
      listObjects.push({fileName: file, fileContent: json}); 
    }
    console.log("Saving files");
    
    fs.writeFileSync("Data/Data.json", JSON.stringify(listObjects), "utf8");
    console.log("Files updated");
    
=======
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
>>>>>>> origin/master
  }
}


function readFile(fileName){
      console.log("Start file: " + fileName);
      console.log("Reading...");
      let contents = fs.readFileSync('../' + fileName, 'utf8').toString();
      
      console.log("Spliting...");
      //Split the content line by line
      let lineByLine = contents.split("\n"); 
      let listObjects = [];
      let currentObj = {
        "Date":"",
        "Content":"",
        "Status":""
      };
      console.log("Separating...");
      //Separate the values from the array into the objects
      for(var i = 0; i < lineByLine.length; i++){
        var line = lineByLine[i].replace("\r", "").trim();

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
