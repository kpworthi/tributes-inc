class DesignBio extends React.Component {
  constructor(props){
    super(props);

    this.content = props.dbEntry;
    this.preview = true;

    this.palette = { 
      "classic": {nav: '#7E4A35', page: '#dbceb0', container: '#cab577', content: '#D4C391'},
      "cool": {nav: '#667292', page: '#F1E3DD', container: '#8D9DB6', content: '#BCCAD6'},
      "warm": {nav: '#B04517', page: '#F2E394', container: '#F2AE72', content: '#F4E1D2'}
    }

    this.loadPalette    = this.loadPalette.bind(this);
    this.renderBio      = this.renderBio.bind(this);
  }

  componentDidMount () {
    this.loadPalette( 'classic' );
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
    $('.main-area').css('background-color', this.palette[palette].container);
    $('.inset').css('background-color', this.palette[palette].content);
  }

  renderBio(){
    console.log(this.content);
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

    return(
      <form id="design-a-component" class="mx-3 px-sm-3 px-1 main-area">

        <div id="top-block" class="row mx-0 my-2 px-sm-5 py-1 justify-content-center rounded inset">
          <div id="title-area" class="d-flex flex-column justify-content-center col-lg-5">
            <div class="form-group">
              <label for="name">Tributee's Name</label>
              <input id="name" type="text" class="form-control" placeholder="Name (Required)" required />
            </div><div class="form-group">
              <label for="sub-title">Sub-title</label>
              <input id="sub-title" type="text" class="form-control" placeholder="Sub-title (Optional)" />
            </div>
          </div>
          <div id="picture-area" class="d-flex flex-column justify-content-center col-lg-5">
            <div class="form-group">
              <label for="img">Image link</label>
              <input id="img" type="text" class="form-control" placeholder="https://example.com/img.jpg (Required)" required />
            </div><div class="form-group">
              <label for="caption">Caption</label>
              <input id="caption" type="text" class="form-control" placeholder="Caption (Required)" required />
            </div>
          </div>

        </div>

        <div id="bottom-block" class="row mx-0 mt-3 justify-content-center rounded inset">
          <div id="text-wrapper" class="col-12 col-lg-10 text-justify">

            <div class="d-flex flex-column align-items-center text-center">
              <div class="form-group w-75">
                <label for="quote">Quote about or from your tributee</label>
                <input id="quote" type="text" class="form-control" placeholder="Quote (Optional)" />
              </div><div class="form-group w-50">
                <label for="author">Author of the quote</label>
                <input id="author" type="text" class="form-control" placeholder="Author (Optional)" />
              </div>
            </div>

            <div class="form-group text-center">
              <label for="color-select">Choose a color scheme: </label>
              <select id="color-select">
                <option value="classic" selected="true">Tributes Classic</option>
                <option value="cool">Tributes Cool </option>
                <option value="warm">Tributes Warm </option>
              </select>
            </div>

            <div class="form-group">
              <label for="bio">Biography Text</label>
              <textarea id="bio" class="form-control" placeholder="Enter the main text of your tribute here (Required)"/>
            </div>

            <div class="form-group">
              <label for="link">External Link</label>
              <input id="link" type="text" class="form-control" placeholder="Enter a link for more information (Optional)"/>
            </div>
          </div>
        </div>

        <div id="lower-buffer" style={{"height": "100px"}}/>

      </form>
    )
  }
}

export default DesignBio;
