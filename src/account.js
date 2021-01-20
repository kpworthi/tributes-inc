import Profile from '../scripts/account-profile.js';

class Account extends React.Component {
  constructor(props){
    super(props);

    this.username = props.username || 'user';
    this.state = {
      contentList: [{"name": 'Hang in there while we get some things together....'}],
      currentTab: 'profile-tab',
      subOption: 'default'
    }

    this.manageMode = 'none';

    this.updateMainState  = props.updateMainState;

    this.handleClick       = this.handleClick.bind(this);
    this.contentOption     = this.contentOption.bind(this);
    this.createOption      = this.createOption.bind(this);
    this.getContentList    = this.getContentList.bind(this);

    this.options = { 
      'profile': Profile, 
      'payment': this.paymentOption, 
      'history': this.historyOption, 
      'content': this.contentOption,
      'create' : this.createOption
    }

    this.contentTypes = {
      'TemplateA': 'Digital Tribute: Template A (Biography)',
      'TemplateB': 'Digital Tribute: Template B (Timeline)',
      'Customized': 'Digital Tribute: Custom-made by You',
      'Professional': 'Digital Tribute: Designed by Tributes Inc'
    }

    this.subOptions = {
      'default':    [['Design: Our Custom Products', 
                      'design',
                      "./img/design-prev.png",
                      'Here you’ll find our variety of à la carte products. From our professional tributes to our framed collages, start here to get designing.'],
                     ['Customize: Tiered Packages',
                      'default',
                      "",
                      "Thinking about multiple items and want to design and ship everything conveniently? We have three different tier levels to get you what you want."],
                     ['Order: Generic Items',
                      'default',
                      "",
                      'Any items that are offered as an option, as well as any items you might need to refresh or maintain a previous purchase can be found here.']],
      'design':     [['Templated Tribute',
                      'templates',
                      "./img/templates-prev.png",
                      'Choose from two different styles of tributes. Layouts are pre-made, and all that is needed is to fill in what you want them to say!'],
                     ['Custom Designed Tribute',
                      'design',
                      "",
                      'Feel comfortable with getting into the nitty gritty? Get started with a custom designed tribute to have greater control over content presentation.'],
                     ['T. I. Designed Tribute',
                      'design',
                      "",
                      'Interested in a custom look, but want to leave it to someone else? Select a Tributes Inc. designed tribute and we’ll work with you to get you a feel that’s just right.'],
                     ['Physical Designs',
                      'design',
                      "",
                      "Here you'll find our physical offerings, for when you want something to have in your home or another place of prominence"],],
      'templates':  [['Templated Biography Tribute',
                      'product-design-a',
                      "./img/temp-a-prev.png",
                      'A pre-designed tribute template that is used for large amounts of text in a biography style. Note: Users are able to create up to two templated tributes for free'],
                     ['Templated Timeline Tribute',
                      'product-design-b',
                      "./img/temp-b-prev.png",
                      'A pre-designed tribute template that is used for smaller amounts of text in a timeline style. Note: Users are able to create up to two templated tributes for free']]
    }

  }

  componentDidMount () {
    this.getContentList();

    $( '.option' ).click(this.handleClick);
  }
  
  handleClick (event) {
    let clickedButton = event.currentTarget;
    console.log(clickedButton.id);
    event.stopPropagation();

    // if clicking on a main tab
    if ( clickedButton.id.includes('tab') ){
      // unset the current button as active, change state to re-render
      // activate current button
      $(`#${this.state.currentTab}`).toggleClass('active');
      this.setState( { 
        currentTab: event.target.id,
        subOption: 'default' }, () => 
          $(`#${this.state.currentTab}`).toggleClass('active'));
    }
    // if clicking on a card
    else if ( clickedButton.classList.contains('card')){
      // if it's a product card, take to the product page
      if ( clickedButton.id.includes('product') ){
        location.hash = `#${clickedButton.id}`;
      }
      // otherwise set state to re-render and load new cards
      else {
        this.setState( { subOption: clickedButton.id } )
      }
    }
    // if doing admin actions
    else if ( clickedButton.id.startsWith('db')){
      if( clickedButton.id === 'db-add-btn'){
        $.post('/api/admin', {})
          .done((response) => {console.log(response)})
          .fail();
      }
      else if( clickedButton.id === 'db-rem-btn'){
        $.ajax({
          "type": "DELETE",
          "url": '/api/admin',
          "success": (response) => {console.log(response)}
        });
      }
    }
    // tribute modification
    else if ( clickedButton.id.startsWith('t-') ){
      let buttonType  = clickedButton.id.split('-')[1],
          buttonIndex = clickedButton.id.split('-')[2]
      
      if (buttonType !== 'edit' ) {
        this.manageMode = `${buttonType}-${buttonIndex}`;
        this.updateMainState( { 
          modal: {
            text: `Are you sure you want to ${buttonType} the tribute for ${$(`#link-${buttonIndex}`).text()}?`,
            btnYes: `Yes, ${buttonType}`,
            btnNo: `No, don't ${buttonType}`,
            clickHandler: this.handleClick
          }
        });
      }
      else if ( buttonType === 'edit' ){
        // do nothing for now, will go to designer page with filled in info for resubmission
      }
    }
    // modal handling
    else if ( clickedButton.id.startsWith('modal') ){
      let modeType = this.manageMode.split('-')[0];

      if ( modeType === 'hide' || modeType === 'show' || modeType === 'delete') {
        switch(clickedButton.id){
          case 'modal-yes':
            $.ajax({
              "type": modeType==='delete'?"DELETE":"PUT",
              "url": '/api/design',
              "data": { userName: this.username, 
                        tributeName: $( `#link-${this.manageMode.split('-')[1]}` ).text(), 
                        editType: modeType==='delete'?null:modeType},
              "success": (response) => {
                this.getContentList();
                this.updateMainState({
                  modal: {
                    text: response,
                    btnYes: 'Got it',
                    btnNo: null,
                    clickHandler: this.handleClick
                  }
                });
              },
              "fail": (response) => {
                console.log(`Something went wrong with the HTTP request!`)
              }
            });
            break;
          case 'modal-no' :
            break;
        }
      }

      this.manageMode       = 'none';
      this.updateMainState({ modal: {} });
    }
  }

  getContentList () {
    $.post( "/api/list", {"type": "user", "username": this.username} )
      .done( ( response ) => {
        this.setState({contentList: response});
      })
      .fail( function ( err ) {
        console.log(' Directory HTTP request failed. ');
        return 'An error occurred during the request, please try again.';
      });
      
  }

  paymentOption () {
    return (
      <div id="payment-display" class="border p-2 acct-cont">
        <h3 class="text-center">Here's the payment options you've saved</h3>
        <div class="divider"></div>
        <div id="payment-list" class="d-flex flex-column align-items-center text-center">
          <div class="row justify-content-center w-100">
            <div class="col-5 row m-0">
              <b class="my-1 my-lg-3 col-lg-5">Name</b>
              <b class="my-1 my-lg-3 col-lg-7">Type</b>
            </div><div class="col-4 row m-0">
              <b class="my-1 my-lg-3 col-lg-8">Saved On</b>
              <b class="my-1 my-lg-3 col-lg-4">Default?</b>
            </div>
            <b class="my-3 col-3"></b>
          </div>
          <p>Nothing to display, yet!</p>
        </div>
      </div>
    )
  }

  historyOption () {
    return (
      <div id="history-display" class="border p-2 acct-cont">
        <h3 class="text-center">Here's a list of your most recent orders</h3>
        <div class="divider"></div>
        <div id="history-list" class="d-flex flex-column align-items-center text-center">
          <div class="row justify-content-center w-100">
            <div class="col-5 row m-0">
              <b class="my-1 my-lg-3 col-lg-5">Name</b>
              <b class="my-1 my-lg-3 col-lg-7">Type</b>
            </div><div class="col-4 row m-0">
              <b class="my-1 my-lg-3 col-lg-8">Created On</b>
              <b class="my-1 my-lg-3 col-lg-4">Status</b>
            </div>
            <b class="my-3 col-3"></b>
          </div>
          <p>Nothing to display, yet!</p>
        </div>
      </div>
    )
  }

  contentOption () {
    let contentList = this.state.contentList;

    return (
      <div id="content-display" class="border p-2 acct-cont">
        <h3 class="text-center">Here's the content you've created</h3>
        <div class="divider"></div>

        <div id="content-list" class="d-flex flex-column align-items-center text-center">
          <div class="row justify-content-center w-100">
            <div class="col-5 row m-0">
              <b class="my-1 my-lg-3 col-lg-5">Name</b>
              <b class="my-1 my-lg-3 col-lg-7">Type</b>
            </div><div class="col-4 row m-0">
              <b class="my-1 my-lg-3 col-lg-8">Created On</b>
              <b class="my-1 my-lg-3 col-lg-4">Approved?</b>
            </div>
            <b class="my-3 col-3"></b>
          </div>
          {contentList.length===0?<p>Nothing to display, yet!</p>:
          contentList[0].name.startsWith('Hang')?<p>{contentList[0].name}</p>:
          contentList.map((value, index) => 
            <div class="row mb-1 align-items-center justify-content-center rounded border border-dark w-100">
              <div class="col-5 row m-0">
                <a id={`link-${index}`} key={`link-${index}`} class="tribute-link my-1 col-lg-5" href={`#${value.name.toLowerCase().split(' ').join('-')}`}>{value.name}</a>
                <p class="my-1 col-lg-7">{this.contentTypes[value.type]}</p>
              </div><div class="col-4 row m-0">
                <p class="my-2 my-lg-1 col-lg-8">{new Date(value.created_on).toDateString()}</p>  
                <p class="my-2 my-lg-1 col-lg-4">{value.approved?"Yes":"No"}</p>
              </div><div class="col-3 row m-0">
                <button id={`t-edit-${index}`} type="button" class="btn btn-primary my-1 p-2 col-lg-4" 
                        onClick={this.handleClick} disabled>Edit</button>
                <button id={`t-${value.visible?"hide":"show"}-${index}`} type="button" class="btn btn-dark my-1 p-2 col-lg-4" 
                        onClick={this.handleClick}>{value.visible?"Hide":"Show"}</button>
                <button id={`t-delete-${index}`} type="button" class="btn btn-danger my-1 p-2 col-lg-4 text-center" 
                        onClick={this.handleClick}>Delete</button>
              </div>
            </div>
          )}
        </div>

      </div>
    )
  }
  
  createOption () {
    let productDisplay = [];

    const returnCard = ( title, linkId, img, text ) => {
      return (
        <button type="button" id={linkId} class="card mx-3 my-2" 
                style={{"width": "18rem", "opacity": img?"100%":"70%"}} 
                onClick={this.handleClick} disabled={img?null:"disabled"} >
          <h5 class="card-title text-center">{title}</h5>
  
          {img?<img src={img} class="card-img border border-dark" />:
          <svg class="bd-placeholder-img card-img-top" 
              width="100%" 
              height="180" 
              xmlns="http://www.w3.org/2000/svg" 
              preserveAspectRatio="xMidYMid slice" 
              focusable="false" role="img" aria-label="Placeholder: Preview Image">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#868e96"/>
                <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Coming soon</text>
          </svg>}
  
          <div class="card-body">
            <p class="card-text">{text}</p>
          </div>
        </button>
      )
    }

    for (let each of this.subOptions[this.state.subOption]){
      productDisplay.push(returnCard(...each));
    }
    
    return (
      <div id="create-display" class="border p-2 acct-cont">
        <h3 class="text-center">Create or Buy</h3>
        <div class="divider"></div>
        <div id="sub-container" class="d-flex flex-wrap justify-content-center">
          {productDisplay}
        </div>
      </div>
    )
  }

  render(){
    let Option = this.options[this.state.currentTab.split('-')[0]];

    return(
      <div id="account-area" class="mx-3 px-sm-3 px-1 main-area">
        <h1 class="text-center" id="title">Welcome, {this.username}!</h1>
        <h2 class="text-center" id="subTitle">Please choose an option below</h2>
        {this.username!=='theTestaroo'?null:
        <div class='btn-group'>
          <button type="button" class="btn btn-danger" id="db-add-btn" onClick={this.handleClick}>Add Admin Test Entries</button>
          <button type="button" class="btn btn-danger" id="db-rem-btn" onClick={this.handleClick}>Rem Admin Test Entries </button>
        </div>}

        <div class="row justify-content-center mt-5" id="option-tabs" >
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm option active" id='profile-tab'>Profile</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm option" id='payment-tab'>Payment Information</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm option" id='history-tab'>Payment History</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm option" id='content-tab'>Your Content</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm option" id='create-tab'>Create or Buy</button>
        </div>

        <div class="mx-2 mt-2 acct-cont" id="option-content" >
          <Option />
        </div>

      </div>
    )
  }
}

export default Account;
