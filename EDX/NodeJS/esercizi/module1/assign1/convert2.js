
const csv=require('csvtojson')
const fs=require('fs')
const path=require('path')



const fromCSVtoJSON = (file,callback) => {
  console.log("opening input file", file)
  let buffer='[\n'
  csv()
  .fromFile(file)
  // .on('json',(jsonObj)=>{
  //   buffer+='\r\n  {\r\n'
  //   buffer+='    "id": "'+jsonObj.id+'",\r\n'
  //   buffer+='    "first_name": "'+jsonObj.first_name+'",\r\n'
  //   buffer+='    "last_name": "'+jsonObj.last_name+'",\r\n'
  //   buffer+='    "email": "'+jsonObj.email+'",\r\n'
  //   buffer+='    "gender": "'+jsonObj.gender+'",\r\n'
  //   buffer+='    "ip_address": "'+jsonObj.ip_address+'",\r\n'
  //   buffer+='    "ssn": "'+jsonObj.ssn+'",\r\n'
  //   buffer+='    "credit_card": "'+jsonObj.credit_card+'",\r\n'
  //   buffer+='    "bitcoin": "'+jsonObj.bitcoin+'",\r\n'
  //   buffer+='    "street_address": "'+jsonObj.street_address+'"\r\n  },'
  //  })
  .on('data',(data)=>{
    buffer+=' '+data.toString('utf8')+' ,  \n'
  })
  .on('done',()=>{
    //remove last character
    buffer=buffer.slice(0,-1)
    buffer+="\r\n]"
    console.log('done reading ',file)
    callback(null,buffer)
  })
//  .on('done',(error)=>{
//    console.log('input file is over')
//    callback(error)
//   })
}

csvFile='customer-data.csv'
tData=''
fromCSVtoJSON(csvFile,(error,data)=>{
  if (error) return console.log("Error occurred")
  fs.writeFileSync(path.join(__dirname,"",'customer-data.json'),data)
  console.log("I am done")
}
)
