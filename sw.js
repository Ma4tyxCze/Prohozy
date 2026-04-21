self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener(
  "activate",
  function(event){

    event.waitUntil(
      self.clients.claim()
    )

  }
);

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
);

self.addEventListener(
  "notificationclick",
  function(event){

    event.notification.close()

    event.waitUntil(

      clients.matchAll({
        type: "window",
        includeUncontrolled: true
      }).then(function(clientList){

        for(let i = 0; i < clientList.length; i++){

          const client = clientList[i]

          if(client.url.includes("/Prohozy/")){

            return client.focus()

          }

        }

        return clients.openWindow(
          "/Prohozy/"
        )

      })

    )

  }
);
