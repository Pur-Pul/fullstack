import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import LoginForm from "./components/Login";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { CURRENT_USER, BOOK_ADDED } from "./components/queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null)
  const client = useApolloClient()
  const user_result = useQuery(CURRENT_USER, { pollInterval: 2000 })
  const handleLogout = (e) => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  useEffect(() => {
    if (localStorage.getItem("login-token")) {
      setToken(localStorage.getItem("login-token"))
    }
  }, [])

  useEffect(() => {
    if (user_result.data) {
      setUser(user_result.data.me)
    }
  }, [user_result.data])

  return (
    <Router>
      <div>
        <Link style={{ padding: 5 }} to='/authors'>authors</Link>
        <Link style={{ padding: 5 }} to='/books'>books</Link>
        {token ? <Link style={{ padding: 5 }} to='/add'>add book</Link> : null}
        {token ? <Link style={{ padding: 5 }} to='/recommendations'>recommendations</Link> : null}
        {token ? <button onClick={handleLogout}>Logout</button> : <Link style={{ padding: 5 }} to='/login'>login</Link>}
      </div>
      <Routes>
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/recommendations' element={<Recommendations genre={user ? user.favoriteGenre : null}/>} />
        <Route path='/login' element={<LoginForm setToken={setToken}/>} />
      </Routes>
    </Router>
  );
};

export default App;
