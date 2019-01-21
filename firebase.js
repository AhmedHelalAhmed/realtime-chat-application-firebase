// file: scriptjs.js
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNbbbiNaC86MyBVSwfy6epdlqSH2LOHGw",
    authDomain: "realtimechat-80552.firebaseapp.com",
    databaseURL: "https://realtimechat-80552.firebaseio.com",
    projectId: "realtimechat-80552",
    storageBucket: "",
    messagingSenderId: "935946415869"
  };
  firebase.initializeApp(config);




// create firebase database reference
var dbRef = firebase.database();
// make collection with name contacts and refer to it
var contactsRef = dbRef.ref('messages');



//load older conatcts as well as any newly added one...
// fire n times where n is the old records stored to get the old one
// fire when add new record also
contactsRef.on("child_added", function (snap)
{
    // console.log(snap);
    // console.log("added", snap.key, snap.val);
    document.querySelector('#chat-messages').innerHTML += contactHtmlFromObject(snap.val());
});




// save contact
// fire when click with class add value
document.querySelector('.send')
        .addEventListener("click", function (event)
        {
            event.preventDefault();
            if (document.querySelector('#name').value != ''
                || document.querySelector('#message').value != '')
            {

                let data={
                    name: document.querySelector('#name').value,
                    message: document.querySelector('#message').value,
                };
                // store to firebase
                contactsRef.push(data);
                //empty the form
                contactForm.reset();
            } else
            {
                alert('Please fill at lease name or email!');
            }
        }, false);





// prepare conatct object's HTML
// render to frontend the new and the old data
function contactHtmlFromObject(message)
{
    var html = '';
    html += '<li class="list-group-item messages">';
    html += '<p class="lead">' + message.name + '</p>';
    html += '<p>' + message.message + '</p>';
    html += '</li>';



    
    return html;
}