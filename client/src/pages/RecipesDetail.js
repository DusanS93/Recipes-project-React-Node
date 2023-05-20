import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function RecipesDetail() {

    const {id} = useParams();
    const [oneRecipe, setOneRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
       fetch(`http://localhost:8000/recipes/${id}`)
        .then((res) => {
              return res.json();
          })
          .then((data) => {
              setOneRecipe(data.recipe);
          });
    }, []);

      function deleteRecipe() {
        fetch(`http://localhost:8000/recipes/${id}`, {
          method: 'DELETE'
        })
         .then((res) => res.json())
         .then(() => window.location.href = "/");

        //  return navigate("/");
      }

    return(
      <main className="mainSection">
         { oneRecipe && oneRecipe.map((item) => {
           return(
              <article className="mainArticle" key={ item.id }>
                  <h1>{ item.title }</h1>

                  { item.wallpaper != null ? (
                    <div className="mainWallpaper"><img src={ `http://localhost:8000/uploads/images/${ item.wallpaper }`} alt="image_recipe" /></div>
                  ) : (
                    <div className="mainWallpaper"><img src={ `http://localhost:8000/uploads/images/no_image.png`} alt="no_recipe_image" /></div>
                  )}
                  
                  <h3 className="mainDescription">Components:</h3>
                  <div className="mainComponents">
                    { item.components }
                  </div>
                  <hr/>
                  <h3 className="mainDescription">Procedure:</h3>
                  <p>{ item.text }</p>
                  <hr/>
                  <p className="authorRecipe">Author: { item.author }</p>
                  <hr/>
                  <div className="editButtons">
                    <Link to={"/recipes/edit/"+ item.id}><button className="editPageButtons">Edit</button></Link>
                    <button className="editPageButtons" onClick={ deleteRecipe }>Delete</button>
                  </div>
              </article>
           )
         })}
      </main>
    );
};

export default RecipesDetail;