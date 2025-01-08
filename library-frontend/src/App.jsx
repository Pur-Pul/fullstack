import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <Router>
      <div>
        <Link style={{ padding: 5 }} to='/authors'>authors</Link>
        <Link style={{ padding: 5 }} to='/books'>books</Link>
        <Link style={{ padding: 5 }} to='/add'>add book</Link>
      </div>
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
      </Routes>
      
    </Router>
  );
};

export default App;
