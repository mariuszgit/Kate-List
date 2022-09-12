const express = require('express');
const app = express();
var fs = require('fs');
app.listen(3000, () => {console.log('Listening to port 3000');});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

//

app.get('/api', (req, res) => {
    const opened1 = fs.readFileSync('base.txt', 'utf-8', function(err) {
    });
    res.send(opened1)
    console.log(opened1, 'gotowe');
  });

//

app.post('/api', (request, response) => {
    console.log(request.body);
    response.json({
        info: 'Wysłano rządanie na serwer',
        data: request.body,
        action: request.body.action
    })

    if (request.body.action == 'add') {
        console.log('dodajemy do bazy'); 
        const opened = fs.readFileSync('base.txt', 'utf-8');
        const json = JSON.parse(opened)
        opened == "" ? request.body.id = 1 : request.body.id = json[json.length-1].id+1;

        json.push(request.body);
        fs.writeFile('base.txt', JSON.stringify(json), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

    // if (request.body.action == 'checking') {
    //     const opened = fs.readFileSync('base.txt', 'utf-8');
    //     let tab = opened.split('\n');
    //     console.log(tab);
    //     const index = Array.from(opened.split('\n')).findIndex(el => JSON.parse(el).id == request.body.id);

    //     let new_tab = JSON.parse(tab[index]);
    //     new_tab.status ="checked";
    //     console.log(JSON.stringify(new_tab), tab);
    //     tab.splice(index,1, JSON.stringify(new_tab))
    //     console.log(tab);
    //     fs.writeFile('base.txt', tab.join('\n'), function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });
    // }

    // if (request.body.action == 'unchecking') {
    //     const opened = fs.readFileSync('base.txt', 'utf-8');
    //     let tab = opened.split('\n');
    //     console.log(tab);
    //     const index = Array.from(opened.split('\n')).findIndex(el => JSON.parse(el).id == request.body.id);

    //     let new_tab = JSON.parse(tab[index]);
    //     // new_tab.status ="checked";
    //     delete new_tab.status;
    //     console.log(JSON.stringify(new_tab), tab);
    //     tab.splice(index,1, JSON.stringify(new_tab))
    //     console.log(tab);
    //     fs.writeFile('base.txt', tab.join('\n'), function (err) {
    //         if (err) throw err;
    //         console.log('Saved!');
    //     });
    // }
});