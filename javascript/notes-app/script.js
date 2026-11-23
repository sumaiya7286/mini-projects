let btn = document.querySelector("#btn");
let notesList = document.querySelector(".notes");


let note = JSON.parse(localStorage.getItem("note")) || []

function saveNotes(){
localStorage.setItem("note",JSON.stringify(note));
}

function renderNotes(){
    notesList.innerHTML = "";

    note.forEach((nt, idx)=> {
        let p = document.createElement("p")
        p.className = "input-box";
        p.contentEditable = true;
        p.innerText = nt;

        let img = document.createElement("img");
        img.src = "https://static.vecteezy.com/system/resources/previews/026/222/153/non_2x/delete-icon-symbol-design-illustration-vector.jpg"
        
        p.appendChild(img);
        notesList.appendChild(p);
    });
    
}

btn.addEventListener("click",()=>{

    saveNotes()
    renderNotes()
})

notesList.addEventListener("click", (e)=>{
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove();
        saveNotes();
    }
      });


notesList.addEventListener("input", saveNotes);
