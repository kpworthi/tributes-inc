class Home extends React.Component {
  constructor(){
    super();
    
  }
  render(){
    return(

      <div id="home-component" class="mx-3 px-sm-4 main-area">
        <h1 class="text-center" id="title">Welcome to Tributes Inc.!</h1>
        <h2 class="text-center" id="subTitle">We're glad you're here</h2>
        <div class="sub-divider"></div>

        <div id="about-section" class="row my-3">
          <article id="about-text" class="ml-3 mr-3 mr-sm-1 col-md">
            <h3>What we do</h3>
            At Tributes Inc., we want to help the world see the people that are important to you the same way that you see them. We want to help celebrate the greatness
            that can be found in those all around us. People don't need to be famous to be celebrated; even the smallest deed can bring out the greatest respect from the
            right person. We recognize that there is no one defining thing that makes somebody worth of remembrance or special recognition, which is why we leave it to
            you. Do you have someone in mind that you'd like call attention to? Is there someone in your life that made a lasting impression? We would love to help you
            get started on showing this impression to others, or even just help you make a special place for them in your own home. Our range of <a href="#products" class="body-link">
            services and products</a> should be just what you need to get started.
          </article>
          <figure class="col-md text-center">
            <img src="../img/about-sm.jpg" class="img-fluid"
              alt="A large teddybear and a small teddybear on a bench" />
            <figcaption>Who can we help you celebrate?</figcaption>
          </figure>
        </div>

        <div class="sub-divider"></div>

        <div id="history-section" class="row my-3">
          <figure class="col-md text-center">
            <img src="../img/history-sm.jpg" class="img-fluid"
              alt="Tributes Inc. office" />
            <figcaption>The Tributes Inc. office</figcaption>
          </figure>
          <article id="history-text" class="mr-3 ml-3 ml-sm-1 col-md">
            <h3>Who we are</h3>
            In 2000, a group of friends wanted to do their part in bringing people together by making it easier to recognize one another for achievements both big and small.
            They believed that as long as a positive impact was felt by even just one person, even if that impact was unknown to this person, that there was no reason that 
            this achievement should not be remembered. Tributes Inc. was born out of this goal, and 2020 has served as its 20th anniversary. We're still going strong, and 
            are eager to continue helping people show respect for those important to them, and even to help celebrate those that don't necessarily need the extra spotlight.
            We are always here to help, so please just let us know what we can do for you!
          </article>
        </div>
      </div>
    )
  }
}

export default Home;
