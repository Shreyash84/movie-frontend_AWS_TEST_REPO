import axios from "axios";

/* ================================
   AXIOS INSTANCE
================================ */
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/* ================================
   AUTH
================================ */
export const signUp = (data) => API.post("/auth/signup");
export const login = (formData) =>
    API.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
export const googleLogin = (data) => API.post("/auth/google", data);

/* ================================
   MOVIES
================================ */
export const getMovies = () => API.get("/movie/list");
export const getMovieById = (id) => API.get(`/movie/${id}`);
export const getCurrentlyShowingMovies = () =>
    API.get("/movie/currently-showing");
export const getUpcomingMovies = () => API.get("/movie/upcoming");
export const getTopRatedMovies = (minRating = 7) =>
    API.get("/movie/top-rated", { params: { min_rating: minRating } });

/* ================================
   SHOWTIMES
================================ */
// ❗ NO TRAILING SLASH — prevents redirect/CORS issues
export const getShowtimes = (movieId) =>
    API.get("/showtimes", { params: { movie_id: movieId } });

export const getShowtimeSeats = (showtimeId) =>
    API.get(`/showtimes/${showtimeId}/seats`);

/* ================================
   BOOKINGS
================================ */
export const createBooking = (data) => API.post("/bookings", data);
export const getShowtimeSeatsForBooking = (showtimeId) =>
    API.get(`/bookings/showtime/${showtimeId}/seats`);
export const cancelBooking = (bookingId, data) =>
    API.put(`/bookings/${bookingId}/cancel`, data);
export const updateBooking = (bookingId, data) =>
    API.put(`/bookings/${bookingId}/update`, data);
export const getBookingById = (bookingId) =>
    API.get(`/bookings/${bookingId}`);

/* ================================
   WEBSOCKET
================================ */
export const getShowtimeSocket = (showtimeId) => {
    const baseWs = import.meta.env.VITE_WS_URL || "wss://13.49.63.5";

    return new WebSocket(`${baseWs}/ws/showtime/${showtimeId}`);
};

export default API;
