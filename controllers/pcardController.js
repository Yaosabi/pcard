const{Pokemon} = require('../models');
const categories = ['Normal','Fighting','Flying','Poison','Ground','Rock','Bug','Ghost','Steel','Fire','Water','Grass','Electric','Psychic','Ice','Dragon','Dark','Fairy'];

module.exports.viewAll = async function(req, res) {
    let searchCategories = ['All'];
    for (let i = 0; i < categories.length; i++) {
        searchCategories.push(categories[i]);
    }
    let pokemons;
    let searchCategory = req.query.category || 'All';
    let searchRandom = req.query.random || false; //changed
    if (searchCategory === 'All') {
        pokemons = await Pokemon.findAll();
    } else {
        pokemons = await Pokemon.findAll({
            where: {
                category: searchCategory
            }
        });
    }
    if(pokemons.length > 0 && searchRandom){
        let randomIndex = getRandomInt(pokemons.length);
        pokemons = [pokemons[randomIndex]];
    }
    res.render('index', {pokemons, categories:searchCategories, searchCategory, searchRandom}); //changed
}

    module.exports.renderEditForm = async function (req, res) {
        const pokemon = await Pokemon.findByPk(
            req.params.id
        );
        res.render('edit', {pokemon, categories});
    }

    module.exports.updatePokemon = async function (req, res) {
        await Pokemon.update(
            {
                name: req.body.name,
                type: req.body.type,
                health: req.body.health,
                attackOneTitle: req.body.attackOneTitle,
                attackOneCost2: req.body.attackOneCost2,
                attackTwoTitle: req.body.attackTwoTitle,
                attackTwoCost: req.body.attackTwoCost,
                attackTwoCost2: req.body.attackTwoCost2,
                image: req.body.image,
                resistance: req.body.resistance,
                weakness: req.body.weakness
            },
            {
                where:
                    {
                        id: req.params.id
                    }
            });
        res.redirect('/');
    }

    module.exports.deletePokemon = async function (req, res) {
        await Pokemon.destroy(
            {
                where:
                    {
                        id: req.params.id
                    }
            });
        res.redirect('/');
    }

    module.exports.renderAddForm = function (req, res) {
        const pokemon = {
            name: "",
            type: "",
            health: "",
            attackOneTitle: "",
            attackOneCost2: "",
            attackTwoTitle: "",
            attackTwoCost: "",
            attackTwoCost2: "",
            image: "",
            resistance: "",
            weakness: ""
        };
        res.render('add', {pokemon, categories});
    }

    module.exports.addPokemon = async function (req, res) {
        await Pokemon.create(
            {
                name: req.body.name,
                type: req.body.type,
                health: req.body.health,
                attackOneTitle: req.body.attackOneTitle,
                attackOneCost: req.body.attackOneCost,
                attackTwoTitle: req.body.attackTwoTitle,
                attackTwoCost: req.body.attackTwoCost,
                image: req.body.image
            });
        res.redirect('/')
}

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}
