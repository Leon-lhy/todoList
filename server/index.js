var express = require('express'),
    app = express(),
    cors = require('cors'),
    pool = require('./db');

// req.body is used to access actual form data that you 'posted'.
// req.params is used for route parameters, in your case userId which is passed in the parameters:

//middleWare
app.use(cors());
//  This is a built-in middleware function in Express. 
//  It parses incoming requests with JSON payloads and is based on body-parser.
//  req.body
app.use(express.json());

//=====Routes=====

//POST
app.post("/todos", async (req, res) => {
    const { description } = req.body;
    const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES($1) RETURNING *",
        [description]
    );
    res.json(newTodo.rows[0]);
    
});

//GET
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//UPDATE
app.put("/todos/:id", async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
    );
});

//DELETE
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
            id
        ]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message);
    }
});



//listen
app.listen(5000, (req, res) => {
    console.log("The server has started in 5000 port");
})