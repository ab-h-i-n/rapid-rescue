export default async function getAmbulanceLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
          },
          (error) => {
            reject(new Error('Unable to retrieve location.'));
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
  