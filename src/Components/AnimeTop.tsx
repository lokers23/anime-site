import React, {useState, useEffect} from 'react';
import { Anime } from '../modules/AllInterfaces';
import { AnimeTopService } from '../services/AnimeTopService';
import '../animeCard.css';

interface IState{
    loading: boolean;
    animes: Anime[];
    errorMsg: string;
    currentPage:number;
}

const AnimeTop: React.FC = (props) => {
    const [page, setPage] = useState<number>(1);
    const[state, setState] = useState<IState>({
        loading:false,
        animes:[] as Anime[],
        errorMsg: '',
        currentPage: page
    });

    const nextPage = ()=>{
        setPage(page + 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

    const prevPage = () => {
        page > 0 && setPage(page - 1);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

    useEffect(() => {
        setState({...state, loading:true});
        AnimeTopService.getListTopAnime(page)
        .then(res => setState({...state, loading:false, animes: res.data.data}))
        .catch(err => setState({...state, loading:false, errorMsg:err.message }));
    },[page]);

    const {loading, animes, errorMsg} = state;

    

    return (
        <>
        <div>
            <h1 className='caption'>TOP ANIME</h1>
            <div className='generalContainer'>
                {errorMsg && (<p>{errorMsg}</p>)}
                {loading && <h1>Loading...</h1>}
                {
                    animes.length > 0 && animes.map(anime => (
                        <span key={anime.mal_id} className="card">
                            <img src={anime.images.jpg.image_url} className="img-card"></img>
                            <div className="container">
                                <h2>Rank: {anime.rank}</h2>
                                <h3>{anime.title}</h3>
                                <h4>Score: {anime.score}</h4>
                                <div>
                                    <ul className='genres'>
                                        {
                                            anime.genres.length > 0 && anime.genres.map(genre => (
                                                <li className='genre'>{genre.name}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <p>Year: {anime.year || 'none'}</p>
                            </div>
                        </span>
                    ))
                }
            </div>
            <div>
                <button onClick={prevPage}>Prev 50</button>
                <button onClick={nextPage}>Next 50</button>
            </div>
        </div>
        </>
    )
}

export default AnimeTop;