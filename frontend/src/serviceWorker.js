export function register() {
  const swPath = `${process.env.PUBLIC_URL}/serviceWorker.js`;

  if ("serviceWorker" in navigator && process.env.NODE_ENV !== "production") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then(() => {
        console.log("Service worker registered");
      });
    });
  }
}
