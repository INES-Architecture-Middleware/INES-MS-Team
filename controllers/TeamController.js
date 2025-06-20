import Team from "../models/Team.js"
import functionsMongo from "../utils/functionsMongo.js"

class TeamController {
    constructor(){}

    async insert(req, res) {
        if(!req.body.name || (!req.body.pokemonIds || (req.body.pokemonIds && req.body.pokemonIds.length === 0))){
            res.sendStatus(400)
            return
        }

        try{
            const team = await functionsMongo.insert(Team, {
                name:req.body.name,
                pokemons_id:req.body.pokemonIds,
                userId:req.body.user._id
            })
            res.json(team)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
    }

    async update(req, res){
        if(!req.body._id || !req.body.name || (!req.body.pokemonIds || (req.body.pokemonIds && req.body.pokemonIds.length === 0))){
            res.sendStatus(400)
            return
        }

        try{
            let team = await functionsMongo.findOne(Team, { _id: req.body._id })
            console.log(team)
            if(team){
                let newTeam = await functionsMongo.update(
                    Team,
                    { _id: req.body._id },
                    {
                        name: req.body.name,
                        pokemons_id: req.body.pokemonIds,
                        userId: req.body.user._id
                    }
                )
                
                res.json(newTeam)
            }
        }catch(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
    }

    async delete(req, res){
        if(!req.params.id){
            res.sendStatus(400)
            return
        }

        try{
            let team = await functionsMongo.findOne(Team, {
              _id: req.params.id,
            });
            if(team){
                await functionsMongo.delete(Team, req.params.id)
                res.sendStatus(200)
            }
        }catch(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
    }

    async find(req, res){
        try {
            let team = await functionsMongo.find(Team, {userId:req.user._id})
            res.json(team)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
    }

    async findOne(req, res){
        if(!req.params.id){
            res.sendStatus(400)
            return
        }
        try{
            const team = await functionsMongo.findOne(Team, {
              _id: req.params.id,
            });
            res.json(team)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
            return
        }
    }

    async findAll(req, res){
        res.sendStatus(200)
    }
}

export {TeamController}