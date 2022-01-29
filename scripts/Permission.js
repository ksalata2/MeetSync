 // Ask for permission
 //console.log(Notification.permission);

if(Notification.permission === "granted") {
     
}
else if(Notification.permission !== "denied") {
   Notification.requestPermission().then(permission => {
       if(permission === "granted") {
            // Permission granted
       }
   })
}

class Noti {
    static showevents(event) {
        const notif = new Notification("New Meeting!", {
            body: "Placeholder for meeting detail"
        })

        // Opens the meeting link
        notif.onclick = (e) => {
            let link = event.link;
            //console.log("link " + event.link);
            window.open(link);
        }
    }
}
