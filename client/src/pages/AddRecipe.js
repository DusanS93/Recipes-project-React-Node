import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {

    const [title, setTitle] = useState("");
    const [components, setComponents] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [wallpaper, setWallpaper] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // const recipe = { title, components, text, author, wallpaper };

    function recipeAdd(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('components', components);
        formData.append('text', text);
        formData.append('author', author);
        if(wallpaper !== "") {
           formData.append('wallpaper', wallpaper);
        };
        
        fetch('http://localhost:8000/recipes/create', {
            method: 'POST',
            // headers: { "Content-type": "multipart/form-data"},
            body: formData
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setMessage("You insert a new recipe !");
        });
    }

    return(
        <main className="mainSection">
            <article className="mainArticle">
                <h1>Add new recipe</h1>
                <form id="addRecipeForm" onSubmit={ recipeAdd }>
                    <input type="text" id="title" placeholder="Enter title" onChange={ (e) => setTitle(e.target.value) } required></input><br />
                    <input type="text" id="components" placeholder="Enter components separate by comma" onChange={ (e) => setComponents(e.target.value) } required></input><br />
                    <textarea type="text" id="text" placeholder="Enter text" onChange={ (e) => setText(e.target.value) } required></textarea><br />
                    <input type="text" id="author" placeholder="Enter author" onChange={ (e) => setAuthor(e.target.value) } required></input><br />
                    <input type="file" id="wallpaper" accept="image/png, image/jpeg, image/jpg" onChange={ (e) => setWallpaper(e.target.files[0] )}></input><br />
                    <button>Add</button>
                    { message && <div className="messageRecipe">{ message }</div> }
                </form>
            </article>
        </main> 
    );
};

export default AddRecipe;