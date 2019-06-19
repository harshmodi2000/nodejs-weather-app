const request=require('request')

const forecast=(long,lat,callback)=>{
    
    
    const url='https://api.darksky.net/forecast/985d3215b48549dbcf3c128270ebe171/'+long+','+lat+'?units=si'
    
    request({url,json:true},(err,res)=>{

                
        if(err){
            console.log(err)
            callback('Unable to connect weather services!',undefined)        
        }
        else if(res.body.error){
            callback('Place does not exist!',undefined);
        }
        else{
               
            callback(undefined,res.body.daily.data[0].summary+'It is current '+res.body.currently.temperature+' degrees out. There are '+res.body.currently.precipProbability+'% chance of rain. '
            +res.body.daily.data[0].temperatureHigh+' degrees high and '+res.body.daily.data[0].temperatureLow+' degrees low temperature will be there for today.')
        }
    })


}

module.exports=forecast