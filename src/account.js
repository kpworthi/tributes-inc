class Account extends React.Component {
  constructor(props){
    super(props);

    this.username = props.username || 'user';
    this.state = {
      currentButton: 'profile-btn'
    }

    this.handleClick = this.handleClick.bind(this);
    this.options = { 
      'profile': this.profileOption, 
      'payment': this.paymentOption, 
      'history': this.historyOption, 
      'content': this.contentOption 
    }

  }

  componentDidMount () {
    $( '#account-area' ).click(this.handleClick);
  }

  handleClick (event) {
    if ( event.target.type === 'button' ){
      $(`#${this.state.currentButton}`).toggleClass('active');
      this.setState({currentButton: event.target.id}, () => 
        $(`#${this.state.currentButton}`).toggleClass('active'));
    }
  }

  profileOption () {
    return (
      <div id="profile-display">
        <h3>Here's your profile information</h3>
      </div>
    )

  }

  paymentOption () {
    return (
      <div id="payment-display">
        <h3>Here's the payment options you've saved</h3>
      </div>
    )

  }

  historyOption () {
    return (
      <div id="history-display">
        <h3 class="text-center">Here's the list of your most recent orders</h3>
      </div>
    )

  }

  contentOption () {
    return (
      <div id="content-display">
        <h3>Here's the content you've created</h3>
      </div>
    )
  }

  render(){
    let Option = this.options[this.state.currentButton.split('-')[0]];

    return(
      <div id="account-area" class="mx-3 mb-4 px-sm-3 px-1 main-area">
        <h1 class="text-center" id="title">Welcome, {this.username}!</h1>
        <h2 class="text-center" id="subTitle">Please choose an option below</h2>

        <div class="row justify-content-center mt-5" id="option-tabs" >
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm active" id='profile-btn'>Profile</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='payment-btn'>Payment Information</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='history-btn'>Payment History</button>
          <button type="button" class="btn btn-light mx-3 my-1 my-sm-0 col-sm" id='content-btn'>Your Content</button>
        </div>

        <div class="border mx-2 mt-2" id="option-content" >
          <Option />
        </div>

      </div>
    )
  }
}

export default Account;
