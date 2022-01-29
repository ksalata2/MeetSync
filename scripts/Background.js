/**
 * primary job of this thing is to listen for alarms
 */

chrome.alarms.onAlarm.addListener(function(alarm){
    console.log("AN ALARM HAPPENED YOOOOOOO");

    var event = Calendar.matchNameEvent(alarm.name);
    // find corresponding event to alarm

    chrome.notifications.create(event.name, {type: "basic", iconUrl: "../icon16.png", title: event.name, message: "Happening NOW", requireInteraction: true});
    // push notification
});

chrome.notifications.onClicked.addListener(function(notificationId){
    console.log("notif clicked!");

    var idSplit = notificationId.split("/");
    var name = idSplit[idSplit.length - 1];
    // notificationId is a big ugly string
    // and when you delimit by / then the last item is the event name

    var event = Calendar.matchNameEvent(name);
    // grab event that matches that name

    window.open(event.link, "_blank");
    // open new tab to event link
});