import axios from 'axios'

// path to send requests to store data in the firebase database
const instance = axios.create({
  baseURL: 'https://order-up-10c9a.firebaseio.com/'
})

export default instance
