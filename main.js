window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    let frm = document.querySelector('#new-todo-form');

    frm.addEventListener('submit', e => {
        e.preventDefault();
        if(e.target.elements.content.value!=''){
            //create object that contain important element
            
            let todo = {
                content: e.target.elements.content.value,
                category: e.target.elements.category.value,
                done: false,
            }
            todo.category=todo.category || 'personal'

            //save to local storage
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            
            //reset the form
            e.target.content.value=''
            
            item()
        }
    })
    item()
})


let cd=(t,c)=>{
    let n=document.createElement(t)
    n.className=c
    return n;
}


let item=()=>{
    let list=document.querySelector('#todo-list')
    list.innerHTML=''

    todos.forEach((todo)=>{
        if(todo.content!=''){
            let i=cd('div','todo-item')
            let left=cd('div','left')
            let label=document.createElement('label')
            let input=document.createElement('input')
            input.setAttribute('type','checkbox')
            input.addEventListener('click',function(){
                label.classList.toggle('active')
                content.classList.toggle('done')
            })
            let bubble=cd('span','bubble')
            if (todo.category == 'personal') {
                bubble.classList.add('personal');
            } else {
                bubble.classList.add('business');
            }
            let content=cd('div','todo-content')
            let content_t=document.createElement('input')
            content_t.setAttribute('type','text')
            content_t.setAttribute('disabled','')
            content_t.value=todo.content
            
            let action=cd('div','action')
            //editing the todo
            let button_e=cd('button','edit')
            button_e.textContent='Edit'
            button_e.addEventListener('click',function(){
                content_t.removeAttribute('disabled')
                content_t.focus()
                content_t.addEventListener('blur',(e)=>{
                    content_t.setAttribute('disabled','')
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    item()
                })
            })
            //deleting the todo
            let button_d=cd('button','delete')
            button_d.textContent='Delete'
            button_d.addEventListener('click',function(){
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                item()
            })
            //appending
            content.appendChild(content_t)
            label.appendChild(input)
            label.appendChild(bubble)
            left.appendChild(label)
            left.appendChild(content)
            action.appendChild(button_e)
            action.appendChild(button_d)
            i.appendChild(left)
            i.appendChild(action)
            list.appendChild(i)
        }
    })
}

let pick_category=document.querySelectorAll('.option input[type="radio"]')
pick_category.forEach((e)=>{
    e.addEventListener('click',function(){
            let parent=e.parentElement
            parent.classList.add('active')
            if(parent.classList.contains('business')){
                parent.nextElementSibling.classList.remove('active')
            }
            else{
                parent.previousElementSibling.classList.remove('active')
            }
            cat=parent.classList[0]
        })
})


