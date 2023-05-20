import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from "./pages/Homepage";
import RecipesDetail from "./pages/RecipesDetail";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import NotFound from "./pages/NotFound";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div id="wrapper">
     
        <Header />
          <Routes>
              <Route path="/" element={ <Homepage /> } />
              <Route path="/recipes/:id" element={ <RecipesDetail /> } />
              <Route path="/recipes/create" element={ <AddRecipe /> } />
              <Route path="/recipes/edit/:id" element={ <EditRecipe /> } />
              <Route path="*" element={ <NotFound /> } />
          </Routes>
        <Footer />
      
    </div>
  );
}

export default App;