'use strict';

// Simple pure-React component so we don't have to remember
// Bootstrap's classes
var username;

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
					incorrect email or password
				</div>
    );
  }
});

var Signuperror = React.createClass({
  render: function() {
    return (
				<div className="col-sm-12">
					 user name already exists
				</div>
    );
  }
});

var Matcherror = React.createClass({
  render: function() {
    return (
				<div className="col-sm-12">
					password did not match.
				</div>
    );
  }
});

var Formremember = React.createClass({
  render: function() {
    return (
		<div className="form-group">
				<div className="col-sm-12">
					<div className={this.props.type}>
						<label>
							<input type={this.props.type} id={this.props.id} /> Remember me
						</label>
					</div>
				</div>
		</div>
    );
  }
});

var SubmitButton = React.createClass({
		
  callSubmit: function(event){
	  var targetid = this.props.id;
	 // alert(targetid);
	  if(targetid.match("signin") ){
		  //for signing in
	  $.post("check.php", { user: $("#email").val(), pwd: $("#pwd").val() }, function(data){
		  if(data.match("ok")){
				//alert( "you are logged in" ); 
				username = $("#email").val();
				ReactDOM.render(<Loggedin />, document.getElementById('container'));
		  }
		  else{
			  //alert(data);
		  		  ReactDOM.render(<Formerror />, document.getElementById('error'));
		  }
	  });
	  }
	  else{
		  // match pwd
		  if(!$("#pwd").val().match($("#new-pwd").val())){
			  
			  ReactDOM.render(<Matcherror />, document.getElementById('error'));
			  return false;
		  }
		  //for signing up
	  $.post("check.php", { name: $("#uname").val(), email: $("#email").val(), pwd: $("#pwd").val() }, function(data){
		  if(data.match("ok")){
				//alert( "you are logged in" );
				username = $("#email").val();
				ReactDOM.render(<Loggedin />, document.getElementById('container'));
		  }
		  else{
			  //alert(data);
		  		  ReactDOM.render(<Signuperror />, document.getElementById('error'));
		  }
	  });
	  }
  },
  
  render: function() {
    return (
        <button type={this.props.type} className={(this.props.className || '') + ' btn'} onClick={this.callSubmit}>Submit</button>
    );
  }
});

var Signupbox = React.createClass({
	callSignin: function(){
		ReactDOM.render(<Formbox />, document.getElementById('container'));	
	},
	
	render: function(){
		return (
		<form className="form-signin">
			<h4 className="col-sm-12" >Sign Up</h4>
			<div id="error" ></div>
			<FormInput className="form-control" id="uname" type="text" placeholder="Name">
			</FormInput>
			<FormInput className="form-control" id="email" type="email" placeholder="Email ID">
			</FormInput>
			<FormInput className="form-control" id="pwd" type="password" placeholder="Password">
			</FormInput>
			<FormInput className="form-control" id="new-pwd" type="password" placeholder="Confirm Password">
			</FormInput>
			<SubmitButton type="button" id="signup" className="btn-lg btn-primary btn-block" >
			</SubmitButton>
			<span className="col-sm-6 col-sm-offset-6" ><a href="javascript:" onClick={this.callSignin}>Already a user?</a></span>
			<div className="clearfix"></div>
		</form>
		);
	}
});

var Loggedin = React.createClass({
	render: function(){
		
		alert(username);
		return (
			<div className="row">
				<h1 className="page-header">
					YOU ARE LOGGED IN
				</h1>
				<div className="col-sm-6" ><h3>Welcome {username}</h3></div>
				<div className="col-sm-6" ><a href="logout.php">log out</a></div>
			</div>
		);
	}
});

var Formbox = React.createClass({
  callSignup: function(){
	  ReactDOM.render(<Signupbox />, document.getElementById('container'));
  },
  
  //<Formremember className="checkbox" id="rem" type="checkbox" >
//			</Formremember>
  
  render: function() {
	  
    return (
	  <form className="form-signin">
		<h4 className="col-sm-12" >Sign In</h4>
			<FormInput className="form-control" id="email" type="email" placeholder="Email ID" required autofocus>
			</FormInput>
			<FormInput className="form-control" id="pwd" type="password" placeholder="Password" required>
			</FormInput>
			<div id="error" ></div>
			
			<SubmitButton type="button" id="signin" className="btn-lg btn-primary btn-block" >
			</SubmitButton>
			<span className="col-sm-6" ><a href="javascript:" onClick={this.callSignup}>or Sign Up</a></span>
			<span className="col-sm-6" ><a href="forgot.php">forgot password</a></span>
			<div className="clearfix"></div>
      </form>
    );
  }
});

if(loggedin == 0){
		ReactDOM.render(<Formbox />, document.getElementById('container'));	
}
else{
	//alert( "you are logged in" ); 
			ReactDOM.render(<Loggedin />, document.getElementById('container'));
}



