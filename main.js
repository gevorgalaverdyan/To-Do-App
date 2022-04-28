const root = document.getElementById("root");

function todoFooter(todos, onChange){
    const container = document.createElement("div");
    container.setAttribute("class", "footer");

    const completed=todos.filter(todo=>todo.completed===true).length;
    container.innerHTML = `
        <span>${completed}/${todos.length} completed</span>
        <button>Clear Completed</button>
    `;

    
    const btn = container.querySelector("button");
    btn.addEventListener("click", () => {
        onChange(todos.filter((todo)=>todo.completed===false));
    });


    return container;
}

function todoForm(add){
    const container = document.createElement("form");
    container.innerHTML = `
        <input type="text" placeholder="Enter a new task" class="task-input"/>
        <button class="add-btn">Add</button>
    `;

    container.addEventListener("submit", (e)=>{
        e.preventDefault();
        const value=container.querySelector("input").value;
        (value!=="") ? add(value) : alert("Empty task");
    })
    return container;
}

function listItem(todo, onChange){
    const container = document.createElement("div");
    container.setAttribute('class', 'list-item');

    container.innerHTML = `
        <label class="task">
            <input type="checkbox" ${todo.completed ? "checked":""}/>
            ${todo.label}
        </label>
    `;

    const input = container.querySelector("input");
    input.addEventListener("change", (e)=>{
        onChange(e.target.checked);
    });
    return container;
}

function List(list, onChange){
    const container = document.createElement("div");
    list.map(todo=> {
        return listItem(todo, (change)=>{
            todo.completed=change;
            onChange();
        })
    }).forEach(element => {
        container.appendChild(element);
    });

    return container;
}

function App(){
    
    let todos = [
        {label: "Learn JS", completed: false},
        {label:"Learn Node", completed: false},
        {label: "Learn CSS", completed: false}
    ];

    const container=document.createElement("div");

    function render(){//թարմացնել
        container.innerHTML="";
        container.appendChild(todoForm(function(newText) {
            todos.push({
                label: newText,
                completed:false
            });
            render();
        }));
        container.appendChild(List(todos, () => {
            render();
          })
        );
        container.appendChild(todoFooter(todos, (newTodos) => {
            todos=newTodos;
            render();
        }));
    }
    render();

    return container;
}

root.appendChild(App())