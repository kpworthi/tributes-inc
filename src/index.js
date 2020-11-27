import Footer from './footer';
import Header from './header';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      viewing: "Intro"
    };
    
  }
  
  render() {
    return (
      <main id="main" class="container-fluid">
        <Header />
        <div id="mainBlock" class="mx-3 mb-4">
          <h1 class="" id="title">Welcome to Tributes Inc.!</h1>
          <h2 class="" id="subTitle">We're glad you're here</h2>
        </div>
        <Footer />
      </main>
      
    )
  }
}

ReactDOM.render(<Main />, document.querySelector("body"));

/*
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
*/
