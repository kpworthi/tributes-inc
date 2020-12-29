class Account extends React.Component {
  constructor(props){
    super(props);

    this.username = props.username || 'user';
    this.state = {
      currentTab: 'profile-tab',
      subOption: 'default'
    }

    this.loadPage = props.loadPage;

    this.handleClick = this.handleClick.bind(this);
    this.profileOption = this.profileOption.bind(this);
    this.createOption = this.createOption.bind(this);
    this.stateDropdown = this.stateDropdown.bind(this);
    this.options = { 
      'profile': this.profileOption, 
      'payment': this.paymentOption, 
      'history': this.historyOption, 
      'content': this.contentOption,
      'create' : this.createOption
    }

    this.subOptions = {
      'default':    [['Design: Our Custom Products', 
                      'design',
                      'Here you’ll find our variety of à la carte products. From our professional tributes to our framed collages, start here to get designing.'],
                     ['Customize: Tiered Packages',
                      'default',
                      "Thinking about multiple items and want to design and ship everything conveniently? We have three different tier levels to get you what you want."],
                     ['Order: Generic Items',
                      'default',
                      'Any items that are offered as an option, as well as any items you might need to refresh or maintain a previous purchase can be found here.']],
      'design':     [['Templated Tribute',
                      'templates',
                      'Choose from two different styles of tributes. Layouts are pre-made, and all that is needed is to fill in what you want them to say!'],
                     ['Custom Designed Tribute',
                      'design',
                      'Feel comfortable with getting into the nitty gritty? Get started with a custom designed tribute to have greater control over content presentation.'],
                     ['T. I. Designed Tribute',
                      'design',
                      'Interested in a custom look, but want to leave it to someone else? Select a Tributes Inc. designed tribute and we’ll work with you to get you a feel that’s just right.']],
      'templates':  [['Templated Biography Tribute',
                      'product-design-a',
                      'A pre-designed tribute template that is used for large amounts of text in a biography style. Note: Users are able to create up to two templated tributes for free'],
                     ['Templated Timeline Tribute',
                      'product-design-b',
                      'A pre-designed tribute template that is used for smaller amounts of text in a timeline style. Note: Users are able to create up to two templated tributes for free']]
    }

    this.stateList = [
      ["AL", "Alabama"],
      ["AK", "Alaska"],
      ["AZ", "Arizona"],
      ["AR", "Arkansas"],
      ["CA", "California"],
      ["CO", "Colorado"],
      ["CT", "Connecticut"],
      ["DE", "Delaware"],
      ["FL", "Florida"],
      ["GA", "Georgia"],
      ["HI", "Hawaii"],
      ["ID", "Idaho"],
      ["IL", "Illinois"],
      ["IN", "Indiana"],
      ["IA", "Iowa"],
      ["KS", "Kansas"],
      ["KY", "Kentucky"],
      ["LA", "Louisiana"],
      ["ME", "Maine"],
      ["MD", "Maryland"],
      ["MA", "Massachusetts"],
      ["MI", "Michigan"],
      ["MN", "Minnesota"],
      ["MS", "Mississippi"],
      ["MO", "Missouri"],
      ["MT", "Montana"],
      ["NE", "Nebraska"],
      ["NV", "Nevada"],
      ["NH", "New Hampshire"],
      ["NJ", "New Jersey"],
      ["NM", "New Mexico"],
      ["NY", "New York"],
      ["NC", "North Carolina"],
      ["ND", "North Dakota"],
      ["OH", "Ohio"],
      ["OK", "Oklahoma"],
      ["OR", "Oregon"],
      ["PA", "Pennsylvania"],
      ["RI", "Rhode Island"],
      ["SC", "South Carolina"],
      ["SD", "South Dakota"],
      ["TN", "Tennessee"],
      ["TX", "Texas"],
      ["UT", "Utah"],
      ["VT", "Vermont"],
      ["VA", "Virginia"],
      ["WA", "Washington"],
      ["WV", "West Virginia"],
      ["WI", "Wisconsin"],
      ["WY", "Wyoming"]
    ]

  }

  componentDidMount () {
    $( 'button' ).click(this.handleClick);
    console.log('mount');
  }

  handleClick (event) {
    let clickedButton = event.currentTarget;
    console.log(clickedButton.id.split('product-')[1]);
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
        this.loadPage( clickedButton.id );
      }
      // otherwise set state to re-render and load new cards
      else {
        this.setState( { subOption: clickedButton.id } )
      }
    }
  }

  profileOption () {
    return (
      <div id="profile-display" class="border p-2 h-100">
        <h3 class="text-center">Here's your profile information</h3>
        <div class="divider"></div>
        <div id="sub-container">
          <form id="profile-info">

            <div id="personal-info" class="form-row text-center">
              <div class="form-group col-md-4">
                <label for="first-name">First Name</label>
                <input id="first-name" type="text" class="form-control"></input>
              </div><div class="form-group col-md-4">
                <label for="last-name">Last Name</label>
                <input id="last-name" type="text" class="form-control"></input>
              </div><div class="form-group col-md-4">
                <label for="email">E-mail Address</label>
                <input id="email" type="email" class="form-control"></input>
              </div>
            </div>

            <div id="address-forms" class="row">
              <div id="shipping-address" class="col-md-6">
                <p><b>Default Shipping Address</b></p>
                <div class="form-group">
                  <label for="s-street-one">Street Address Line 1</label>
                  <input type="text" id="s-street-one" class="form-control" placeholder="123 Street Rd."></input>
                </div><div class="form-group">
                  <label for="s-street-two">Street Address Line 2</label>
                  <input type="text" id="s-street-two" class="form-control" placeholder="Apt A"></input>
                </div><div class="form-group">
                  <label for="s-city">City</label>
                  <input type="text" id="s-city" class="form-control" placeholder="City-ville"></input>
                </div><div class="form-group">
                  <label for="s-state-select">State
                    {this.stateDropdown('s')}
                  </label>
                </div><div class="form-group">
                  <label for="s-zip">Zip Code</label>
                  <input type="text" id="s-zip" class="form-control"></input>
                </div>
              </div>

              <div id="billing-address" class="col-md-6">
                <p><b>Default Billing Address</b></p>
                <div class="form-group">
                  <label for="p-street-one">Street Address Line 1</label>
                  <input type="text" id="p-street-one" class="form-control" placeholder="123 Street Rd."></input>
                </div><div class="form-group">
                  <label for="p-street-two">Street Address Line 2</label>
                  <input type="text" id="p-street-two" class="form-control" placeholder="Apt A"></input>
                </div><div class="form-group">
                  <label for="p-city">City</label>
                  <input type="text" id="p-city" class="form-control" placeholder="City-ville"></input>
                </div><div class="form-group">
                  <label for="p-state-select">State
                    {this.stateDropdown('p')}
                  </label>
                </div><div class="form-group">
                  <label for="p-zip">Zip Code</label>
                  <input type="text" id="p-zip" class="form-control"></input>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    )
  }

  stateDropdown ( form ) {
    return(
      <select id={`${form}-state-select`} class="form-control">
        {this.stateList.map( (arrayVal, ind) => (
          <option key={ind} value={arrayVal[0]}>{arrayVal[1]}</option>
        ))}
      </select>
      
    )
  }

  paymentOption () {
    return (
      <div id="payment-display" class="border p-2 h-100">
        <h3 class="text-center">Here's the payment options you've saved</h3>
        <div class="divider"></div>
        <div id="sub-container"></div>
      </div>
    )
  }

  historyOption () {
    return (
      <div id="history-display" class="border p-2 h-100">
        <h3 class="text-center">Here's the list of your most recent orders</h3>
        <div class="divider"></div>
        <div id="sub-container"></div>
      </div>
    )
  }

  contentOption () {
    return (
      <div id="content-display" class="border p-2 h-100">
        <h3 class="text-center">Here's the content you've created</h3>
        <div class="divider"></div>
        <div id="sub-container"></div>
      </div>
    )
  }

  createOption () {
    let productDisplay = [];
    for (let each of this.subOptions[this.state.subOption]){
      productDisplay.push(this.returnCard(...each));
    }
    
    return (
      <div id="create-display" class="border p-2 h-100">
        <h3 class="text-center">Create or Buy</h3>
        <div class="divider"></div>
        <div id="sub-container" class="d-flex flex-wrap justify-content-center">
          {productDisplay}
        </div>
      </div>
    )
  }

  returnCard( title, linkId, text ) {
    return (
      <button type="button" id={linkId} class="card mx-3 my-2" style={{"width": "18rem"}} onClick={this.handleClick}>
        <h5 class="card-title text-center">{title}</h5>
        <svg class="bd-placeholder-img card-img-top" 
            width="100%" 
            height="180" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="xMidYMid slice" 
            focusable="false" role="img" aria-label="Placeholder: Preview Image">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#868e96"/>
              <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Coming soon</text>
        </svg>
        <div class="card-body">
          <p class="card-text">{text}</p>
        </div>
    </button>
    )
  }

  render(){
    let Option = this.options[this.state.currentTab.split('-')[0]];

    return(
      <div id="account-area" class="mx-3 mb-4 px-sm-3 px-1 main-area">
        <h1 class="text-center" id="title">Welcome, {this.username}!</h1>
        <h2 class="text-center" id="subTitle">Please choose an option below</h2>

        <div class="row justify-content-center mt-5" id="option-tabs" >
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm active" id='profile-tab'>Profile</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='payment-tab'>Payment Information</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='history-tab'>Payment History</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='content-tab'>Your Content</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='create-tab'>Create or Buy</button>
        </div>

        <div class="mx-2 mt-2 h-100" id="option-content" >
          <Option />
        </div>

      </div>
    )
  }
}

export default Account;
