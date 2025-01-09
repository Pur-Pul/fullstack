import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import LoginForm from "./components/Login";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [token, setToken] = useState(null);
  const client = useApolloClient()
  const handleLogout = (e) => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  return (
    <Router>
      <div>
        <Link style={{ padding: 5 }} to='/authors'>authors</Link>
        <Link style={{ padding: 5 }} to='/books'>books</Link>
        {token ? <Link style={{ padding: 5 }} to='/add'>add book</Link> : null}
        {token ? <button onClick={handleLogout}>Logout</button> : <Link style={{ padding: 5 }} to='/login'>login</Link>}
      </div>
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken}/>} />
      </Routes>
      
    </Router>
  );
};

export default App;
