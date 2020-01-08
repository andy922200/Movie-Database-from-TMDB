// ./src/utils/helpers.js
import axios from 'axios'
import Swal from 'sweetalert2'

const genreBaseURL = 'https://api.themoviedb.org/3/genre/movie/'
const movieBaseURL = 'https://api.themoviedb.org/3/discover/'
const trailerBaseURL = 'https://api.themoviedb.org/3/movie/'
const searchBaseURL = 'https://api.themoviedb.org/3/search/'

export const movieApiHelper = axios.create({
  baseURL: movieBaseURL
})

export const genreApiHelper = axios.create({
  baseURL: genreBaseURL
})

export const trailerApiHelper = axios.create({
  baseURL: trailerBaseURL
})

export const searchApiHelper = axios.create({
  baseURL: searchBaseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})