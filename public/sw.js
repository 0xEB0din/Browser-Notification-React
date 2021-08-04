self.addEventListener("notificationclick", (event) => {
  event.waitUntil(self.clients.openWindow("/"));
});
