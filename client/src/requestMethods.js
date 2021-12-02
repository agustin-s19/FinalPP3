import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODhhNGFkZDhkZmEwZjZmNzQ3M2E0OSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjc4MTQxNCwiZXhwIjoxNjM2OTU0MjE0fQ.x41wPnlNSKm9LAkRo5YvrxZip4SeOoBpGP7W7cgYPIo";

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});


export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}` }
})