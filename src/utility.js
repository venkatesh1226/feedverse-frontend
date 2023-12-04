// import { authapi } from "./constant";

// export const isLoggedIn = () => { 
//     return sessionStorage.getItem('access_token') !== null&&isRefreshTokenExpired()===false;
// };
// export const saveToken = (response) => {
//     sessionStorage.setItem("access_token", response.access_token);
//     sessionStorage.setItem("refresh_token", response.refresh_token);
//     sessionStorage.setItem("expires_in", response.expires_in);
//     sessionStorage.setItem("refresh_expires_in", response.refresh_expires_in);
// };
// export const isTokenExpired = () => {
//     const expiresIn = sessionStorage.getItem('expires_in');
//     return Date.now() > expiresIn;
// };

// export const isRefreshTokenExpired = () => { 
//     const refreshExpiresIn = sessionStorage.getItem('refresh_expires_in');
//     return Date.now() > refreshExpiresIn;
// };

// export const refreshToken = async () => {
//     const refreshToken = sessionStorage.getItem('refresh_token');
//     const response = await fetch(authapi+"/update-token", {
//         method: 'POST',
//         headers: {
//             // headers if required
//         },
//         body: JSON.stringify({ refreshToken: refreshToken })
//     });
//     const data = await response.json();
//     saveToken(data);
// };

// export const fetchWithToken = async (url, options = {}) => {
//     if (isTokenExpired()) {
//         await refreshToken();
//     }
//     const accessToken = sessionStorage.getItem('access_token');
//     const mergedOptions = {
//         ...options,
//         headers: {
//             ...options.headers,
//             'Authorization': `Bearer ${accessToken}`
//         }
//     };
//     return fetch(url, mergedOptions);
// };


