const express = require('express');
const app = express();
var fs = require('fs');
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`Listening to port ${port}`)});
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

//

app.get('/api', (req, res) => {
    // const opened1 = fs.readFileSync('base.txt', 'utf-8', function(err) {
    // });
    // res.end(opened1)
    // console.log(opened1, 'gotowe');
    fs.readFile('base.txt', function(err, data){
        res.send(data)
    });
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

    if (request.body.action == 'checking') {
        const opened = fs.readFileSync('base.txt', 'utf-8');
        let opened_tab = JSON.parse(opened);
        let index = opened_tab.findIndex(el => el.id==request.body.id);
        opened_tab[index].status = "checked";
        fs.writeFile('base.txt', JSON.stringify(opened_tab), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }

    if (request.body.action == 'unchecking') {
        const opened = fs.readFileSync('base.txt', 'utf-8');
        let opened_tab = JSON.parse(opened);
        let index = opened_tab.findIndex(el => el.id==request.body.id);
        delete opened_tab[index].status;
        fs.writeFile('base.txt', JSON.stringify(opened_tab), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
});