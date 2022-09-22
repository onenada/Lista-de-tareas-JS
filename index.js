const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });


    //Task List//
let taskList = [];

    // Funcion para añadir tarea //
    // Function to add task //
function addTask(taskList, taskDescription) {
    taskList.push({done: false, description: taskDescription});
}

    //Funcion para imprimir tarea //
    //Function to print task //
function printTaskList(taskList) {
    for (let i = 0; i<taskList.length; ++i) {
        if (taskList[i].done) {
            //Tarea Realizada //
            console.log((i + 1) + ". [x] " + taskList[i].description);
        }
        else {
            //Tare NO Realizada //
            console.log((i + 1) + ". [ ] " + taskList[i].description);

        }
    }
}

function mode1(taskList) { // MODO PARA INTRODUCIR TAREAS //
    rl.question('Introduce una nueva tarea (Q para terminar)', function(taskDesc) {
        switch(taskDesc)  {
            case 'Q':
                console.log('No se introducen mas tareas');
                mode2(taskList);
                break;

            case 'exit':
                rl.close();
                break;

            default:
                addTask(taskList, taskDesc);
                console.log('la lista de ateas actual es :');
                printTaskList(taskList);
                mode1(taskList);
        }
    });
}


function markTaskDone(taskList, index) { // funcion para marcar tareas hechas //
    if(index >= 0 && index < taskList.length) {
        taskList[index].done = true;
    }
    else {
        console.log ('No existe ese numero de tarea');
    }
}

function allDone(taskList) { //funcion para determinar si todas las tareas estan DONE o hechas//
    for (let task of taskList) {
        if(!task.done) return false;
    }
    return true;
}


function mode2(taskList) { // MODO PARA MARCAR TAREAS HECHAS //
    printTaskList(taskList);
    rl.question('Que tarea has realizado? (1 - N)', function(taskNumber) {
        switch(taskNumber)  {
            case 'Q':
            case 'exit':
                console.log('Hasta luego Diego')
                rl.close();
                break;  
//sin break la ejecucion continua hacia abajo, de esta forma podemos hacer que tanto el caso Q como EXIT ejecuten el codigo del case EXIT//

            default:
                markTaskDone(taskList, taskNumber - 1); // se hace las resta debido a que los array comienzan en 0//
                if (allDone(taskList)) {
                    console.log('Hasta la vista Amatista bien hecho!! completaste todo');
                    rl.close();
                }
                else {
                    mode2(taskList);
                }
        }
    });
}


mode1(taskList);
