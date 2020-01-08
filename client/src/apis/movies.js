// ./src/apis/movies.js
import { movieApiHelper, genreApiHelper, trailerApiHelper, searchApiHelper } from '../utils/helpers'

export default {
  getGenreList() {
    return genreApiHelper.get(`/list`, { params: { api_key: process.env.VUE_APP_MOVIE_DB_API, language: "en-US" } })
  },
  getGenreMovies({ genreId, year, page }) {
    return movieApiHelper.get(`/movie`, {
      params: {
        api_key: process.env.VUE_APP_MOVIE_DB_API,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
        page: page,
        year: year,
        with_genres: genreId
      }
    })
  },
  getTrailer(movieId) {
    return trailerApiHelper.get(`/${movieId}/videos`, { params: { api_key: process.env.VUE_APP_MOVIE_DB_API, language: "en-US" } })
  },
  getInitialMovies({ year, page }) {
    return movieApiHelper.get(`/movie`, {
      params: {
        api_key: process.env.VUE_APP_MOVIE_DB_API,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
        page: page,
        year: year,
      }
    })
  },
  searchMovies({ query, page, year }) {
    return searchApiHelper.get(`/movie`, {
      params: {
        api_key: process.env.VUE_APP_MOVIE_DB_API,
        language: "en-US",
        query: query,
        include_adult: "false",
        page: page,
        year: year,
      }
    })
  }
}