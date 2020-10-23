export function register() {
  const swPath = `http://localhost:3000/serviceWorker.js`;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(swPath).then(registration => {
      console.log("Service worker registered");
    });
  }
}
