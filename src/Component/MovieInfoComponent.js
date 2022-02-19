import axios from "axios";
import { useEffect ,useState} from "react";
import styled from "styled-components";
import { API_KEY } from "../App";
// import load from "../images/load.gif";

const Container=styled.div`
display:flex;
flex-direction:row;
padding:20px 30px;
justify-content:center;
border-bottom:1px solid ligtgray;
justify-content:flex-start;
`;

const CoverImg = styled.img`
object-fit:cover;
height:362px;
`;

const InfoColumn = styled.div`
display:flex;
flex-direction:column;
margin:20px;
`;

const MovieName=styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:15px 0;
white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
text-transform:capitalize;
`;

const MovieInfo = styled.span`
font-size:18px;
font-weight:600;
color:black;
margin:4px 0;
text-transform:capitalize;
text-overflow:ellipsis;
overflow:hidden; 
& span{
    opacity:0.5;
    }
`;
const Cross = styled.span`
font-size:16px;
font-weight:600;
color:block;
background:lightgray;
height:fit-content;
border-radius:50%;
cursor:pointer;
opacity:0.8;
`;

const MovieInfoComponent = (props) => {
    const [movieInfo, setMovieInfo] =useState();
    const {selectedMovie}=props;

    useEffect(()=>{
        axios
        .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response)=>setMovieInfo(response.data));
    },[selectedMovie]);

  return <Container>
      <CoverImg src={movieInfo?.Poster} alt="image" />
        <InfoColumn>
            <MovieName>{movieInfo?.Type}: {movieInfo?.Title}</MovieName>
            <MovieInfo>IMDB Rating: <span>{movieInfo?.imdbRating}</span></MovieInfo>
            <MovieInfo>Year: <span>{movieInfo?.Year}</span></MovieInfo>
            <MovieInfo>Language: <span>{movieInfo?.Language}</span></MovieInfo>
            <MovieInfo>Rated: <span>{movieInfo?.Rated}</span></MovieInfo>
            <MovieInfo>Released: <span>{movieInfo?.Released}</span></MovieInfo>
            <MovieInfo>Genre: <span>{movieInfo?.Genre}</span></MovieInfo>
            <MovieInfo>Director: <span>{movieInfo?.Director}</span></MovieInfo>
            <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
            <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>
        </InfoColumn>
      <Cross onClick={()=>props.onMovieSelect()}> X </Cross>

    </Container>;
};

export default MovieInfoComponent
