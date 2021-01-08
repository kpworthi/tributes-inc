class TemplateA extends React.Component {
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
    this.renderBio      = this.renderBio.bind(this);
  }

  componentDidMount () {
    this.loadPalette( this.content.palette );
    if (this.preview){
      $('#color-select').on("change", ()=>{
        this.loadPalette( $('#color-select option:selected')[0].value);
      });
      $('#info-link').click((event)=>{event.preventDefault(); event.stopPropagation()});
    }
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

  renderBio(){
    let bioText = this.content.bio;
    return (
      <div id="bio-text">
        {bioText.map((para, index) => (
            <p key={`para${index+1}`}>{para}</p>
        ))}
      </div>
    )
  }

  render(){
    let Bio = this.renderBio;

    return(
      <div id="template-a-component" class="mx-3 px-sm-3 px-1 main-area">

        <div id="top-block" class="row mx-0 my-2 px-sm-5 py-1 justify-content-center rounded inset">
          <div id="title-area" class="d-flex flex-column justify-content-center col-lg-5 text-center">
            <h1>{this.content.name}</h1>
            {this.content.tagline?<p class="h2">{this.content.tagline}</p>:null}
          </div>
          <figure id="picture-area" class="d-flex flex-column justify-content-center col-lg-5">
            <img src={this.content.img} class="rounded border template-a-img"></img>
            <figcaption class="text-center">{this.content.caption}</figcaption>
          </figure>

        </div>

        <div id="bottom-block" class="row mx-0 mt-3 justify-content-center rounded inset">
          <div id="text-wrapper" class="col-12 col-lg-10 text-justify">

            {(this.content.quote&&this.content.author)?(
            <blockquote class="blockquote text-center">
              <p class="mb-0">{this.content.quote}</p>
              <footer class="blockquote-footer">{this.content.author}</footer>
              {this.preview?this.colorPreviewer():null}
            </blockquote>):null}

            <Bio />
            
            {this.content.link?
            <a id="info-link" href={this.content.link}>{`Click here to learn more about ${this.preview?"[Your Tribute's Name] (Optional)":this.content.name}`}</a>:null}
          </div>
        </div>

        <div id="lower-buffer" style={{"height": "100px"}}/>

      </div>
    )
  }
}

export default TemplateA;
