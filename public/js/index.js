//making date
const now = new Date();
const week_days = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];
const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
document.querySelector('.date__day').innerText = now.getDate();
document.querySelector('.date__month').innerText = months[now.getMonth()];
document.querySelector('.date__year').innerText = now.getFullYear();
document.querySelector('.week-day').innerText = week_days[now.getDay()==0? 6 : now.getDay()-1];

//
const submit = document.querySelector('#myForm__submit');
const input = document.querySelector('#myForm__input');
const task_list = document.querySelector('.task-list');
let panel = document.querySelector('.main-panel');
let check_list = '';
let clicks = 0;
//

printTasks();

submit.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (clicks == 0) {
        panel.style.display = 'flex';
        input.focus();
        clicks += 1;
    } else {
        let input_val = input.value;
        let action = 'add';
        console.log('a');
        let data = {input_val, action}
        console.log('b');
        if (input.value!='') {
            console.log('c');
            task_list.innerHTML = '';
            console.log('d');
            sendData(data);
            console.log('e');
            input.value = '';
            console.log('f');
            clicks = 0;
            console.log('g');
            panel.style.display = 'none';
            console.log('h');
        }
        console.log('i');
        printTasks();
        console.log('j');
        
    }
    
});

async function sendData(data) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetch('/api', options)
    .then(response => {return response.json()})
    .then(res => console.log(res));
}

async function printTasks() {
    let resp = await fetch('/api').catch(error => console.log(error+'yey'));
    let json = await resp.json();
    console.log(json);
    
    json.forEach(function(el) {
        const div = document.createElement('div');
        div.classList.add('task-list__item');
        if (el.status == 'checked') {div.classList.add('checked')};
        div.innerHTML = `
                <span>${el.input_val}</span>
                <a href="" class="task-list__link">
                <img src="img/check.svg" class="task-list__icon" />
                </a>
                `;
        task_list.appendChild(div)
    })
    
    // for (i=0; i<arr.length-1; i++) {
    //     let input_val = JSON.parse(arr[i]).input_val;
    //     let id = JSON.parse(arr[i]).id;
    //     let status = JSON.parse(arr[i]).status;

    //     //creating element
    //     let div = document.createElement('div');
    //     div.classList.add('task-list__item');
        
    //     if (status == 'checked') {div.classList.add('checked')};
    //     div.setAttribute('data-id', id);
    //     div.innerHTML = `
    //         <span>${input_val}</span>
    //         <a href="" class="task-list__link">
    //         <img src="img/check.svg" class="task-list__icon" />
    //         </a>
    //         `;
    //     task_list.appendChild(div);
    // }

    //
    // check_list = document.querySelectorAll('.task-list__link');
    // Array.from(check_list).forEach(el => {
    //     el.addEventListener('click', function(el) {
    //         el.preventDefault();
    //         if(el.target.parentElement.classList.contains('checked')) {
    //             el.target.parentElement.classList.remove('checked');
    //             const action = 'unchecking';
    //             const id = el.target.parentElement.dataset.id;
    //             let data = {action, id};
    //             sendData(data);
    //         } else {
    //             const action = 'checking';
    //             const id = el.target.parentElement.dataset.id;
    //             el.target.parentElement.classList.add('checked');
    //             let data = {action, id}
    //             sendData(data);
    //         }
    //     })
    // })
}