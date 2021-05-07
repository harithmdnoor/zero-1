// JavaScript source code
var userNamelist = [];
var teachernamelist = [];
var teacherpasswordlist = [];
var teacheradminlist = [];
var check = false;
var counter = 0;
// Login
function verify() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    userNamelist.forEach(i=>{
        if (i[1]==name && i[2]==password){
            window.location.href = 'session.html';
            var studentdata = [i[1], i[2]];
            localStorage.setItem('studentdata',studentdata);
            localStorage.setItem("userId",i[0]);
            check = true;
        }
    })
    
    if(check == false){
        alert("Wrong username or Password");
        window.location.href = 'index.html';
    }
}
function signup(){
    window.location.href= "signup.html";
}

//getting student name and id
dbl.collection('User').get().then(snapshot => {
    data = snapshot.docs;
    
    data.forEach(doc => {
        var userName = '';
        var userPassword = '';
        var userId="";
        var user = [];
        const guide = doc.data();
        userId = doc.id;
        userName = guide.name;
        userPassword = guide.password;
        user.push(userId);
        user.push(userName);
        user.push(userPassword);
        userNamelist.push(user);
    })
});


// Get the input field
var nameinput = document.getElementById("name");
var passwordinput = document.getElementById("password");

// Execute a function when the user releases a key on the keyboard
nameinput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("loginBtn").click();
    }
});
// Execute a function when the user releases a key on the keyboard
passwordinput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("loginBtn").click();
    }
});


function admin() {
    window.location.href = 'adminmenu.html';
}