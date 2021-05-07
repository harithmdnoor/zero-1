const logList = document.querySelector('#log-list');

var sessionID = localStorage.getItem("sessionId");
var sessionName = localStorage.getItem("sessionName");
var header = document.getElementById('header');
var userid = localStorage.getItem('userId');
header.textContent = sessionName;


function renderResponse(doc){
    let session_li = document.createElement('li');
    let logValue = document.createElement('span');
    let logCross = document.createElement('div');

    
    session_li.setAttribute('data-id',doc.id);
    logValue.textContent = doc.data().sessionLog;
    logCross.textContent = 'x';

    session_li.appendChild(logValue);
    session_li.appendChild(logCross);


    logList.appendChild(session_li);

    
// delete data
    logCross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Session-insight').doc(id).delete();
    })
}

function createLog(){
    var checkbox = document.getElementById("checkbox");
    
    var newLog = document.getElementById("newLog").value;
    if (newLog !=""){
        db.collection('Session-insight').add(    
            {                
                sessionID: sessionID.toString(),
                sessionLog: newLog.toString(),
                VideoLink: checkbox.checked.toString(),
                DateTime: firebase.firestore.FieldValue.serverTimestamp(),
                OwnerId: userid.toString()
            })
        }
    else {
        window.alert("Failed to add");
        location.reload();
    }
    document.getElementById('newLog').value=" ";
    checkbox.checked=false;

    
}



// Real-time listener (Getting real-time data)
db.collection('Session-insight').where("sessionID", "==", sessionID ).orderBy("DateTime","asc").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type == 'added'){
        renderResponse(change.doc);
    } else if (change.type == 'removed') {
        let li = logList.querySelector('[data-id=' + change.doc.id + ']');
        logList.removeChild(li);
    }
    })
})

