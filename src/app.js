const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const bodyparser = require('body-parser')
const port = process.env.PORT || 8000;


const publicStaticPath = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partial_path = path.join(__dirname , "../templates/partials");

app.set('view engine', 'hbs');
app.set('views', template_path)
hbs.registerPartials(partial_path);

app.use(express.static(publicStaticPath));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/" , (req,res) => {
   res.render('index') 
});
app.get("/bmicalculator", (req,res) => {
   res.render('bmicalculator') 
})
app.post("/bmicalculator", (req,res) => {
    var weight = req.body.weight;
    var height = req.body.height;
    var result = (weight / height / height) * 10000;
    res.send(`<h1>The BMI of your body is ${result}</h1> <style>h1{color :grey; display:flex; align-items:center; justify-content:center; height:90vh;}</style> `);
})
app.post("/", (req,res) => {
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    var result = num1 * num2;
   res.send(`<h1>The multiplication of two number is ${result}</h1> <style>h1{color :grey; display:flex; align-items:center; justify-content:center; height:90vh;}</style> `);
})

app.get("*", (req,res) => {
   res.render('404errorpage', {
    errormsg: "OOPs, Sorry page Not Found"
   })
})

app.listen(port, () => {
    console.log(`Server is running on port no. ${port}`);
});