const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

export const NearestHospital = (hospitals, position) => {
    const { latitude: userLat, longitude: userLon } = position;

    // Calculate the distance to each hospital and find the nearest one
    let nearestHospital = null;
    let minDistance = Infinity;

    hospitals.forEach(hospital => {
        const { latitude: hospLat, longitude: hospLon } = hospital.location;
        const distance = haversineDistance(userLat, userLon, hospLat, hospLon);

        if (distance < minDistance) {
            minDistance = distance;
            nearestHospital = hospital;
        }
    });

    return nearestHospital;
};
