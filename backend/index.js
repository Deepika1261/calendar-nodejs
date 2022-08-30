const express = require('express')
const Events = require('./models/eventsCalls')
const Reminders = require('./models/remindersCalls')
const app = express()
const port = 3000

class Server{
    constructor(){
        this.init()
        this.useMiddleware()
        this.addEventRoutes()
        this.listenServer()
        this.addReminderRoutes()
    }
    init(){
    }
    useMiddleware(){
        app.use(express.json());
    }
    addEventRoutes(){
        app.post('/add_event',async (req,res)=>{
            try{
                var event_obj={
                    time:new Date(req.body.time + "Z"),
                    subject:req.body.subject
                }
                const added_event = await Events.add_event(event_obj)
                res.status(200).json(added_event)
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot add!')
            }
        }),
        app.get('/retrieve', async (req,res)=>{
            try{
              const gets_events = await Events.retrieve_events()
              console.log(gets_events)
              res.send({})
            }
            catch(err) {
              console.log(err);
              res.send()
          }
          }),
        app.post('/update_event',async (req,res)=>{
            try{
                let update_data={}
                for(let data in req.body){
                    update_data[data]=req.body[data]
                }
                console.log(update_data)
                const updated_event = await Events.update_event(req.query.id,update_data)
                res.status(200).json(updated_event) 
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot update!')            
            }
        }),
        app.delete('/delete_event',async (req,res)=>{
            try{
                const deleted_event = await Events.delete_events(req.query.id);
                res.status(200).json(deleted_event);
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot delete!') 
            }
        })
    }
    addReminderRoutes(){
        app.post('/add_reminder',async (req,res)=>{
            try{
                var rem_obj={
                    time:new Date(req.body.time + "Z"),
                    subject:req.body.subject
                }
                const added_event = await Events.add_event(event_obj)
                res.status(200).json(added_event)
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot add!')
            }
        })
    }
    listenServer(){
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}, http://localhost:3000`)
          }) 
    }
}

new Server()