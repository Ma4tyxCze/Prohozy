self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
self.addEventListener(
  "push",
  function(event){

    let data = {
      title: "Prohozy",
      body: "Nové oznámení"
    }

    if(event.data){
      try{
        data = event.data.json()
      }catch(e){}
    }

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
self.addEventListener(
  "notificationclick",
  function(event){

    event.notification.close()

    event.waitUntil(

      clients.openWindow(
        "/Prohozy/"
      )

    )

  }
)
