var sessionID = localStorage.getItem("sessionId");
var sessionName = localStorage.getItem("sessionName");
var header = document.getElementById('header');
header.textContent = sessionName;

const logList = document.querySelector('#log-list');

function renderResponse(doc){
    let session_li = document.createElement('li');
    var logValue;

    if (doc.data().VideoLink == 'true'){
        var str = doc.data().sessionLog;
        var res = str.split("=");
        var embeddedUrl = "https://www.youtube.com/embed/"+res[1];
        logValue = document.createElement('iframe');
        logValue.setAttribute('id',"ytplayer");
        logValue.setAttribute('type',"text/html");
        logValue.setAttribute('width',"100%");
        logValue.setAttribute('height',"360");
        logValue.setAttribute('src',embeddedUrl);
    }
    else{

        logValue = document.createElement('span');
        logValue.textContent = doc.data().sessionLog;
    }

    session_li.setAttribute('data-id',doc.id);

    session_li.appendChild(logValue);


    logList.appendChild(session_li);

    

}

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

