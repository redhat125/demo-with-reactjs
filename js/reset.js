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
					password did not match.
				</div>
    );
  }
});

var SubmitButton = React.createClass({
		
  callSubmit: function(event){
	  var targetid = this.props.id;
	 // alert(targetid);
	 if(!$("#pwd").val().match($("#conf_pwd").val())){
		 ReactDOM.render(<Formerror />, document.getElementById('error'));
		 return false;
	 }
	  $.post("update.php", { pwd: $("#pwd").val(), pwdlink: linker}, function(data){
		  if(data.match("ok")){
				//alert( "updated" ); 
				ReactDOM.render(<Pwdupdate />, document.getElementById('container'));
		  }
		  else  if(data.match("expired")){
				//alert( "updated" ); 
				ReactDOM.render(<Expired />, document.getElementById('container'));
		  }
		  else{
			  alert( data);
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

var Pwdupdate = React.createClass({
	render: function(){
		return (
			<div className="row">
				<h1 className="page-header">
					password updated
				</h1>
				<div className="col-sm-12" >To go to login page <a href="./">click here..</a></div>
			</div>
		);
	}
});

var Expired = React.createClass({
	render: function(){
		return (
			<div className="row">
				<h1 className="page-header">
					sorry! the link has expired
				</h1>
				<div className="col-sm-12" >To go to login page <a href="./">click here..</a></div>
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
			<FormInput className="form-control" id="pwd" type="password" placeholder="new password" required autofocus>
			</FormInput>
			<FormInput className="form-control" id="conf_pwd" type="password" placeholder="confirm password" required>
			</FormInput>
			<div id="error" ></div>
			<SubmitButton type="button" id="setpwd" className="btn-lg btn-primary btn-block" >
			</SubmitButton>
			<div className="clearfix"></div>
      </form>
	  </div>
    );
  }
});

		ReactDOM.render(<Formbox />, document.getElementById('container'));



