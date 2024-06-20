// src/App.tsx
import React, { useReducer } from 'react';
import './style.scss';
import { jokes, Joke } from './Joke';

interface State {
    jokes: Joke[];
    filterRating: number | null;
}

type Action = { type: 'FILTER_BY_RATING'; rating: number };

const initialState: State = {
    jokes: jokes,
    filterRating: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'FILTER_BY_RATING':
            return {
                ...state,
                filterRating: action.rating,
            };
        default:
            return state;
    }
};

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const filteredJokes = state.filterRating !== null
        ? state.jokes.filter(joke => joke.rating === state.filterRating)
        : state.jokes;

    return (
        <div className="App">
            <h1>Joke App</h1>
            <div className="filter">
                <label>Filter by rating:</label>
                <select
                    onChange={(e) => dispatch({ type: 'FILTER_BY_RATING', rating: Number(e.target.value) })}
                >
                    <option value="">All</option>
                    {[...new Set(jokes.map(joke => joke.rating))].map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </select>
            </div>
            <ul>
                {filteredJokes.map(joke => (
                    <li key={joke.id}>
                        {joke.joke} <span className="rating">- Rating: {joke.rating}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;

