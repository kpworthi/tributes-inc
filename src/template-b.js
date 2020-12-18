class TemplateB extends React.Component {
  constructor(){
    super();

    this.content = {
      name: "Your Tribute's Name",
      tagline: "A fitting sub-heading for your tribute (optional)",
      img: "../img/test-house.jpg",
      caption: "Your tribute's humble beginnings",
      quote: "Here is a quote about this person and something that made them wonderful (optional)",
      author: "Someone that knew them (also optional)",
      timeline: [ [1981, 'This would be the First event on the list'],
                  [1983, "The Second event of your tribute's timeline would go here and look like this"],
                  [1984, 'A relatively uneventful Third event'],
                  [1986, 'A wholesome Fourth event'],
                  [1990, 'A Fifth event'],
                  [1992, 'Sixth event, this one is a bit long to check how the text fills out the container it is in, as well as how the rest of the bullets react to it. With the larger amount of text, we can get a good feel for how everything around it will react.'],
                  [1994, 'A plain old Seventh event'],
                  [1997, 'The Eighth event'],
                  [1999, 'The unexpected Ninth event'],
                  [2000, 'Some kind of action worth recording for a tenth event'],
                  [2002, 'Occurrences which befit the penultimate date, the Eleventh event'],
                  [2003, 'The Twelfth and final event on the timeline, though not the maximum number of events you could display']
                ],
      link: '#'
    }

    this.renderTimeline = this.renderTimeline.bind(this);
  }

  renderTimeline(){
    let timelineInfo = this.content.timeline;

    return (
      <div id="timeline-area">
        {timelineInfo.map((date, index) => (
            <p key={`date${index+1}`}><b>{date[0]}:</b> {date[1]}</p>
        ))}
      </div>
    )
  }

  render(){
    let Timeline = this.renderTimeline;

    return(
      <div id="template-b-component" class="mx-3 px-sm-3 px-1 main-area row flex-row justify-content-around">

        <div id="left-block" class="d-flex flex-column col-lg-6 rounded inset">
          <div id="title-area" class="text-center">
            <h1 class="">{this.content.name}</h1>
            {this.content.tagline?<p class="h2">{this.content.tagline}</p>:null}
          </div>
          <figure id="img-area" class="text-center">
            <img src={this.content.img} class="rounded border template-a-img"></img>
            <figcaption>{this.content.caption}</figcaption>
          </figure>
        </div>

        <div id="right-block" class="d-flex flex-column col-lg-6 rounded inset">
          {this.content.quote&&this.content.author?(
          <blockquote class="blockquote text-center">
            <p class="mb-0">{this.content.quote}</p>
            <footer class="blockquote-footer">{this.content.author}</footer>
          </blockquote>):null}
          <Timeline/>
          <a href={this.content.link}>  Click here to learn more about [Your Tribute's Name] (Optional)</a>
        </div>

      </div>
    )
  }
}

export default TemplateB;
