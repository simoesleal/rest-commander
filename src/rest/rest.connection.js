import axios from 'axios'

export const RestConnection = axios.create({
  baseURL: 'http://localhost:9000/api/v1/'
})
export const RestConnectionImagem = axios.create({
  baseURL: 'http://localhost:9000/api/v1/',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
