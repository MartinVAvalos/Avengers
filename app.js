const   bodyParser      = require("body-parser"),
        methodOverride  = require("method-override"),
        expressSanitizer = require("express-sanitizer"),
        mongoose        = require("mongoose"),
        express         = require("express"),
        Hero            = require("./models/hero"),
        app             = express();

mongoose.connect("mongodb://localhost:27017/avengers", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public")); //custom stylesheets will be in public directory
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
mongoose.set('useFindAndModify', false); //This line removes a DeprecationWarning

// Index
app.get("/", (req, res) => {
    res.redirect("/heroes");
});
app.get("/heroes", (req, res) => {
    Hero.find({}, (err, heroes) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index", {heroes: heroes});
        }
    });
});

// New
app.get("/heroes/new", (req,res) => {
    res.render("newHero");
});

// Create
app.post("/heroes", (req, res) => {
    req.body.hero.body = req.sanitize(req.body.hero.body);
    Hero.create(req.body.hero, (err, newHero) => {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/heroes");
        }
    });
});

// Show
app.get("/heroes/:id", (req, res) => {
    Hero.findById(req.params.id, (err, foundHero) => {
        if (err) {
            res.redirect("/heroes");
        }
        else {
            res.render("show", {hero: foundHero});
        }
    });
});

// Edit
app.get("/heroes/:id/edit", (req, res) => {
    Hero.findById(req.params.id, (err, foundHero) => {
        if(err) {
            res.redirect("/heroes");
        }
        else {
            res.render("edit", {hero: foundHero});
        }
    });
});

// Update
app.put("/heroes/:id", (req, res) => {
    req.body.hero.description = req.sanitize(req.body.hero.description);

    Hero.findByIdAndUpdate(req.params.id, req.body.hero, (err, updatedHero) => {
        if(err) {
            res.redirect("/heroes");
        }
        else {
            res.redirect("/heroes/" + req.params.id);
        }
    });
});

// Destroy
app.delete("/heroes/:id", (req, res) => {
    Hero.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            res.redirect("/heroes");
        }
        else {
            res.redirect("/heroes");
        }
    });
});


app.listen(3000, () => {
    console.log("Port 3000 server is now running");
});