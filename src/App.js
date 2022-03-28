import React, {useEffect, useState} from 'react';
import './app.css';
//database&&Api
import tmdb from './api/tmdb';
//Components
import MovieRow from './components/movieRow';
import FeatureMovie from './components/featureMovie';
import Header from './components/header';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState([]);
    const [blackHeader, setBlackHeader] = useState(false);
    useEffect(() => {
        const loadAll = async () => {
            let list = await tmdb.getHomeList();
            setMovieList(list);

            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
            setFeatureData(chosenInfo);
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 15) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return (
        <div className="page">

            <Header black={blackHeader}/>

            {featureData &&
                <FeatureMovie item={featureData}/>
            }

            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}>

                    </MovieRow>
                ))}
            </section>
            {movieList.length <= 0 &&
                <div className="loading">
                    <img
                        src="https://media2.giphy.com/media/tA4R6biK5nlBVXeR7w/giphy.gif?cid=790b76110d5136daf49e3a709ca19ac978f8a8ba66f20223&rid=giphy.gif&ct=g"
                        alt="loading"/>
                </div>}

        </div>
    )
}