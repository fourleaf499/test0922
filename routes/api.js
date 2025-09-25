var express = require('express');
var router = express.Router();
const fs= require('fs');



let tasks = [];
const filepath = 'tasks.json';

const loadtasks = () => {
  try {
  const data = fs.readFileSync(filepath, 'utf-8');
  if (data == []) {
    tasks = [];
  }else{
  tasks = JSON.parse(data);}
  } catch(err) {
    console.log('error',err);
  }
}

loadtasks();

const savetasks = (tasks) => {
  if (tasks != []) {
    fs.writeFileSync(filepath, JSON.stringify(tasks,null,2));
  } else {
    console.log('tasks is empty, not saving to file');
  }
}




/* GET home page. */
router.get('/', (req, res) => {
  res.json(tasks);
});


router.post('/post',(req,res) => {
  const task = req.body.task;
  const id = tasks.length + 1;
  tasks.push({ id:id, task:task }); 
  savetasks(tasks)
  console.log({id:id,task:task});
  res.json(tasks);
});


router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  tasks =tasks.filter(task => task.id != id ) 
  let newtasks = []
  tasks.forEach((task,index) => {
    task.id = index + 1;
    newtasks.push(task);
  })
  tasks = newtasks
  savetasks(tasks);
  res.json(newtasks);
});



module.exports = router;
