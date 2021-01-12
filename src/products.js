class Products extends React.Component {
  constructor(){
    super();
    
  }
  render(){
    return(
      <div id="products-component" class="mx-3 px-sm-3 px-1 main-area">

        <h1 class="text-center" id="title">Here's our line-up</h1>
        <h2 class="text-center" id="subTitle">We think we'll have just what you're looking for</h2>
        <div class="sub-divider"></div>

        <ul class="mx-3"><h3>Digital Products</h3>
          <li>Templated pages: <a href="#template-a" class="template-link">Template A Preview</a> - <a href="#template-b" class="template-link">Template B Preview</a></li>
          <li>Custom pages</li>
          <li>Professionally designed pages</li>
        </ul>

        <ul class="mx-3"><h3>Physical Products</h3>
          <li>Framed tribute collage</li>
          <li>Professionally printed and optionally framed photos</li>
          <li>Engraved plaques</li>
        </ul>

        <ul class="mx-3"><h3>Packages</h3>
          <li>Bronze Package</li>
          <li>Silver Package</li>
          <li>Gold Package</li>
        </ul>

        <p class="text-center mx-3">All of our offerings are customized, so please make an account and view your personal account area to make an order.</p>
        <br/>
        <p class="text-center mx-3">If you need to re-order any supplies or necessities for maintaining your previous purchases, this can also be done
        from your account page.</p>

      </div>
    )
  }
}

export default Products;
