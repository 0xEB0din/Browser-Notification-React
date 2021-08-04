/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
  return "serviceWorker" in navigator;
}

/**
 * registering a service worker to do the job
 */
const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("sw.js"); //notice the file name
  return swRegistration;
};

/**
 * requesting user permission to disaplay notifications
 */
const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};
/**
 * notification template and trigger function
 */
const showLocalNotification = (
  title,
  notificationCount,
  appName,
  swRegistration
) => {
  const text = `There are ${notificationCount} new notifications from ${appName}!`;
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
  swRegistration.showNotification(title, options);
};

/**
 * Combined trigger
 * */
const sendWebNotification = async (title, count, appName) => {
  if (isPushNotificationSupported()) {
    const swRegistration = await registerServiceWorker();
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      showLocalNotification(title, count, appName, swRegistration);
    }
    // showLocalNotification("HSBC Evolve", 14, "Evolve", swRegistration);
  }
};

const sendLog = () => {
  console.log("log sent");
};

export { sendWebNotification, sendLog };
