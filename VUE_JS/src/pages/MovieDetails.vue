<template>
  <section class="info-movie-section">
    <div class="back-button">
      <router-link :to="{ name: 'home' }">
        <span class="home">Home</span>
      </router-link>
    </div>
    <div class="card-info-movie" v-if="isInfoMovie(movie)">
      <div class="movie-header">
        <h1 class="movie-title">{{ movie.Title }}</h1>
        <p class="movie-year">{{ movie.Year }}</p>
      </div>
      <div class="movie-details">
        <div class="movie-detail" v-if="movie.Rated">
          <h2>Rated:</h2>
          <p>{{ movie.Rated }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Released">
          <h2>Released:</h2>
          <p>{{ movie.Released }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Runtime">
          <h2>Runtime:</h2>
          <p>{{ movie.Runtime }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Genre">
          <h2>Genre:</h2>
          <p>{{ movie.Genre }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Director">
          <h2>Director:</h2>
          <p>{{ movie.Director }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Writer">
          <h2>Writer:</h2>
          <p>{{ movie.Writer }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Actors">
          <h2>Actors:</h2>
          <p>{{ movie.Actors }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Plot">
          <h2>Plot:</h2>
          <p>{{ movie.Plot }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Language">
          <h2>Language:</h2>
          <p>{{ movie.Language }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Country">
          <h2>Country:</h2>
          <p>{{ movie.Country }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Awards">
          <h2>Awards:</h2>
          <p>{{ movie.Awards }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Metascore">
          <h2>Metascore:</h2>
          <p>{{ movie.Metascore }}</p>
        </div>
        <div class="movie-detail" v-if="movie.imdbRating">
          <h2>IMDb Rating:</h2>
          <p>{{ movie.imdbRating }}</p>
        </div>
        <div class="movie-detail" v-if="movie.imdbVotes">
          <h2>IMDb Votes:</h2>
          <p>{{ movie.imdbVotes }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Type">
          <h2>Type:</h2>
          <p>{{ movie.Type }}</p>
        </div>
        <div class="movie-detail" v-if="movie.DVD">
          <h2>DVD Release:</h2>
          <p>{{ movie.DVD }}</p>
        </div>
        <div class="movie-detail" v-if="movie.BoxOffice">
          <h2>Box Office:</h2>
          <p>{{ movie.BoxOffice }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Production">
          <h2>Production:</h2>
          <p>{{ movie.Production }}</p>
        </div>
        <div class="movie-detail" v-if="movie.Website">
          <h2>Website:</h2>
          <p>
            <a :href="movie.Website" target="_blank">{{ movie.Website }}</a>
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading movie details...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "@/store/movies.store";
import type { InfoMovie, Movie } from "@/model/movie.model";

const route = useRoute();
const movieId = route.params.id as string;
const moviesStore = useMoviesStore();
const movie = computed(() => moviesStore.currentMovie);



onMounted(async () => {
  if (moviesStore.listMovies.length === 0) {
    await moviesStore.getMovies();
  }
  await moviesStore.getMovieDetailsById(movieId);
});



if (movie.value) {
  console.log("Movie details:", movie.value);
} else {
  console.log("No movie details found.");
}

function isInfoMovie(movie: Movie | InfoMovie | null): movie is InfoMovie {
  return movie !== null && "Rated" in movie;
}
</script>

<style lang="scss" scoped>
.info-movie-section {
  background: $secondary;
  height: 100vh;
  .back-button {
    height: 5%;
    background: $primary; 
    color: $white;
    font-size: 18px;
    padding: 3px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .home {
      color: $white;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: $success;
        transition: color 0.3s ease;
      }
    }
  }

  .card-info-movie {
    background: $white; 
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: 13px;
    max-width: 800px;
    height: auto;
    margin: 0 auto;

    .movie-header {
      text-align: center;
      margin-bottom: 20px;

      .movie-title {
        font-size: 2em;
        margin: 0;
        color: $secondary;
      }

      .movie-year {
        font-size: 1.2em;
        color: $info;
        margin: 5px 0;
      }
    }

    .movie-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      .movie-detail {
        h2 {
          font-size: 1em;
          color: $primary;
          margin: 0;
          font-weight: bold;
        }

        p {
          font-size: 0.9em;
          color: $info;
          margin: 5px 0;
        }

        a {
          color: $primary;
          text-decoration: underline;

          &:hover {
            color: $success;
          }
        }
      }
    }
  }

  .loading {
    text-align: center;
    font-size: 1.2em;
    color: $info;
  }
}
</style>