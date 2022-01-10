import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setmovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState("");

  const nameChangeHandler = (e) => {
    setMovieName(e.target.value);
  };

  const reviewChangeHandler = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setmovieReviewList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setmovieReviewList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>Crud Aplication</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={nameChangeHandler} />
        <label>Review:</label>
        <input type="text" name="review" onChange={reviewChangeHandler} />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
