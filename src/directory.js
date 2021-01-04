class Directory extends React.Component {
  constructor(){
    super();
    
    this.state = {
      tributeList: [{"name": 'Hang in there while we get some things together....'}]
    }

    this.getList    = this.getList.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount () {
    this.getList();
  }

  getList () {
    $.post( "/api/list", {"type": "directory"} )
      .done( ( response ) => {
        this.setState({tributeList: response});
      })
      .fail( function ( err ) {
        console.log(' Directory HTTP request failed. ');
        return 'An error occurred during the request, please try again.';
      });
      
  }

  renderList(){
    let tributeList = this.state.tributeList;

    return (
      <div id="list-area" class="text-center">
        {tributeList[0].name.startsWith('Hang')?<p>{tributeList[0].name}</p>:
        tributeList.map((value) => <a key={value.name} class="tribute-link" href={`#${value.name.toLowerCase().split(' ').join('-')}`}>{value.name}</a>)}
      </div>)
  }

  render(){
    let List = this.renderList;

    return(
      <div id="directory-component" class="mx-3 mb-4 px-sm-3 px-1 main-area">
        <h1 class="text-center" id="title">Tributes Inc. Directory</h1>
        <h2 class="text-center" id="subTitle">All the wonderful people we know about</h2>

        <div class="sub-divider"></div>

        <List />
      </div>
    )
  }
}

export default Directory;
