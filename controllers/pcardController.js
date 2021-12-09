const{Pokemon} = require('../models');
const categories = ['Lightning'];

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


    module.exports.renderEditForm = async function (req, res) {
        const Pokemon = await Pokemon.findByPk(
            req.params.id
        );
        res.render('edit', {Pokemon, categories});
    }

    module.exports.updatePokemon = async function (req, res) {
        await Pokemon.update(
            {
                name: req.body.name,
                type: req.body.type,
                health: req.body.health,
                attackOneTitle: req.body.attackOneTitle,
                attackOneCost: req.body.attackOneCost,
                attackTwoTitle: req.body.attackTwoTitle,
                attackTwoCost: req.body.attackTwoCost,
                image: req.body.image
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
            health: 60,
            attackOneTitle: "",
            attackOneCost: 2,
            attackTwoTitle: "",
            attackTwoCost: 2,
            image: "",
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
}