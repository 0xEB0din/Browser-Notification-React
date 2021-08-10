import React from "react";
import usePushNotifications from "./usePushNotifications";



  const isConsentGranted = userConsent === "granted";

  return (
    <main>
      <p>
        Push notification are {!pushNotificationSupported && "NOT"} supported by
        your device.
      </p>

      <p>
        User consent to recevie push notificaitons is{" "}
        <strong>{userConsent}</strong>.
      </p>

      <button
        disabled={!pushNotificationSupported || isConsentGranted}
        onClick={onClickAskUserPermission}
      >
        {isConsentGranted ? "Consent granted" : " Ask user permission"}
      </button>

      <div>
        <button onClick={onClickSendNotification}>Send a notification</button>
      </div>
    </main>
  );
}

export default function PushNotificationDemo() {
  const {
    userConsent,
    pushNotificationSupported,
    onClickAskUserPermission,
    onClickSendNotification,
  } = usePushNotifications();