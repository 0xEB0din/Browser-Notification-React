/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
  return "serviceWorker" in navigator;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
async function askUserPermission() {
  return await Notification.requestPermission();
}
/**
 * static notification
 */
function sendNotification() {
  const text = "There are {} new notifications waiting for you!";
  const title = "App Name";
  const timestamp = new Date().getTime() + 10 * 1000;

  const options = {
    body: text,
    vibrate: [200, 100, 200],
    tag: timestamp, // a unique ID
    actions: [
      {
        action: "Detail",
        title: "View",
      },
    ],
    data: {
      url: window.location.href, // pass the current url to the notification
    },
  };
  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}

/**
 *
 */
function registerServiceWorker() {
  return navigator.serviceWorker.register("sw.js", {
    scope: "/",
  });
}

const logger = () => {
  console.log("log sent");
};

export {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  sendNotification,
  logger,
};
