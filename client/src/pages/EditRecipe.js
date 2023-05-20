import { useEffect, useState } from 'react';
import { Form, useParams } from 'react-router-dom';

function EditRecipe() {

    let { id } = useParams();
    let [recipe, setRecipe] = useState(null);

    const [upTitle, setUpTitle] = useState("");
    const [upComponents, setUpComponents] = useState("");
    const [upText, setUpText] = useState("");
    const [upAuthor, setUpAuthor] = useState("");
    const [imageURL, setImageURL] = useState('');
    const [imageForUpload, setImageForUpload] = useState("");
    const [message, setMessage] = useState("");

    // const upObj = {upTitle, upComponents, upText, upAuthor};

    useEffect(() => {
        fetch(`http://localhost:8000/recipes/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setRecipe(data.recipe);
                data.recipe.forEach((item) => {
                    setUpTitle(item.title);
                    setUpComponents(item.components);
                    setUpText(item.text);
                    setUpAuthor(item.author);
                    setImageURL(item.wallpaper);
                });    
        })
    }, []);

    function editRecipe(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', upTitle);
        formData.append('components', upComponents);
        formData.append('text', upText);
        formData.append('author', upAuthor);
        if(imageForUpload != "") {
            formData.append('wallpaper', imageForUpload);
        }

        fetch(`http://localhost:8000/recipes/edit/${id}`, {
            method: "POST",
            // headers: {"Content-type": "application/json"},
            body: formData
        }).then((res) => res.json())
          .then((data) => {
            setMessage("You edit recipe!");
        });
    }

    return(
        <main className="mainSection">
            
            { recipe && recipe.map((item) => {
                return(
                    <article className="mainArticle" key={ item.id }>
                       <h1>Edit recipe</h1>
                        <form onSubmit={ editRecipe } id="editRecipe">
                            <input type="text" defaultValue={item.id} disabled></input><br />
                            <input type="text" defaultValue={item.title} onChange={(e) => setUpTitle(e.target.value)}></input><br />
                            <input type="text" defaultValue={item.components} onChange={(e) => setUpComponents(e.target.value)} /><br />
                            <textarea defaultValue={item.text} onChange={(e) => setUpText(e.target.value)}></textarea><br />
                            <input type="text" defaultValue={item.author} onChange={(e) => setUpAuthor(e.target.value) }></input><br />
                            <label htmlFor="fileInput">
                                Current image: {imageURL}
                            </label>
                            <input id="fileInput" type="file" onChange={ (e) => setImageForUpload(e.target.files[0]) } />
                            <br /><br/>
                            <button>Save</button>
                            { message && <div className="messageRecipe">{ message }</div> }
                        </form>

                    </article>
                )
            })}
            
        </ main>
    );
};

export default EditRecipe;