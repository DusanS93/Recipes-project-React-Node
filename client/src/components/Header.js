import { Link } from 'react-router-dom';

function Header() {
    return(
       <header className="header">
         <Link to="/" className="links">HOME</Link>
         <Link to="/">
         <div className="logo">
            <img src="/images/logo.jpg" alt="site-logo" />
         </div>
         </Link>
         <Link to="/recipes/create" className="links">ADD RECIPE</Link>
       </header> 
    );
};

export default Header;