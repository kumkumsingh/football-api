const express = require('express')
const Team = require ('./model')
const {Router} = express
const router = new Router()
router.get('/team',(request,response,next)=>
{
    Team.findAll()
    .then(teams => response.send(teams))
    .catch(err => next(err))
}
)
router.post('/team',(request,response,next) =>{
    Team.create(request.body)
    .then(data =>{ response.json(data)
    //console.log('cheking my data',data)
    })
    .catch(err => next(err))
})
// router.put('/team/:id',(request,response,next) =>{
//     Team.findByPk(request.params.id)
//     .then(team => {
//         if(team){
//             return team.update(request.body)
//             .then(team =>{response.json(team)})
//         }
//     })
//     .catch(err =>next(err))
// })
   

    // User.findByPk(someId)
    // .then(user => {
    //     if (user) {
    //         return user.update(myNewData)
    //             .then(user => {/*..*/})
    //     }
    // })
    // .catch(err => {/*..*/})


router.get('/team/:id',(request ,response,next) => {
  
    const teamId = request.params.id
    const team = Team.findByPk(teamId)
    .then(team => response.send(team))
    .catch(err =>next(err))

})

module.exports = router