class DesignTimeline extends React.Component {
  constructor(props){
    super(props);

    this.username = props.username;

    this.palette = { 
      "classic": {nav: '#7E4A35', page: '#dbceb0', container: '#cab577', content: '#D4C391'},
      "cool": {nav: '#667292', page: '#F1E3DD', container: '#8D9DB6', content: '#BCCAD6'},
      "warm": {nav: '#B04517', page: '#F2E394', container: '#F2AE72', content: '#F4E1D2'}
    }

    this.loadPalette    = this.loadPalette.bind(this);
    this.submitHandler  = this.submitHandler.bind(this);
  }

  componentDidMount () {
    this.loadPalette( 'classic' );

    $('#palette').on("change", ()=>{
      this.loadPalette( $('#palette option:selected')[0].value);
    });

    $( '#save-btn' ).click(this.submitHandler);
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

  loadTimelineFields () {
    let fieldList = ['','','','','','','','','','','','','','',''];
    return fieldList.map((field, index) => {
      let elementId = `${index+1}`;
      let placeholder = `Enter an event ${index>2?'(Optional)':'(Required)'}`;

      return(
        <div class="form-row">
          <div class="form-group col-2">
            <label for={`year${elementId}`}>Year {elementId}</label>
            <input type="text" id={`year${elementId}`} name={`year${elementId}`} class="form-control timeline" required={index<3?true:null} placeholder="Year" />
          </div>
          <div class="form-group col-9">
            <label for={`event${elementId}`}>Event {elementId}</label>
            <input type="text" id={`event${elementId}`} name={`event${elementId}`} class="form-control timeline" required={index<3?true:null} placeholder={placeholder} />
          </div>
        </div>
      )
    });
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

    let validSubmission = true;

    for ( let i=1; i<16; i++) {
      let yearObj    = $( `#year${i}` ),
          eventObj   = $( `#event${i}` ),
          yearValue  = $( `#year${i}` ).val(),
          eventValue = $( `#event${i}` ).val();
      // make sure year and event fields are filled out as pairs
      if (( !yearValue || !eventValue ) && yearValue !== eventValue ){
        if ( !yearValue ) yearObj.css('border', '2px solid red');
        else eventObj.css('border', '2px solid red');
        validSubmission = false;
      }
      // also check that years are numbers only
      else if( !yearValue.match(/^\d+$/) && yearValue !== '' ){
        yearObj.css('border', '2px solid red');
        validSubmission = false;
      }
      // clear any field highlighting otherwise
      else {
        yearObj.css('border', 'none');
        eventObj.css('border', 'none');
      }
    }

    // make sure all require fields are filled
    $( ':required' ).each( function () {
      if( $( this ).val() === '' ) {
        $( this ).css('border','2px solid red');
        validSubmission = false;
      }
      else $( this ).css('border', 'none');
    });

    if (validSubmission) {
      $( '#submit-status' ).text('Saving...');
      $.post( "/api/design", $( "#design-b-component" ).serialize() )
        .done( ( response ) => {
          if ( response === 'Success! Tribute saved.' ) {
            setTimeout(() => {
              $( '#account-nav' ).click();
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
    else {
      $( '#submit-status' ).text('Please be sure to fill out all required fields properly!');
      submit.disabled = false;
      clearTimeout(buttonTimeout);
    }
  }

  render(){

    return(
      <form id="design-b-component" class="mx-3 px-sm-3 px-1 main-area row flex-row justify-content-around">
        
        <div id="left-block" class="d-flex flex-column col-lg-6 justify-content-center rounded inset text-center">
          <h1 class="text-center">Build a Timeline Tribute</h1>
          <div id="title-area">
            <div class="form-group">
              <label for="name">Tributee's Name</label>
              <input id="name" name="name" type="text" class="form-control" placeholder="Name (Required)" required />
            </div><div class="form-group">
              <label for="tagline">Sub-title</label>
              <input id="tagline" name="tagline" type="text" class="form-control" placeholder="Sub-title (Optional)" />
            </div>
          </div>
          <div id="img-area" class="text-center">
            <div class="form-group">
              <label for="img">Image link</label>
              <input id="img" name="img" type="text" class="form-control" placeholder="https://example.com/img.jpg (Required)" required />
            </div><div class="form-group">
              <label for="caption">Caption</label>
              <input id="caption" name="caption" type="text" class="form-control" placeholder="Caption (Required)" required />
            </div>
          </div>
        </div>

        <div id="right-block" class="d-flex flex-column col-lg-6 rounded inset">
          <div class="form-group w-75">
            <label for="quote">Quote about or from your tributee</label>
            <input id="quote" name="quote" type="text" class="form-control" placeholder="Quote (Optional)" />
          </div><div class="form-group w-50">
            <label for="author">Author of the quote</label>
            <input id="author" name="author" type="text" class="form-control" placeholder="Author (Optional)" />
          </div><div class="form-group text-center">
            <label for="palette">Choose a color scheme: </label>
            <select id="palette" class="ml-3" name="palette">
              <option value="classic" selected="true">Tributes Classic</option>
              <option value="cool">Tributes Cool </option>
              <option value="warm">Tributes Warm </option>
            </select>
          </div>

          {this.loadTimelineFields()}

          <div class="form-group">
            <label for="link">External Link</label>
            <input id="link" name="link" type="text" class="form-control" placeholder="Enter a link for more information (Optional)" />
          </div>

          <input type="hidden" id="username" name="username" value={this.username} />
          <input type="hidden" id="type" name="type" value='TemplateB' />

          <button type="submit" id="save-btn" class="btn btn-success">Save Tribute</button>
          <p id="submit-status" class="" />
        </div>

        <div id="lower-buffer" style={{"height": "200px"}}/>

      </form>
    )
  }
}

export default DesignTimeline;
