import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://burger-builder-amans199.firebaseio.com/'
})
export default instance