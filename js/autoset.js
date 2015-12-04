'use strict';

// Simple pure-React component so we don't have to remember
// Bootstrap's classes
var FormInput = React.createClass({
  render: function() {
    return (
					<input type={this.props.type}  className={this.props.className} id={this.props.id} placeholder={this.props.placeholder} />
    );
  }
});

var Formerror = React.createClass({
  render: function() {
    return (
				<div className="col-sm-12">
					email not available.. please check once again.
				</div>
    );
  }
});

var SubmitButton = React.createClass({
		
  callSubmit: function(event){
	  var targetid = this.props.id;
	 // alert(targetid);
	  $.post("autoset.php", { user: $("#email").val() }, function(data){
		  if(data.match("ok")){
				//alert( "mail sent" ); 
				ReactDOM.render(<Mailsent />, document.getElementById('container'));
		  }
		  else{
			  alert( data ); 
		  		  ReactDOM.render(<Formerror />, document.getElementById('error'));
		  }
	  });
  },
  
  render: function() {
    return (
        <button type={this.props.type} className={(this.props.className || '') + ' btn'} onClick={this.callSubmit}>Send</button>
    );
  }
});

var Mailsent = React.createClass({
	render: function(){
		return (
			<div className="row">
				<h1 className="page-header">
					mail sucessfully sent.
				</h1>
				<div className="col-sm-12" >check your mail. Thank you..</div>
			</div>
		);
	}
});

var Formbox = React.createClass({
	
  render: function() {
	  
    return (
	
	<div>
	  <form className="form-signin">
		<h4 className="col-sm-12" >please enter your valid email:</h4>
			<FormInput className="form-control" id="email" type="email" placeholder="Email ID" required autofocus>
			</FormInput>
			<div id="error" ></div>
			<SubmitButton type="button" id="sendmail" className="btn-lg btn-primary btn-block" >
			</SubmitButton>
			<div className="clearfix"></div>
      </form>
	  </div>
    );
  }
});

		ReactDOM.render(<Formbox />, document.getElementById('container'));



