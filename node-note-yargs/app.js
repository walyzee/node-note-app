const fs = require ('fs');
const path = require('path');
const fileName = path.basename(__filename);
const argv = require('yargs').help(false).argv
const title = argv.title || argv.t;
const body = argv.body || argv.b;

const List = ()=>{
  fs.readFile('list.json','utf8', function (error, data){
    if (error)
      throw error; 
    let list = JSON.parse(data);
    console.log("--- Printing", list.length, "Note(s) ---\n");
    list.forEach(note => {
      console.log(" title :", note.title, "\n body :", note.body,"\n");
    });
  })
}
const Read=(title)=>{
    if(title){
        fs.readFile('list.json','utf8', function (error, data){
            if (error)
                throw error; 
            let list = JSON.parse(data);
            list.filter(note =>  note.title===title &&
            console.log("Note Found\n---\ntitle: ",note.title,'\n'+"body: ",note.body));
        })
    } else {
        console.log(fileName +' '+argv._[0])
        console.log('\nOption :\n --help         Show help\n --title, -t    Title of the note\n\n Missing required argument : title')
    };
}

const Remove =(title)=>{
    if(title){
        fs.readFile('list.json','utf8', function (error, data){
            if (error)
                throw error; 
        let list = JSON.parse(data);
        let newList = list.filter(note=>note.title!==title);
        fs.writeFileSync("list.json", JSON.stringify(newList));
        console.log("Note(s) was Removed")
        })
    }else {
        console.log(fileName +' '+argv._[0])
        console.log('\nOption :\n --help         Show help\n --title, -t    Title of the note\n\n Missing required argument : title')
    };

}
const Add = (title,body)=>{
    if(title && body){
        fs.readFile('list.json','utf8', function (error, data){
            if (error)
                throw error; 
            let list = JSON.parse(data);
            let newNote={title, body }
            let newList = [...list,newNote];
            fs.writeFileSync("list.json",JSON.stringify(newList));
            console.log("Note created\n---\ntitle: ",newNote.title,'\n'+"body: ",newNote.body)
        })
    }else {
        console.log(fileName +' '+argv._[0])
        console.log('\nOption :\n --help         Show help\n --title, -t    Title of the note\n --body, -b     Body of the note\n\n Missing required arguments : title, body')
    };
}

const help = ()=>{
    console.log('\n\nTo ADD a new note :\n--\n'+
    'node app.js add -t newtiltle -b newbody'+
    '\n or\n'+
    'node app.js add --title newtitle --body newbody\n\n\n'+ 

    'To LIST all notes :\n--\n'+
    'node app.js list\n\n\n'+

    'To REMOVE a note :\n--\n'+
    'node app.js remove -t title'+
    '\n or\n'+
    'node app.js remove --title title\n\n\n'+ 

    'To READ a specific note :\n--\n'+
    'node app.js read -t title'+
    '\n or\n'+
    'node app.js read --title title\n\n'
    )
}

switch(argv._[0]){
    case 'list':
        return List();
    case 'read' : 
        return Read(title); 
    case 'remove':
        return Remove(title);
    case 'add':
        return Add(title,body);
    case 'help':
        return help();
    default:
        return help();
}