import './App.css';
import RecipesList from './features/recipes/RecipesList';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavWrapper from './components/NavBar/NavWrapper';
import Contact from './features/ContactPage/contact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact element={<NavWrapper/>} >
            <Route path="/contact" exact element={<Contact/>}/>
            <Route path=":drinkId" exact element={<RecipesList/>}/>
            <Route path="*" exact element={<RecipesList/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
