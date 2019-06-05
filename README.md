#User related Queries

query a{
  users{
    username
  }
}

query b{
  user(username: "dum2"){
    nic
    firstname
    currentaddr {
      district
      
    }
    location{
      coordinates
    }
  }
}

#User related Mutations
mutation c{
  adduser(username:"dum5",firstname:"Duminda2",
    lastname:"Wanninayake",password:"abc123",nic:"870750986V",
  deviceid:"1234567", email:"deemind@gmail.com",tp:"0779906999",
  location:{type:"Point", coordinates: [7.88,81.44]},
  currentaddr:{district:"Jaffna",dsdivision:"Periamia"},verified:false,blackListed:false){
    insertedId
  }
}

mutation d{
  updateuser(username: "dum5",firstname:"Ishika", lastname: "Harshani"){
    firstname
  }
}


mutation e{
  deleteuser(username: "dum7"){
    username
  }
}