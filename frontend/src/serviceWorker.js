export function register() {
  const swPath = `http://localhost:3000/serviceWorker.js`;

  if ("serviceWorker" in navigator && process.env.NODE_ENV !== "production") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(swPath).then(registration => {
        console.log("Service worker registered");
      });
    });
  }
}
