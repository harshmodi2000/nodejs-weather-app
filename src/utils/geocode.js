const request=require('request')

const geocode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFyc2htb2RpMjAwMCIsImEiOiJjand5eHVmcmYwdmhxNGNwbTlqMWQ4emtjIn0.j8t1kiikY1Gzf6PPRdaiNQ'

    request({url:url,json:true},(err,res)=>{
            if(err){
                callback('Unable to connect map services!',undefined)
            }
            else if(res.body.message||res.body.features.length===0){
                   callback('Unable to find location!',undefined)
            }
            else{
                const long=res.body.features[0].center[1];
                const lat=res.body.features[0].center[0];
                const placename=res.body.features[0].place_name;
                const data={
                    long,
                    lat,
                    placename
                }
                callback(undefined,data)
            }
    })
}

module.exports=geocode