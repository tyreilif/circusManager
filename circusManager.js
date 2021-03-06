const auth = firebase.auth();
const db = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

//import * as cors from 'cors';
//const corsHandler = cors({origin:true});
//

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnSignin = document.getElementById("btnSignin");
const linkSignup = document.getElementById("linkSignup");
const linkLogin = document.getElementById("login");
const loginBox = document.getElementById("loginBox");
const btnLoginExit = document.getElementById('btnLoginExit');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const btnSignupSubmit = document.getElementById('btnSignupSubmit');
const txtFirstName = document.getElementById('txtFirstName');
const txtLastName = document.getElementById('txtLastName');
const txtPasswordConfirm = document.getElementById('txtPasswordConfirm');
const txtEmailSignup = document.getElementById("txtEmailSignup");
const txtPasswordSignup = document.getElementById("txtPasswordSignup");

linkLogin.addEventListener('click', e => {
    console.log('clicked');
    loginBox.style.display = 'block';
})

btnSignin.addEventListener('click', e => {
    console.log("login triggered");
    const email = txtEmail.value;
    console.log(email);
    const pass = txtPassword.value;
    // Sign in
    //const promise = auth.signInWithEmailAndPassword(email, pass);
    //promise.catch(e => console.log(e.message));
    
    auth.signInWithEmailAndPassword(email, pass).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        
        window.alert("Error : " + errorMessage);
    });
});


btnLoginExit.addEventListener('click', e => {
    signupForm.style.display= 'none';
    loginForm.style.display = 'block';
    loginBox.style.display = 'none';
    loginBox.style.height = '420px';
});



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log("user logged in");
        //document.location.href = 'home.html';
        console.log("directed to home");
    } else {
      //document.location.href = 'index.html';
    }
  });


  /* SIGN-UP SCRIPTS */


linkSignup.addEventListener('click', e => {
    console.log('signup page');
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    loginBox.style.height = '540px';

});

btnSignupSubmit.addEventListener('click', e => {
    var firstName_ = txtFirstName.value;
    var LastName_ = txtLastName.value;
    var email_ = txtEmailSignup.value;
    var password = txtPasswordSignup.value;
    var passwordConfirm = txtPasswordConfirm.value;
    if (password != passwordConfirm) {
        alert("Passwords do not match.");
    }
    else {
        var uid;
        auth.createUserWithEmailAndPassword(email_, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
        }).then(function(user) {
            user = auth.currentUser;
            uid = user.uid;
            var users = db.collection('users');
            users.doc(uid).set({
                firstName: firstName_,
                lastName: LastName_,
                email: email_,
                userTypes: {customer: true, employee: false, manager: false}, 
            }).then(function() {
                alert("Please log in with your new account credentials.");
                signupForm.style.form = 'none';
                loginForm.style.form = 'block';
                loginBox.style.height='420px';

            }).catch(function(error) {
                console.error("Error adding document: ", error);
            });
        });

        /*var users = db.collection('users');
        users.doc(uid).set({
            firstName: firstName_,
            lastName: LastName_,
            email: email_,
            userTypes: {customer: true, employee: false, manager: false}, 
        }).then(function(docRf) {
            console.log("Document written with ID: ", docRef.id)
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });*/

    }
});


function validatePw() {
  var password = document.getElementById("txtPassword").value;
  var confirmPassword = document.getElementById("txtConfirmPassword").value;
  if (password != confirmPassword) {
      alert("Passwords do not match.");
      return false;
  }
  return true;
}