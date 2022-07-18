//TODAYS DATE

/*
one methord
*/

// const datef=new Date()
// const date=datef.getDate()
// const month=datef.getMonth()+1
// const year=datef.getFullYear()
// exports.todaysDate=year+"-"+month+"-"+date


/*
second methord
*/

const dateTime=new Date().toISOString()
const d=dateTime.split('T')
exports.todaysDate=d[0]