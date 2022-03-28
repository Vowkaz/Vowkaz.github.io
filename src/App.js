import React, { useEffect, useState } from 'react';
import './app.css';
import tmdb from './api/tmdb';
import movieRow from './components/movieRow';
import featureMovie from './components/featureMovie';
// import header from './components/header';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featureData, setFeatureData] = useState(null);
//  const [blackHeader, setBlackHeader] = useState(false);
    useEffect(()=>{
        const loadAll = async() => {
            let list= await tmdb.getHomeList();
            setMovieList(list);

            let originals = list.filter( i=>i.slug === 'originals');
            let randomChoose = Math.floor(Math.random() * (originals[0].itens.results.length));
            let choose = originals[0].itens.results[randomChoose];
            let chooseInfo = await tmdb.getMovieInfo(choose.id, 'tv');
            setFeatureData(chooseInfo);
        }

        loadAll();
    }, []);

        /*useEffect(()=>{
            const scrollListener = () => {
                if(window.scrollY > 15) {
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
        //pro html ->  <header  black={blackHeader} /> */

    return (
        <div className="page">

            {featureData && 
            <featureMovie item={featureData} />
            }

            <section className="lists">
                {movieList.map((item, key)=>(
                    <movieRow key={key} title={item.title} itens={item.itens}>

                    </movieRow>
                ))}
            </section>

            <footer>
                Feito com <span role="img" aria-label="coração">🖤</span><br/>
                Direitos de imagem para Netflix<br/>
                Dados coletados pela themoviedb.org
            </footer>
        </div>
    )
}