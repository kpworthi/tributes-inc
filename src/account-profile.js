const Profile = () => {

  function stateDropdown(form) {
    let stateList = [
      ["AL", "Alabama"], ["AK", "Alaska"],
      ["AZ", "Arizona"], ["AR", "Arkansas"],
      ["CA", "California"], ["CO", "Colorado"],
      ["CT", "Connecticut"], ["DE", "Delaware"],
      ["FL", "Florida"], ["GA", "Georgia"],
      ["HI", "Hawaii"], ["ID", "Idaho"],
      ["IL", "Illinois"], ["IN", "Indiana"],
      ["IA", "Iowa"], ["KS", "Kansas"],
      ["KY", "Kentucky"], ["LA", "Louisiana"],
      ["ME", "Maine"], ["MD", "Maryland"],
      ["MA", "Massachusetts"], ["MI", "Michigan"],
      ["MN", "Minnesota"], ["MS", "Mississippi"],
      ["MO", "Missouri"], ["MT", "Montana"],
      ["NE", "Nebraska"], ["NV", "Nevada"],
      ["NH", "New Hampshire"], ["NJ", "New Jersey"],
      ["NM", "New Mexico"], ["NY", "New York"],
      ["NC", "North Carolina"], ["ND", "North Dakota"],
      ["OH", "Ohio"], ["OK", "Oklahoma"],
      ["OR", "Oregon"], ["PA", "Pennsylvania"],
      ["RI", "Rhode Island"], ["SC", "South Carolina"],
      ["SD", "South Dakota"], ["TN", "Tennessee"],
      ["TX", "Texas"], ["UT", "Utah"],
      ["VT", "Vermont"], ["VA", "Virginia"],
      ["WA", "Washington"], ["WV", "West Virginia"],
      ["WI", "Wisconsin"], ["WY", "Wyoming"]
    ]

    return (
      <select id={`${form}-state-select`} class="form-control">
        {stateList.map((arrayVal, ind) => (
          <option key={ind} value={arrayVal[0]}>{arrayVal[1]}</option>
        ))}
      </select>
    )
  }

  return (
    <div id="profile-display" class="border p-2 acct-cont">
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
                    {stateDropdown('s')}
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
                    {stateDropdown('p')}
                </label>
              </div><div class="form-group">
                <label for="p-zip">Zip Code</label>
                <input type="text" id="p-zip" class="form-control"></input>
              </div>
            </div>
          </div>
          <p class="text-right"><button type="button" class="btn btn-success" disabled>Save Info</button></p>
          <small id="emailHelp" class="form-text text-muted text-right">Saving personal information is currently disabled.</small>
        </form>

      </div>
    </div>
  )
}

export default Profile;
