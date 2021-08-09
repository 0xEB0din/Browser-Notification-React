const isNotficiationSupported = () => {
  return "serviceWorker" in navigator;
};

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("sw.js"); //notice the file name
  return swRegistration;
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  return permission;
};

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

function sendWebNotification(title, count, appName) {
  if (isNotficiationSupported) {
    registerServiceWorker().then(
      requestNotificationPermission().then((permission) => {
        if (permission === "granted") {
          navigator.serviceWorker.ready.then((swRegistration) =>
            showLocalNotification(title, count, appName, swRegistration)
          );
        }
      })
    );
  }
}

const sendLog = () => {
  console.log("log sent");
};

export { sendWebNotification, sendLog };
