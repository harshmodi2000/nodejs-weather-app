const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'Harsh Modi'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help',helpText:'This is some helpful text!',name:'Harsh Modi'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About Me',name:'Harsh Modi'})
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({error:'You must enter an address'})
    }

    geocode(req.query.address,(err,{long,lat,placename}={})=>{
        if(err)
        {
            return res.send({
                error:err
            })
        }
        forecast(long,lat,(err,data)=>{
            if(err){
                return res.send({
                    error:err
                })
            }
            res.send({
                forecast:data,
                location:placename,
                address:req.query.address
        
            })
            
        })
    })
    
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({error:'You must provide a search item!'})
    }

    console.log(req.query.search)

    res.send({products:[]})
})


app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404',name:'Harsh Modi',errorMessage:'Help article Not Found!'})
})

app.get('*',(req,res)=>{
    res.render('404',{title:'404',name:'Harsh Modi',errorMessage:'404 Page Not Found!'})
})

app.listen(3000,()=>{
    console.log('Server port up on port 3000')
})