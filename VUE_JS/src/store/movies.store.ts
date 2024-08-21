import type { Movie, InfoMovie } from "@/model/movie.model";
import HTTP from "@/api/client-http"
import { defineStore } from "pinia";

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        listMovies: [] as Movie[],
        currentMovie: null as InfoMovie | Movie | null
    }),
    actions: {
        async getMovies(search: string = 'movies') {
            const resp = await HTTP.get('', {
                params: {
                    s: search
                }
            });
            this.listMovies = resp.data.Search;
        },

        async getMovieDetailsById(id: string) {
            const resp = await HTTP.get('', {
                params: {
                    i: id
                }
            });
            this.currentMovie = resp.data as InfoMovie;
        }
    }
});


//Crear nuevo con parametro i en vez de s