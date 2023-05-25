const load =(event)=>{//Event Object
    
    const target=event.target;//is Equivalent to xhr 
    if(target.status == 200)
    {
        const responseText=target.responseText;//response Text
        const task_details=JSON.parse(responseText);//JSON to object
        task_details.forEach(task_details => addList(task_details));//Adding for each values into person object
    }
}

// "id" : 1,
// "title": "Complete Assignment 1",
// "description": "It is very important assignment",
// "due_date": "20 th Oct 2020",
// "due_time": "12:00 AM",
// "status" : "open"

//Lists for accepting details 
const addList =(task_details) =>{
    console.log(task_details.title);
    let task=task_details.title;
    let description1=task_details.description;
    let date1=task_details.due_date;
    let time1=task_details.due_time;
    child_creation(task,description1,date1,time1)
}

const popup=document.getElementById("add_new_task_button"); 
popup.addEventListener('click',()=>{
    const div1=document.getElementById("form_container_div");
    div1.style.display="block";
    popup.style.display="none";
})

//XML request
const xhr=new XMLHttpRequest();
xhr.open('GET','data/data.json');
xhr.addEventListener('load',load);
xhr.send();


const lists_el=document.querySelector("#tasks");
//Window Objects 
window.addEventListener('load',() =>{
    
    const form =document.querySelector("#new-task-form");
    let input =document.querySelector("#new-task-input");
    let description=document.querySelector("#new-task-description");
    let date=document.querySelector("#new-task-date");
    let time=document.querySelector("#new-task-time");
    //Form event listener
    form.addEventListener('submit',(e) => {
        e.preventDefault();
        const task = input.value;
        const description1 = description.value;
        const date1 = date.value;
        const time1 = time.value;
        //Querying all the strings 
        document.querySelector("#new-task-input").value="";
        document.querySelector("#new-task-description").value="";
        document.querySelector("#new-task-date").value="";
        document.querySelector("#new-task-time").value="";

        let inputed_date=new Date(date1);
        let todays_date=new Date();

        //Checking if there is no values
        if(!task){
            alert("Please fill out the Title properly !!!");
            return;
        }
        else if(!description1)
        {
            alert("Please fill out the Description properly !!!");
            return;
        }
        //Checking dates are vaild or not 
        else if(inputed_date < todays_date)
        {
            alert("Please enter a proper date !!!");
            return;
        }
        const div1=document.getElementById("form_container_div");
        div1.style.display="none";
        popup.style.display="block";
        child_creation(task,description1,date1,time1)
    })
})

// function div_pop(){

//     const submit_popup=document.getElementById("submit_popup");

//     submit_popup.addEventListener('click',()=>{
//         const title=document.getElementById("#title");
//         const descript=document.getElementById("#description");
//         const duedate=document.getElementById("#duedate");
//         const duetime=document.getElementById("#duetime");

//     })

// }

// function div_show() 
// {
//     document.getElementById("abc").style.display = "none";
// }
   
// function div_hide()
// {
//     document.getElementById("abc").style.display = "none";
// }

//Dynamically adding contents to the array lists 
 function child_creation(task,description1,date1,time1){
        
    const task_li=document.createElement("div");
    task_li.classList.add("task");

    const task_content_li=document.createElement("div");
    task_content_li.classList.add("content");
        
    task_li.appendChild(task_content_li);
    //creating input tags 
    const task_input_el=document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type="text";
    task_input_el.value=task;
    task_input_el.setAttribute("readonly","readonly");
    
    const task_description=document.createElement("input");

    const names3=document.createElement("p");
    names3.classList.add("dynamic_content");
    names3.style.display="none";
    names3.innerText="Description";

    task_description.classList.add("dynamic_description");
    task_description.value=description1;
    task_description.style.display="none";
    task_description.setAttribute("readonly","readonly");

    const task_due_date=document.createElement("input");
    //adding that tag to the p so that its displayes corretly
    const names2=document.createElement("p");
    names2.classList.add("dynamic_content");
    names2.style.display="none";
    names2.innerText="Due Date";

    task_due_date.classList.add("dynamic_due_date");
    task_due_date.value=date1;
    task_due_date.style.display="none";
    task_due_date.setAttribute("readonly","readonly");

    const task_due_time=document.createElement("input");

    const names1=document.createElement("p");
    names1.classList.add("dynamic_content");
    names1.style.display="none";
    names1.innerText="Due Time";
    //Dynamic Due date contents 
    task_due_time.classList.add("dynamic_due_time");
    task_due_time.value=time1;
    task_due_time.style.display="none";
    task_due_time.setAttribute("readonly","readonly");

    const task_status=document.createElement("input");

    const names=document.createElement("p");
    names.classList.add("dynamic_content");
    names.style.display="none";
    names.innerText="Status";

    names.setAttribute("readonly","readonly");
    task_status.classList.add("dynamic_status");
    task_status.value="open";
    task_status.style.display="none";
    task_status.setAttribute("readonly","readonly");


    task_content_li.appendChild(task_input_el);

    names3.appendChild(task_description);
    //task_content_li.appendChild(task_description);
    names2.appendChild(task_due_date);
    //task_content_li.appendChild(task_due_date);
    names1.appendChild(task_due_time);
    //task_content_li.appendChild(task_due_time);
    names.appendChild(task_status);
    //task_content_li.appendChild(names);
    //task_content_li.appendChild(task_status);
    task_content_li.appendChild(names3);
    task_content_li.appendChild(names2);
    task_content_li.appendChild(names1);
    task_content_li.appendChild(names);
    


    const task_actions=document.createElement("div");
    task_actions.classList.add("actions");

    const task_button_delete=document.createElement("button");
    task_button_delete.classList.add("Mark_as_completed");
    task_button_delete.innerHTML="Delete";

    const done=document.createElement("button");
    done.classList.add("Done_button");
    done.innerHTML="Completed";


    const task_button_view=document.createElement("button");
    task_button_view.classList.add("View");
    task_button_view.innerHTML="View"

    task_actions.appendChild(done);
    task_actions.appendChild(task_button_view);
    task_actions.appendChild(task_button_delete);
    
    task_li.appendChild(task_actions);
        
    lists_el.appendChild(task_li);

    task_button_delete.addEventListener('click',()=>{
        lists_el.removeChild(task_li);
    })
    //Checking the contents so that they get displayed correctly 
    task_button_view.addEventListener('click',()=>{
        let status = task_description.style.display;
        let status1=names.style.display;
        if(status == "none" && status1 == "none")
        {
            task_description.style.display="block";
            task_due_date.style.display="block";
            task_due_time.style.display="block";
            task_status.style.display="block";
            names.style.display="block";
            names1.style.display="block";
            names2.style.display="block";
            names3.style.display="block";

        }
        else
        {
            task_description.style.display="none";
            task_due_date.style.display="none";
            task_due_time.style.display="none";
            task_status.style.display="none";
            names.style.display="none";
            names1.style.display="none";
            names2.style.display="none";
            names3.style.display="none";
        }
            
    })
    //adding the completed button part 
    done.addEventListener('click',()=>{
        task_li.style.backgroundColor="rgb(1, 79, 1)";
        done.style.display="none";
        task_status.value="closed";
    })
}
