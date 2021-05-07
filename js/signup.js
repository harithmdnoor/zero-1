function signup(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var tempVar = null;

    db.collection("User").where("name", "==", username.value)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            tempVar = doc.id;

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    alert('wait 5 seconds')
    setTimeout(() => {
        if (tempVar==null){
            if (confirmPassword.value==password.value){
                db.collection("User").add({
                    name: username.value,
                    password:password.value
                })
                alert("Success!");
            }
            else{
                alert("wrong");
            }
        }
        else{
            alert("wrong");
        }
      }, 5000);
}
function back(){
    window.location.href = "index.html";
}