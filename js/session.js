const sessionList = document.querySelector('#session-list');
const form = document.querySelector('#add-response');
var userId = localStorage.getItem("userId");
function renderResponse(doc){
    if (userId==doc.data().OwnerId){
        let session_li = document.createElement('li');
        let session_name = document.createElement('span');
        let session_click = document.createElement('BUTTON');
        let session_cross = document.createElement('div');
        let session_enter = document.createElement('BUTTON');
    
        
        session_li.setAttribute('data-id',doc.id);
        session_name.textContent = doc.data().SessionName;
        session_click.textContent = "Add Content";
        session_enter.textContent = "Enter Session";
        session_cross.textContent = 'x';
    
    
        session_li.appendChild(session_name);
        session_li.appendChild(session_click);
        session_li.appendChild(session_cross);
        session_li.appendChild(session_enter);
        sessionList.appendChild(session_li);

        session_click.addEventListener('click', (e) => {
            e.preventDefault();
            var data = doc.data();
            var sessionName = data.SessionName;
            var sessionId = doc.id;
            localStorage.setItem("sessionId",sessionId);
            localStorage.setItem("sessionName",sessionName);
            window.location.href = 'session-insight.html';
        })
        session_enter.addEventListener('click', (e) => {
            e.preventDefault();
            var data = doc.data();
            var sessionName = data.SessionName;
            var sessionId = doc.id;
            localStorage.setItem("sessionId",sessionId);
            localStorage.setItem("sessionName",sessionName);
            window.location.href = 'session-conduct.html';
        })

        session_cross.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('Session').doc(id).delete();
        })
    }
    else{
        let session_li = document.createElement('li');
        let session_name = document.createElement('span');
        let session_cross = document.createElement('div');
        let session_enter = document.createElement('BUTTON');

        session_li.setAttribute('data-id',doc.id);
        session_name.textContent = doc.data().SessionName;
        session_enter.textContent = "Enter Session";
        session_cross.textContent = 'x';

        session_li.appendChild(session_name);
        session_li.appendChild(session_cross);
        session_li.appendChild(session_enter);

        sessionList.appendChild(session_li);

        session_enter.addEventListener('click', (e) => {
            e.preventDefault();
            var data = doc.data();
            var sessionName = data.SessionName;
            var sessionId = doc.id;
            localStorage.setItem("sessionId",sessionId);
            localStorage.setItem("sessionName",sessionName);
            window.location.href = 'session-conduct.html';
        })

        session_cross.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('Session').doc(id).delete();
        })
    }
}
function logOut(){
    window.location.href = "index.html";
}
function createSession(){
    var newSession = document.getElementById("newSession").value;
    if (newSession !=""){
        
        db.collection('Session').add(    
            {
                SessionName: newSession.toString(),
                DateTime: firebase.firestore.FieldValue.serverTimestamp(),
                OwnerId: userId.toString()

            });
        }
    else {
        window.alert("Failed to add");
        location.reload();
    }
    newSession.value = "";
}
function clearTxt(){
    document.getElementById("newSession").value = ' ';
}

// Real-time listener (Getting real-time data)
db.collection('Session').orderBy("DateTime","asc").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type == 'added'){
        renderResponse(change.doc);
    } else if (change.type == 'removed') {
        let session_li = sessionList.querySelector('[data-id=' + change.doc.id + ']');
        sessionList.removeChild(session_li);
    }
    })
})

