
const port = 8000;
export const backendUrlUser = `http://localhost:${port}/user`; // /register - POST, /login - POST, /getBookings/:userId - GET
export const backendUrlPackage = `http://localhost:${port}/package`; // /hotDeals -> GET, /destinations -> GET, 
export const backendUrlBooking = `http://localhost:${port}/book`; // /:userId/:destinationId -> POST, /cancelBooking/:bookingId -> DELETE, /getDetails/:destinationId - GET, 
export const backendUrlGetBookings = `http://localhost:${port}/getBookings/`//  /getDetails/:destinationId - GET
export const backendUrlGetPackage = `http://localhost:${port}/getPackages/`// /destinations -> GET
export const backendUrlGetHotDeals = `http://localhost:${port}/getHotDeals`// /hotDeals -> GET
export const backendUrlCancelBooking = `http://localhost:${port}/cancelBooking/`// /cancelBooking/:bookingId -> DELETE
export const backendUrlCreateBooking = `http://localhost:${port}/createBooking/`// /:userId/:destinationId -> POST