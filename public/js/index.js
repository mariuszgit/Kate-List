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
        let data = {input_val, action}
        if (input.value!='') {
            task_list.innerHTML = '';
            sendData(data);
            input.value = '';
            clicks = 0;
            panel.style.display = 'none';
        }
        printTasks();  
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
    .then(json => console.log(json));
}

async function printTasks() {
    let resp = await fetch('/api').catch(error => console.log(error+'error from printTask'));
    let json = await resp.json();
    
    json.forEach(function(el) {
        const div = document.createElement('div');
        div.classList.add('task-list__item');
        div.setAttribute('data-id', el.id);
        if (el.status == 'checked') {div.classList.add('checked')};
        div.innerHTML = `
                <span>${el.input_val}</span>
                <a href="" class="task-list__link">
                <img src="img/check.svg" class="task-list__icon" />
                </a>
                `;
        task_list.appendChild(div)
    })

    //adding listeners to checj list

    let check_list  = document.querySelectorAll('.task-list__link');
    console.log(Array.from(check_list));
    Array.from(check_list).forEach(el => {
        el.addEventListener('click', function(el) {
            el.preventDefault();
            if(el.target.parentElement.classList.contains('checked')) {
                el.target.parentElement.classList.remove('checked');
                const action = 'unchecking';
                const id = el.target.parentElement.dataset.id;
                let data = {action, id};
                sendData(data);
            } else {
                const action = 'checking';
                const id = el.target.parentElement.dataset.id;
                el.target.parentElement.classList.add('checked');
                let data = {action, id}
                sendData(data);
            }
        })
    })
}