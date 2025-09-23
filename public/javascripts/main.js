const maketasks = (data) => {
    data.forEach(task =>{
            const li = document.createElement('li');
            const p = document.createElement('p');
            console.log(`${task.id}. ${task.task}`)
            p.textContent = `${task.id}. ${task.task}`;
            li.appendChild(p);
            //ボタン作成
            const btn = document.createElement('button');
            btn.textContent = 'delete';
            btn.classList.add('delete');
            btn.dataset.id = task.id;
            // イベントリスナー
            btn.addEventListener('click',async()=>{
                await fetch(`/api/delete/${task.id}`, {
                        method: 'DELETE'
                    })
                        .then(() => fetchtask())
            })
            p.appendChild(btn);
            const ul = document.querySelector('#taskList');
            ul.appendChild(li);

            
        })
}


const fetchtask = () => {
    fetch("/api")
    .then(res => res.json())
    .then(data => rendertasks(data))
}


const rendertasks = (data) => {
        const ul = document.querySelector('#taskList');
        ul.innerHTML = "";
        maketasks(data);
    }


fetchtask();

const newtask = () => {
    const newtask = document.querySelector('#task');
    const data = {
        method:"POST",
        "headers": {"Content-Type": "application/json"},
        "body":  JSON.stringify({ task: newtask.value })
    }
    fetch('/api/post',data)
    .then(res => res.json())
    .then(tasks => {
        const ul = document.querySelector('#taskList');
        ul.innerHTML = "";
        maketasks(tasks);
    })

}

const btn = document.querySelector('#btn');
btn.addEventListener('click',newtask);
