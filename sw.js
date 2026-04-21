self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
self.addEventListener(
  "push",
  function(event){

    const data =
      event.data.json()

    event.waitUntil(

      self.registration.showNotification(
        data.title,
        {
          body: data.body,
          icon:
            "/Prohozy/icons/icon_192.png",
          badge:
            "/Prohozy/icons/icon_192.png"
        }

      )

    )

  }
)
