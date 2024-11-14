export const requestNotificationPermission = () => {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
};

export const showOSNotification = (title: string, body: string) => {
  if ("Notification" in window && Notification.permission === "granted") {
    const notification = new Notification(title, {
      body,
      icon: "/aivio-logo.png",
    });

    notification.onclick = () => {
      if (window.parent) {
        window.parent.focus();
      }
      window.focus();
      notification.close();
    };
  }
};
