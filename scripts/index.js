window.addEventListener("click",(event)=>{
  if(event.target.getAttribute("class").includes("nav-link")){
    for(let button of Array.from(document.getElementsByClassName("nav-link"))){
      button.style.borderColor="#7e4a35"
      button.style.color = "white"
    }
    event.target.style.borderColor="white";
    event.target.style.color="#ccc"
  }
});