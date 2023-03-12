exports.mainPage = function(users,tasks){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-teal">
                    <h1>Form</h1>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                           
                        </tr>
                `
    pagHTML += `
                </table>
            </div>
            `
    pagHTML += `
                <div class="w3-card-4">

                            <header class="w3-container w3-teal">
                                <h1>Tasks Part</h1>
                            </header>
                    
                            <div class="w3-container">
                                <table class="w3-table-all">
                                    <tr>
                                        <th>To do</th><th>Done</th>
                                    </tr>
                            
    `
    pagHTML += `
            <tr>
                <td>
                        <div class="w3-card-4">

                        <header class="w3-container w3-teal">
                            <h1>Tasks</h1>
                        </header>
                
                        <div class="w3-container">
                            <table class="w3-table-all">
                                <tr>
                                <th>DeadLine</th><th>Who</th><th>What</th><th>Status</th>
                                </tr>
                                `
    for(let i=0; i < tasks.length ; i++){
        if (tasks[i].done == 0){
        pagHTML += `
                <tr>
                    <td>${tasks[i].deadline}</td>
                    <td>${tasks[i].who}</td>
                    <td>${tasks[i].what}</td>
                    <td>${tasks[i].done}</td>
                    <td>[<a href="/tasks/edit/${tasks[i].id}">Edit</a>][<a href="/tasks/done/${tasks[i].id}">Done</a>]</td>
                </tr>
        `
        }
    }
    pagHTML +=                            
        `   
                        </table>
                    </div>
                </td>

        `
    pagHTML += `
            <td>
                                <div class="w3-card-4">

                                <header class="w3-container w3-teal">
                                    <h1>Tasks</h1>
                                </header>
                        
                                <div class="w3-container">
                                    <table class="w3-table-all">
                                        <tr>
                                       <th>DeadLine</th><th>Who</th><th>What</th><th>Status</th>
                                        </tr>
                                        `
    for(let i=0; i < tasks.length ; i++){
        if (tasks[i].done == 1){
            pagHTML += `
                    <tr>
                        <td>${tasks[i].deadline}</td>
                        <td>${tasks[i].who}</td>
                        <td>${tasks[i].what}</td>
                        <td>${tasks[i].done}</td>
                    </tr>
            `
        }
    }
    pagHTML +=`
                    </td>
                </tr>
            </div>
            `
    pagHTML +=`
                    </body>
                </html>
    `
    return pagHTML
}
exports.tasksFormEditPage = function(task,d){
    var pagHTML= `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Task Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>MetaData</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${task.id}"/>
                        <label>DeadLine</label>
                        <input class="w3-input w3-round" type="text" name="deadline" value="${task.deadline}"/>
                        <label>Who</label>
                        <input class="w3-input w3-round" type="text" name="who" value="${task.who}"/>
                        <label>What</label>
                        <input class="w3-input w3-round" type="text" name="what" value="${task.what}"/>
                        <label>Done</label>
                        <input class="w3-input w3-round" type="text" name="done" value="${task.done}"/>
                    </fieldset>
                `
                   

    pagHTML+=    `
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/task">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML;
}
exports.tasksDoneEditPage= function(task,d){
    var pagHTML= `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>Task Edit Done Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>MetaData</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" name="id" readonly value="${task.id}"/>
                        <label>DeadLine</label>
                        <input class="w3-input w3-round" type="text" name="deadline" readonly value="${task.deadline}"/>
                        <label>Who</label>
                        <input class="w3-input w3-round" type="text" name="who" readonly value="${task.who}"/>
                        <label>What</label>
                        <input class="w3-input w3-round" type="text" name="what" readonly value="${task.what}"/>
                        <label>Done</label>
                        <input class="w3-input w3-round" type="text" name="done" value="${task.done}"/>
                    </fieldset>
                `
                   

    pagHTML+=    `
                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>

                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/task">Return</a>]</h5>
                </footer>
            
            </div>
    `
    return pagHTML;
}
// To add a user to DB
exports.userPage = function(d){
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>User form</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h2>User Form</h2>
                </header>
            
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>MetaData</legend>
                        <label>Id</label>
                        <input class="w3-input w3-round" type="text" id="Id"/>
                        <label>Name</label>
                        <input class="w3-input w3-round" type="text" id="Nome"/>
                    </fieldset>

                    <button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button>
                </form>
                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2023 in ${d} - [<a href="/user">Return</a>]</h5>
                </footer>
            
            </div>
    `
}
exports.editTaskConfirmPage=function(d){
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>User form</title>
            </head>
            <body>
            <p style="text-align:center">A task foi alterada com sucesso!</p>
            <footer class="w3-container w3-purple">
                <h5>Generated by EngWeb2023 in ${d} - [<a href="/tasks">Return</a>]</h5>
            </footer>
            </body>
            </html>
    `
}

exports.doneTaskConfirmPage=function(d){
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
                <title>User form</title>
            </head>
            <body>
            <p style="text-align:center">A task foi realizada com sucesso!</p>
            <footer class="w3-container w3-purple">
                <h5>Generated by EngWeb2023 in ${d} - [<a href="/tasks">Return</a>]</h5>
            </footer>
            </body>
            </html>
    `
}

