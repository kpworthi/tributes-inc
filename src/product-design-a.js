export default class DesignBio extends React.Component {
  constructor(props){
    super(props);

    this.username = props.username;
    this.dbEntry  = props.dbEntry; // load any pre-saved information
    this.editing  = Object.keys(props.dbEntry).length===0?false:true; // edit mode based on empty object or not
    this.origin   = props.dbEntry.name; // track original name when editing so correct db entry is modified
    this.updateMainState = props.updateMainState;

    this.palette = { 
      "classic": {nav: '#7E4A35', page: '#dbceb0', container: '#cab577', content: '#D4C391'},
      "cool": {nav: '#667292', page: '#F1E3DD', container: '#8D9DB6', content: '#BCCAD6'},
      "warm": {nav: '#B04517', page: '#F2E394', container: '#F2AE72', content: '#F4E1D2'}
    }

    this.fillTextFields = this.fillTextFields.bind(this);
    this.loadPalette    = this.loadPalette.bind(this);
    this.submitHandler  = this.submitHandler.bind(this);
  }

  componentDidMount () {
    this.updateMainState({ dbEntry: {} });

    $('#palette').on("change", ()=>{
      this.loadPalette( $('#palette option:selected')[0].value);
    });

    $( '#save-btn' ).click(this.submitHandler);

    if ( this.editing ) this.fillTextFields(); // if we're editing an existing tribute, fill applicable fields
    else this.loadPalette( 'classic' ); // when not editing, load default palette
  }

  componentWillUnmount () {
    this.loadPalette( 'classic' );
  }

  fillTextFields () {
    let keys = Object.keys(this.dbEntry);
    keys.forEach( (value) => {
      let fieldText = '';
      //split the bio array items back into separate lines
      if( value === 'bio' ) {
        fieldText = this.dbEntry[value].join('\r\n')
      }
      else fieldText = this.dbEntry[value];
      $( `#${value}` ).val( fieldText );
    });
    this.loadPalette( this.dbEntry.palette );
  }

  loadPalette( palette ) {
    $('.navbar').css('background-color', this.palette[palette].nav);
    $('.nav-link').css('border', `1px solid ${this.palette[palette].nav}`)
    $('body').css('background-color', this.palette[palette].page);
    $('#footer').css('background-color', this.palette[palette].page);
    $('.main-area').css('background-color', this.palette[palette].container);
    $('.inset').css('background-color', this.palette[palette].content);
  }

  submitHandler ( event ) {
    event.preventDefault();
    let submit = $('#save-btn')[0];
    let submitStatus = $('#submit-status')[0];

    submit.disabled = true;
    let buttonTimeout = setTimeout(() => {
      submit.disabled = false;
      return submitStatus.textContent = 'An error occurred during submission, please try again.';
    }, 4000);

    let validSubmission = this.formErrorCheck();

    if(validSubmission){
      $( '#submit-status' ).text('Saving...');
      // when editing an existing tribute
      if ( this.editing ) {
        $.ajax({
          "type": "PUT",
          "url": '/api/design',
          "data": $("#design-a-component" ).serialize() + `&origin=${this.origin.replace(' ', '%20')}`,
          "success": (response) => {
            if ( response === 'Tribute successfully updated.' ) {
              setTimeout(() => {
                location.hash = "#account";
              }, 2000);
              clearTimeout(buttonTimeout);
              submit.disabled = true;
              return submitStatus.textContent = response;
            }
            else {
              clearTimeout(buttonTimeout);
              submit.disabled = false;
              return submitStatus.textContent = response;
            }
          },
          "fail": (response) => {
            console.log(' Tribute save HTTP request failed. ');
            submit.disabled = false;
            clearTimeout(buttonTimeout);
            return submitStatus.textContent = 'An error occurred during submission, please try again.';
          }
        });

      }
      // when creating a new tribute
      else {
        $.post( "/api/design", $( "#design-a-component" ).serialize() )
          .done( ( response ) => {
            if ( response === 'Success! Tribute saved.' ) {
              setTimeout(() => {
                location.hash = "#account";
              }, 2000);
              clearTimeout(buttonTimeout);
              submit.disabled = true;
              return submitStatus.textContent = response;
            }
            else {
              clearTimeout(buttonTimeout);
              submit.disabled = false;
              return submitStatus.textContent = response;
            }
          })
          .fail( function ( err ) {
            console.log(' Tribute save HTTP request failed. ');
            submit.disabled = false;
            clearTimeout(buttonTimeout);
            return submitStatus.textContent = 'An error occurred during submission, please try again.';
          });
      }
    }
    else {
      $( '#submit-status' ).text('Please be sure to fill out all required fields!');
      submit.disabled = false;
      clearTimeout(buttonTimeout);
    }
  }

  formErrorCheck () {
    let validation = true;
    //make sure all required fields are filled
    $( ':required' ).each( function () {
      if( $( this ).val() === '' ) {
        $( this ).css('border','2px solid red');
        validation = false;
      }
      else $( this ).css('border', 'none');
    });

    // make sure either both or none of quote/author are filled out
    if ( ( $('#quote').val() && !$('#author').val() ) || ( $( '#author' ).val() && !$( '#quote' ).val() ) ){
      $( '#quote' ).css('border','2px solid red');
      $( '#author' ).css('border','2px solid red');
      validation = false;
    } else {
      $( '#quote' ).css('border','none');
      $( '#author' ).css('border','none');
    }

    return validation;
  }

  render(){

    return(
      <form id="design-a-component" class="mx-3 px-sm-3 px-1 main-area">
        <h1 class="text-center">Build a Biography Tribute</h1>

        <div id="top-block" class="row mx-0 my-2 px-sm-5 py-1 justify-content-center rounded inset">
          <div id="title-area" class="d-flex flex-column justify-content-center col-lg-5">
            <div class="form-group">
              <label for="name">Tributee's Name</label>
              <input id="name" name="name" type="text" class="form-control" placeholder="Name (Required)" required />
            </div><div class="form-group">
              <label for="tagline">Sub-title</label>
              <input id="tagline" name="tagline" type="text" class="form-control" placeholder="Sub-title (Optional)" />
            </div>
          </div>
          <div id="picture-area" class="d-flex flex-column justify-content-center col-lg-5">
            <div class="form-group">
              <label for="img">Image link</label>
              <input id="img" name="img" type="text" class="form-control" placeholder="https://example.com/img.jpg (Required)" required />
            </div><div class="form-group">
              <label for="caption">Caption</label>
              <input id="caption" name="caption" type="text" class="form-control" placeholder="Caption (Required)" required />
            </div>
          </div>

        </div>

        <div id="bottom-block" class="row mx-0 mt-3 justify-content-center rounded inset">
          <div id="text-wrapper" class="col-12 col-lg-10 text-justify">

            <div class="d-flex flex-column align-items-center text-center">
              <div class="form-group w-75">
                <label for="quote">Quote about or from your tributee</label>
                <input id="quote" name="quote" type="text" class="form-control" placeholder="Quote (Optional)" />
              </div><div class="form-group w-50">
                <label for="author">Author of the quote</label>
                <input id="author" name="author" type="text" class="form-control" placeholder="Author (Optional)" />
              </div>
            </div>

            <div class="form-group text-center">
              <label for="palette">Choose a color scheme: </label>
              <select id="palette" class="ml-3" name="palette">
                <option value="classic" selected="true">Tributes Classic</option>
                <option value="cool">Tributes Cool </option>
                <option value="warm">Tributes Warm </option>
              </select>
            </div>

            <div class="form-group">
              <label for="bio">Biography Text</label>
              <textarea id="bio" name="bio" class="form-control" placeholder="Enter the main text of your tribute here (Required)" required />
            </div>

            <div class="form-group">
              <label for="link">External Link</label>
              <input id="link" name="link" type="text" class="form-control" placeholder="Enter a link for more information (Optional)" />
            </div>

            <input type="hidden" id="username" name="username" value={this.username} />
            <input type="hidden" id="type" name="type" value='TemplateA' />

            <button type="submit" id="save-btn" class="btn btn-success">Save Tribute</button>
            <p id="submit-status" class="" />
            <div id="lower-inside-buffer" style={{"min-height": "100px"}}/>
          </div>
        </div>

      </form>
    )
  }
}
