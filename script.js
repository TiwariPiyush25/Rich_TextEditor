const formatDoc = (cmd, value = false) =>{
    if(value){
        document.execCommand(cmd,false,value);
    }
    else{
        document.execCommand(cmd);
    }
}

const handleaddLink = () =>{
    const url = prompt("Enter the URL");
    formatDoc("createlink",url)
}

let content = document.getElementById('content')
content.addEventListener('mouseenter',()=>{
    let anchors = content.querySelectorAll('a');
    console.log(anchors)

    anchors.forEach((anchor) => {
        anchor.addEventListener('mouseenter' , (e) => {
            anchor.setAttribute("target","_blank");
            content.setAttribute("contentEditable","false");
        });

        anchor.addEventListener('mouseleave' , (e) => {
            content.setAttribute("contentEditable","true");
        });
    });
});

let fileName = document.getElementById('fileName');

const handleFileExport = (value) => {
    if(value ==="new"){
        content.innerHTML = "";
        fileName.value = "Untitled";
    }

    if(value === "pdf"){
        html2pdf(content).save(fileName.value);
    }

    if(value === 'txt'){
        const extractedText = content.innerText;
        const blob = new Blob([extractedText]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName.value + ".txt";
        a.click();
    }
}

let active = false;
let showCode = document.getElementById("show-code");

showCode.addEventListener("click" , () => {
    active = !active;
    showCode.dataset.active = active;

    if(active){
        content.textContent = content.innerHTML;
        content.setAttribute("contenteditable","false");
    }
    else {
        content.innerHTML = content.textContent;
        content.setAttribute("contenteditable","true");
    }
})