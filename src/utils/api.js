// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://pos-backend-api-1-qwiw.onrender.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });



// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;