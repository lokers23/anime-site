import axios from 'axios';

export class AnimeTopService{
    private static URL:string = 'https://api.jikan.moe/v4/top/anime';

    public static getListTopAnime(page:number){
        if(page <= 1){
            return axios.get(AnimeTopService.URL);
        }
        
        return axios.get(`${AnimeTopService.URL}?page=${page}`);
    }
}