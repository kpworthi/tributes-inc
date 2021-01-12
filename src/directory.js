class Directory extends React.Component {
  constructor(){
    super();
    
    //tributeList is the current list of tributes to show in the directory
    //listSet is the current set of 60 tributes to display in the component
    //maxSet is the number of sets available to flip between
    this.state = {
      tributeList: [{"name": 'Hang in there while we get some things together....'}],
      filterInput: '',
      filterList: [{"name": 'Hang in there while we get some things together....'}],
      listSet: 0,
      maxSet: 0
    }

    this.getList      = this.getList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    this.renderList   = this.renderList.bind(this);
  }

  componentDidMount () {
    this.getList();
  }

  getList () {
    $.post( "/api/list", {"type": "directory"} )
      .done( ( response ) => {
        this.setState({tributeList: response, filterList: response, maxSet: Math.floor(response.length/60)})
      })
      .fail( function ( err ) {
        console.log(' Directory HTTP request failed. ');
        return 'An error occurred during the request, please try again.';
      });
      
  }

  handleChange( event ){
    let newFilterList = this.state.tributeList.filter(value => value.name.toLowerCase().includes(event.target.value.toLowerCase()));
    this.setState({
      filterInput: event.target.value, 
      filterList: newFilterList,
      listSet: 0,
      maxSet: Math.floor(newFilterList.length/60)
    });
  }

  handleClick( event ){
    if(event.target.id === 'prev-btn' && this.state.listSet !== 0)
      this.setState({listSet: this.state.listSet-1})
    else if(event.target.id === 'next-btn' && this.state.listSet < this.state.maxSet)
      this.setState({listSet: this.state.listSet+1})
  }

  renderList(){
    let tributeList = this.state.filterList;
    let indexMod = this.state.listSet*60;
    
    // three column list, 20 items per column
    return (
      <div id="list-area" class="row justify-content-center align-self-center">
        <div class="col-lg-3 col-sm-4" id="list-col-1">
          {tributeList.length === 0?<p>No names seem to match your search</p>:
          tributeList[0].name.startsWith('Hang')?<p>{tributeList[0].name}</p>:
          tributeList.filter((value,index) => index>=0+indexMod && index<20+indexMod)
            .map((value) => <a key={value.name} class={`tribute-link${value.username==='admin'?'':' font-weight-bold'}`} href={`#${value.name.toLowerCase().split(' ').join('-')}`}>{value.name}<br/></a>)}
        </div>
        {tributeList.length<20?null:
        <div class="col-lg-3 col-sm-4" id="list-col-2">
          {tributeList.filter((value,index) => index>=20+indexMod && index<40+indexMod)
            .map((value) => <a key={value.name} class={`tribute-link${value.username==='admin'?'':' font-weight-bold'}`} href={`#${value.name.toLowerCase().split(' ').join('-')}`}>{value.name}<br/></a>)}
        </div>}
        {tributeList.length<40?null:
        <div class="col-lg-3 col-sm-4" id="list-col-3">
          {tributeList.filter((value,index) => index>=40+indexMod && index<60+indexMod)
            .map((value) => <a key={value.name} class={`tribute-link${value.username==='admin'?'':' font-weight-bold'}`} href={`#${value.name.toLowerCase().split(' ').join('-')}`}>{value.name}<br/></a>)}
        </div>}
      </div>)
  }

  render(){
    let List        = this.renderList;
    let tributeList = this.state.tributeList;
    let listSet     = this.state.listSet;
    let maxSet      = this.state.maxSet;

    return(
      <div id="directory-component" class="mx-3 px-sm-3 px-1 main-area">
        <h1 class="text-center" id="title">Tributes Inc. Directory</h1>
        <h2 class="text-center" id="subTitle">All the wonderful people we know about</h2>

        <div class="sub-divider"></div>
        <label for="list-filter" class="align-self-center">Search by Name: 
          <input id="list-filter" class="ml-3" onChange={this.handleChange} value={this.state.filterInput} /></label>

        <List />
        {tributeList.length<60?null:
        <div class="btn-group mt-3 align-self-center" role="group" aria-label="List Navigation">
          <button class="btn btn-secondary" type="button" id="prev-btn" onClick={this.handleClick} disabled={listSet===0?"disabled":null}>Previous</button>
          <button class="btn btn-secondary" type="button" id="page-num" disabled>{`Page ${listSet+1}`}</button>
          <button class="btn btn-secondary" type="button" id="next-btn" onClick={this.handleClick} disabled={listSet===maxSet?"disabled":null}>Next</button>
        </div>}
        {tributeList[0].name.startsWith('Hang')?null:
        <small class="align-self-center">Entries that are non-bold are placeholder entries for tributes carried over from our old site.</small>}
      </div>
    )
  }
}

export default Directory;
