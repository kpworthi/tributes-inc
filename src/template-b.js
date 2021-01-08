class TemplateB extends React.Component {
  constructor(props){
    super(props);

    this.content = props.dbEntry;
    this.preview = this.content.name==="Your Tribute's Name"?true:false;

    this.palette = { 
      "classic": {nav: '#7E4A35', page: '#dbceb0', container: '#cab577', content: '#D4C391'},
      "cool": {nav: '#667292', page: '#F1E3DD', container: '#8D9DB6', content: '#BCCAD6'},
      "warm": {nav: '#B04517', page: '#F2E394', container: '#F2AE72', content: '#F4E1D2'}
    }

    this.colorPreviewer = this.colorPreviewer.bind(this);
    this.loadPalette    = this.loadPalette.bind(this);
    this.renderTimeline = this.renderTimeline.bind(this);
  }

  componentDidMount () {
    this.loadPalette( this.content.palette );
    if (this.preview)
      $('#color-select').on("change", ()=>{
        this.loadPalette( $('#color-select option:selected')[0].value);
      });
  }

  componentWillUnmount () {
    this.loadPalette( 'classic' );
  }

  loadPalette( palette ) {
    $('.navbar').css('background-color', this.palette[palette].nav);
    $('.nav-link').css('border', `1px solid ${this.palette[palette].nav}`)
    $('body').css('background-color', this.palette[palette].page);
    $('#footer').css('background-color', this.palette[palette].page);
    $('.main-area').css('background-color', this.palette[palette].container);
    $('.inset').css('background-color', this.palette[palette].content);
  }

  colorPreviewer(){

    return (
      <select id="color-select">
        <option value="default" disabled="true" selected="true">Preview a color scheme</option>
        <option value="classic">Tributes Classic</option>
        <option value="cool">Tributes Cool   </option>
        <option value="warm">Tributes Warm </option>
      </select>
    )
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

        <div id="left-block" class="d-flex flex-column col-lg-6 rounded inset text-center">
          <div id="title-area">
            <h1 class="">{this.content.name}</h1>
            {this.content.tagline?<p class="h2">{this.content.tagline}</p>:null}
          </div>
          <figure id="img-area" class="text-center">
            <img src={this.content.img} class="rounded border template-a-img"></img>
          </figure>
          <figcaption>{this.content.caption}</figcaption>
        </div>

        <div id="right-block" class="d-flex flex-column justify-content-between col-lg-6 rounded inset">
          {this.content.quote&&this.content.author?(
          <blockquote class="blockquote mt-3 text-center">
            <p class="mb-0">{this.content.quote}</p>
            <footer class="blockquote-footer">{this.content.author}</footer>
              {this.preview?this.colorPreviewer():null}
          </blockquote>):null}
          <Timeline/>
                      
          {this.content.link?
          <a href={this.content.link}>{`Click here to learn more about ${this.preview?"[Your Tribute's Name] (Optional)":this.content.name}`}</a>:null}
        </div>

      </div>
    )
  }
}

export default TemplateB;
