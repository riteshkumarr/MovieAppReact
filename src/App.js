import styled from 'styled-components';
import React, { useState } from 'react';
import search from './images/63061-search-in-out.gif'
import logo from './images/movie-theatre.gif'
import MovieComponent from './Component/MovieComponent';
import axios from 'axios';
import MovieInfoComponent from './Component/MovieInfoComponent';

export const API_KEY='4041cd25';

const Container=styled.div`
display:flex;
flex-direction:column`;
const Header =styled.div`
display:flex;
flex-direction:row;
background-color:black;
color:white;
justify-content:space-between;
align-items:center;
padding:10px;
font-size:25px;
font-weight:bold;
font-family:'Josefin Sans', sans-serif;
box-shadow:0 3px 6px 0 #555;
`;
const AppName=styled.div`
display:flex;
padding:10px;
flex-direction:row;
align-items:center;
`
const MovieImg=styled.img`
width:48px;
height:48px;
margin:15px;
`
const SearchBar=styled.div`
flex-direction:row;
display:flex;
padding:10px 10px;
background-color:#fff;
border-radius:6px;
margin-right:20px;
align-item:center;
width:50%;
`
const SearchIcon=styled.img`
width:32px;
height:32px;
`
const SearchInput=styled.input`
color:black;
font-size:16px;
font-weight:bold;
outline:none;
border:none;
width:70%;
margin-left:15px;
`;

const MovieListContainer =styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:30px;
gap:24px;
justify-content:space-evenly;
`
function App() {
  const[searchQuery, updateSearchQueary]=useState();
  const[timeoutId,updateTimeoutId]=useState();
  const[movieList,updateMovieList]=useState();
  const[selectedMovie,onMovieSelect]=useState();
  
  
  const fetchData=async (searchString)=>{
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`);
    console.log(response);
    updateMovieList(response.data.Search)
  };

  const onTextChange=(e)=>{
    clearTimeout(timeoutId);
    updateSearchQueary(e.target.value);
    const timeout = setTimeout(()=>fetchData(e.target.value),500)
    updateTimeoutId(timeout);
  
  };
  return (
  <>
    <Container>
      <Header><AppName>
        <MovieImg img src={logo} alt="Loading..."/>
       React Movie App
        </AppName>
        <SearchBar>
        <SearchIcon img src={search} alt="Search"/>
        <SearchInput placeholder='Search Movie' 
          value={searchQuery}
        onChange={onTextChange}/>
        </SearchBar>  
      </Header>
      {selectedMovie &&
      (<MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={onMovieSelect}
      />
      )} 
      <MovieListContainer>
        {movieList?.length
        ? movieList.map((movie,index)=> 
          <MovieComponent 
          key={index}
          movie={movie}
          onMovieSelect={onMovieSelect}
          />
        ) 
        : "No Movie Search"}
      </MovieListContainer>
    </Container>
  </> 
);
}

export default App;
