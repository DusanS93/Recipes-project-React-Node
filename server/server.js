const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_recipes'
});

// Multer middleware for images and files
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //   cb(null, '../client/public/images');
      cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage });
// End multer

connection.connect(function(err) {
    if(err) {
      throw err;
    }
    console.log("Sucessful connected on database");
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Get all recipes
app.get('/', (req, res) => {
    connection.query("SELECT * FROM recipes ORDER BY id DESC", function(err, result, fields){
        if(err) {
            throw err;
        }
        res.json({recipes:result});
    });
    // res.json({ message: "Server working...!" });
});

// Get detail for one recipe
app.get('/recipes/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT * FROM recipes WHERE id=${id}`, function(err, result, fields) {
        if(err) {
            throw err;
        };
        res.json({recipe:result});
    });
})

// INSERT recipe
app.post('/recipes/create', upload.single('wallpaper'), (req, res) => {
    // const recipeDetails=req.body;
    const title = req.body.title;
    const components = req.body.components;
    const text = req.body.text;
    const author = req.body.author;
    let recipeObj = {};

    if(req.file) {
    let wallpaper = req.file.originalname;
    recipeObj = { title:title, components:components, text:text, author:author, wallpaper:wallpaper };
    } else {
    recipeObj = { title:title, components:components, text:text, author:author};
    }

    let sql = "INSERT INTO recipes SET ?";
    connection.query(sql, recipeObj, function(err, result) {
        if(err) {
            throw err;
        }
        console.log("Numbers of record inserted: " + result.affectedRows);
        res.json({message: "You added a new recipe !"});
    })
});

// UPDATE recipe
app.post("/recipes/edit/:id", upload.single('wallpaper'), (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const components = req.body.components;
    const text = req.body.text;
    const author = req.body.author;
    let objUpdate = {};

    if(req.file) {
        let wallpaper = req.file.originalname;
        objUpdate = { title: title, components: components, text: text, author: author, wallpaper: wallpaper};
    } else {
        objUpdate = { title: title, components: components, text: text, author: author };
    }

    let sql = `UPDATE recipes SET ? WHERE id=${id}`;
    connection.query(sql, objUpdate, function (err, result) {
        if(err) {
            throw err;
        }
        console.log("You edit a row");
        res.json({message: "You edit recipe!"});
    })
})

// DELETE recipe
app.delete('/recipes/:id', (req, res) => {
    let id = req.params.id;

    connection.query(`DELETE FROM recipesrs WHERE id = ${id}`, function(err, result, fields) {
        if(err) throw err;
        res.json({message:""});     
    })
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});