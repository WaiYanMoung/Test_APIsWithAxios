import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

app.get("/", async (req,res) =>{
    const result = await axios.get(API_URL+"search.php?f=a");
    res.render("index.ejs",{content : result.data.drinks});
})
app.post("/search", async (req,res)=>{

     console.log(JSON.stringify(req.body));
  
        if(req.body.clicked == "Search cocktail by name"){
            try {
                const result = await axios.get(API_URL+ "search.php",{
                    params: {
                        s : req.body.txtSearch
                    }
                });
        res.render("index.ejs",{content : result.data.drinks});
            } catch {
           res.render("index.ejs",{content : []});
               
            }
           

        }else if(req.body.clicked == "Search With First Letter"){
            try {
                const result = await axios.get(API_URL+ "search.php",{
                    params: {
                        f : req.body.txtSearch
                    }
                });
        res.render("index.ejs",{content : result.data.drinks});
            } catch {
                res.render("index.ejs",{content : []});
            }
           


        } else if(req.body.clicked == "Search by ingredient"){
            try {
                const result = await axios.get(API_URL+ "search.php",{
                    params: {
                        i : req.body.txtSearch
                    }
                });
        res.render("index.ejs",{content : result.data.drinks});
            } catch {
                res.render("index.ejs",{content : []});
            }
            
        }else if(req.body.clicked == "Lookup full cocktail details by id"){
            try {
                const result = await axios.get(API_URL+ "lookup.php",{
                    params: {
                        i : req.body.txtSearch
                    }
                });
        res.render("index.ejs",{content : result.data.drinks});
            } catch {
                res.render("index.ejs",{content : []});
            }
          
        }else{
    res.redirect("/");
        }

    // const result = await axios.get(API_URL+ "search.php",{
    //     params: {
    //         s : req.body.text
    //     }
    // });
    // res.render("index.ejs",{content : result.data.drinks});
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})