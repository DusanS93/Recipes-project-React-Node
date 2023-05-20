import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Homepage() {

    const [datas, setDatas] = useState(null);
   
      useEffect(() => {
        fetch("http://localhost:8000/")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setDatas(data.recipes);
        });
        
    }, []);
    
    return(
        <main className="mainSection">
              { datas && datas.map((data) => {
                 return(
                    <article className="mainArticle" key={ data.id }>
                        <Link to={`/recipes/${data.id}`}>
                        <h1>{ data.title }</h1>
                        </Link>
                        { data.wallpaper != null ? (
                            <div className="mainWallpaper"><img src={`http://localhost:8000/uploads/images/${ data.wallpaper }`} alt="image_recipe" /></div>
                        ) : (
                            <div className="mainWallpaper"><img src={`http://localhost:8000/uploads/images/no_image.png`} alt="no_recipe_image" /></div>
                        )}

                        <p className="authorRecipe">Author: { data.author }</p>
                    </article>
                 );
              })};
        </main>
    );
};

export default Homepage;