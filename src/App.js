import React from 'react';
import { useState, useEffect } from "react"
import styled from "styled-components";
import axios from 'axios';
import "./App.css"

function App() {
  const endpoint = `https://www.omdbapi.com/?s=batman&apikey=79d2cb25`

  const [Movies, setMovies] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [Loading, setLoading] = useState(true)

  const fetchMovies = async () => {
    const res = await fetch(endpoint)
    const data = await res.json()
    setMovies(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMovies()
  })

  const searchMovies = (searchValue) => {
    setSearchInput(searchValue)

    if (searchInput) {
      const filteredSearch = Movies.Search.filter((movie) =>
        Object.values(movie)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredSearch)
    } else {
      setFiltered(Movies)
    }
  }

  useEffect(() => {
    const { data } = axios.get('https://www.omdbapi.com/?s=batman&apikey=79d2cb25',
    {
      
    });
  
    console.log(data)   
    }, []);
    
  

  return (
    <div className="App">
      <Nav>
        <div className="border">
          <img src="assets/MyTestApp.svg" alt="logo-img"/>
        </div>
      </Nav>
      <Background>
       <img src="assets/Rectangle 5.png"  alt="background-img"/>
       <div className="text">
          <p>Watch  something  incredible.</p>
       </div>
      </Background>

      <Search>
        <p>Search</p>
        <input 
        type='text'
        name="text"
        id="text"
        placeholder="Search movies..."
        onChange={(e) => searchMovies(e.target.value)}/>

      </Search> 
      
      {Loading ? <h2>Loading Batman Categories...</h2> : <Section>
      {searchInput && searchInput.length > 1 
      ? filtered && filtered.map(({imdbID, Title, Poster}) => (
          <Container>
            <div className='items'>
             <div key={imdbID} className='results'>
                <div className='overlay'></div>
                  <img src={Poster} alt="poster-img"/>
                  <h2>{Title}</h2>
              </div>
              </div>
          </Container> 
      
    ))
  : Movies.Search && Movies.Search.map(({ imdbID, Title,  Poster, Type}) => ( 
      <>
        <Container>
          <div className='items'>
            <div key={imdbID} className='results'>
            <div className='overlay'></div>
              <img src={Poster} alt="poster-img"/>
              <h2>{Title}</h2>
              <h3> Category: {Type}</h3>
            </div>
          </div>
      </Container>
      </>
      
     
     ))}
      </Section>}
      
    </div>
  );
}

export default App;

const Nav = styled.div`
  background: #292929;
  padding: 30px 20px;
  position:relative;

  @media (max-width: 600px) {
    display: flex;
    align-items:center;
    justify-content:center;
  }

  .border{
    border: 2px solid white;
    width: 170px;
    padding: 10px 5px;
    margin-left:30px;

    @media (max-width: 600px) {
      margin-left:0px;
    }
  }
 
`;

const Container = styled.div`
  padding:20px 30px;

  .items{
    display: flex;
    align-items:center;
    justify-content:space-between;
    .results{
      margin-top:30px;
      position:relative;
      .overlay{
        position:absolute;
        top:0;
        left:0;
        background-color:black;
        width:300px;
        height:300px;
        opacity:0.5;
        border-radius:10px;
        @media (max-width: 768px) {
          width:150px;
          height:150px;
        }

        @media (max-width: 600px) {
          width:200px;
          height:200px;
        }
        

      }
      img{
        width:300px;
        height:300px;
        border-radius:10px;
        @media (max-width: 768px) {
          width:150px;
          height:150px;
        }

        @media (max-width: 600px) {
          width:200px;
          height:200px;
        }
      }
      h2{
        font-size:25px;
        position:absolute;
        color:white;
        top:70px;
        left:30px;
        @media (max-width: 768px) {
          font-size:15px;
        }
      }
      h3{
        margin-left:10px;
        @media (max-width: 768px) {
          font-size:15px;
        }
      }
    }
    
  }
  
  
`;

const Section = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  padding:20px 30px;
  flex-wrap:wrap;
  @media (max-width: 600px) {
    padding:10px 40px;   
  }
`;

const Background = styled.div`
  position:relative;
  .text{
    position:absolute;
    top:60px;
    left:37px;
    line-height:93.74px;
    width:490px;
    height:282px;
    font-family: DM Sans;

    @media (max-width: 600px) {
      top:130px;
      left:40px;
      width:80%;
      line-height:36.46px;
      text-align:center;
    }

    p{
      color:white;
      font-size:72px;
      font-weight:700;
      @media (max-width: 600px) {
        font-size:28px;
      }

    }
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction:column;
  padding: 20px 30px;

  & input{
    border: 1px solid #000000;
    width:85%;
    padding:10px 10px;
    @media (max-width: 600px) {
      width:75%;
    }
    :focus{
      outline:none;
    }
  }
`;

