const cron=require('node-cron')
const todoSchema=require('../models/todoschema')
const userSchema=require('../models/userschema')
const sendMail=require('../helpers/mail').sendMail
const dateToday=require('../helpers/date').todaysDate
const _= require('lodash');

//CREATING A TASK

exports.create=async(req,res)=>{

    await userSchema.findOne({name:req.body.userName})
  
.then(async results=>{
 
     const task=await todoSchema.create({
        userName:req.body.userName,
        userId:results,
        taskName:req.body.taskName,
        taskNetailes:req.body.taskDetailes,
        taskDue:req.body.taskDue,
        taskCreatedAt:dateToday
    })
    res.json({
           message:'task created',
           task:task
        })
    })

 .catch(err => {
           console.log(err);
           res.status(500).json({
           error : err.message
            })
        });
    }

//UPDATING A TASK

exports.update=async(req,res)=>{
    const date=new Date()
    const todaysTime=date.toLocaleTimeString()

    await todoSchema.findByIdAndUpdate(req.params.id,{   //updating the following feilds with updated time and date
        taskDetailes:req.body.taskDetailes,
         status:req.body.status,
        taskDue:req.body.taskTiming,
        taskUpdatedAt:{
            date:dateToday,
            time:todaysTime
        }
    })
    
.then(results=>{
if(!results){
    res.status(404).send('not found')
}else{
    res.json({
        status:'task updated',
        updatedAt:[results.taskUpdatedAt]
    
    })
}
})

.catch(err => {
    console.log(err);
    res.status(500).json({
        error : err.message
    })
});
} 

//DELETING A TASK

exports.delete=async(req,res)=>{

await todoSchema.deleteOne(req.params.id)

.then(results=>{
if(!results){
    res.status(404).json({message:'task not found'})
}
else{
    res.json({message:'sucessfully deleted'})
}
})

.catch(err => {
    console.log(err);
    res.status(500).json({
        error : err.message
    })
});
}

//ADD COMMENT TO OUR TASK

exports.comment=async(req,res)=>{
    
await todoSchema.findByIdAndUpdate(req.params.id,{comment:req.body.comment})
    
.then(results=>{
if(!results)
{
    res.status(404).json({message:'task not found'})
}
else
{
    res.json({
        message:'comment added',
        commentMade:req.body.comment})
}
})

.catch(err => {
    console.log(err);
    res.status(500).json({
        error : err.message
    })
});
} 

//SEE TODAYS TASKS OR REQUIRED TASK BY STATUS

exports.previous=async(req,res)=>{
 
  if(req.body.taskCreatedAt===undefined)   //default todays tasks
   {
    await todoSchema.find({taskCreatedAt:dateToday}) 
    
    .then(results=>{
    if(!results)
    {
        res.status(404).json({message:'task not found'})
    }
    else
    {
        res.json({
            message:'found todays tasks',
            TodaysTasks:results
        })
    }
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
    });
  }
  else
  {
     if(req.body.status===false)  //requested day pending tasks
     {
        await todoSchema.find({taskCreatedAt:req.body.taskCreatedAt,status:false})

        .then(results=>{
            if(!results)
            {
                res.status(404).json({message:'task not found'})
            }
            else
            {
                res.json({
                    message:'found requested day pending tasks',
                    previousTasks:results
                })
            }
            })

            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err.message
                })
            });
     }
else{
    await todoSchema.find({taskCreatedAt:req.body.taskCreatedAt})  //requested day tasks

    .then(results=>{
    if(!results)
    {
        res.status(404).json({message:'task not found'})
    }
    else
    {
        res.json({
            message:'found requested day tasks',
            previousTasks:results
        })
    }
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err.message
        })
   });
  
  }
}
}

//EOD TASK STATUS EMAIL FOR RESPECTED USERS

// exports.mail=async(req,res)=>{

// await todoSchema.aggregate([
//     {$match:{taskCreatedAt:dateToday}},
//     {
//     $lookup: {
//         from: "users",
//         localField: "userId",
//         foreignField: "_id",
//         as: "uemail"
//     }}, 
// {$unwind: "$uemail"}
// ])

// .then(results=>{

//     cron.schedule('00 00 18 * * *',()=>{            //sheduled for every day 6PM
// if(results.length!=0){
//     let grouped = _.reduce(results, (result, user) => {
//     (result[user.uemail.email] || (result[user.uemail.email] = [])).push(user);
//     return result;
// }, {});

//         for(var i in grouped){
//             const email=i
//             const array=grouped[i]
//             var a1=[].splice(',')
//            var no=0
//             for(var d in array){
//                 var task=array[d].taskName
//                 if(array[d].status===true){
//                 var status="completed"
//                 }
//                 else{
//                 var status="not-completed"
//                 }
//                 var name=array[d].userName
//                 no++
//                 a1.push(`${no}.task ${task} is ${status}`)
//             }
//             var taskDetail=a1.join('\r\n')
    
//             sendMail(email,name,taskDetail)           //invoking mail function
//             }
         
//             res.json({message:'EOD status sent'})
//         }
// else{
//     console.log('no task')
//     res.json({message:'no tasks found'})
//     }
//       })
//         } )
    
        
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error : err.message
//             })
//         });
    
// } 


exports.mail=async(req,res)=>{
    await userSchema.find()
    .then(async results=>{
        results.forEach(async i=>{
           var email=i.email
           var name=i.name
           var task1=[]
           var no=0
           var task=await todoSchema.find({userId:i._id})
           if(task.length===0){
            var taskStatus='no task today'
         }else{
            for(var j of task){
                no++
                var tasks=j.taskName
                if(j.status===true){
                    var status1=`${no}.your task ${tasks} is completed`
                }
                else{
                    var status1=`${no}.your task ${tasks} is not-completed`
                }
                
                task1.push(status1)
            }
            var taskStatus=task1.join('\r\n')
        }
        console.log(taskStatus)
           sendMail(email,name,taskStatus)
    })
    res.send('EOD SENT')
    })
} 