import React from 'react';
import axios from "axios";
import Movie from "./Movie";

import './css/App.css';

class App extends React.Component {
  
  //API의 값은 유동적으로 추가되고 변화될 수 있으니 state로 받아온다.
  state = {
    isLoading: true,
    movies: []
  };

  //Axios의 기능중 하나인 async은 호출되기 전에 사용되지 않도록 재워두는 것이다.
  GetMovies = async () => {
    //Axios를 이용해 API를 받아옴
    const { data:  { data: { movies }} } = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating");
    console.log(movies);

    //setState를 이용해 state-movies[] 배열에 불러온 API값을 넣어준다.
    //원레는 this.setState({ movies: movies }) 이지만 ({ movies })도 인식된다.
    this.setState({ movies, isLoading: false });
  }

  //랜더함수가 호출되고 난 후 실행
  componentDidMount(){
    //API호출해오기
    this.GetMovies();
  }

  render(){
  //const를 이용해 this.state를 해두면 state를 사용할때 this를 쓸 필요가 없다.
  const { isLoading, movies } = this.state;

  return(
        <section className="container ">
          {isLoading ?
            
          <div className="loader">
            <span className="loader__text">로딩중...</span>
          </div>  :
          <div className="movies">
             {movies.map( movie => {
          return <Movie id={movie.id} year={movie.year} title={movie.title} summary={movie.summary} //API의 지정된 이름과 Prop의 이름을 같게한 후 값을 가져온다. 또한 Movie.js의 prop를 import해준다.
                  medium_cover_image={movie.medium_cover_image} key={movie.id} genres={movie.genres}/> 
              })}
          </div>  
         }
        </section>
    );
  }
}

export default App;
