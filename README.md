## Tasknization
Define a function to execute after completing token-defined tasks.

## Getting Started
Insert the js file

```html
<script src="./dist/tasknization.min.js"></script>
```

```js
npm install tasknization
```

and use!

```javascript
    // Define a function to execute when completing tasks.
    
    function go_fin() {
      console.log('Done!');
    }
    
    tasknization.setFinishTask(go_fin);
    
    // Set the execution tokens
    tasknization.add('Task1');
    tasknization.add('Task2');
    tasknization.add('Task3');
    
    // Complete the tasks
    tasknization.complete('Task2');
    tasknization.complete('Task3');
    tasknization.complete('Task1'); <~ at this time the console prints "Done!"
    
    
```

#### Functions supported:
* **add(tasksName)**:       Define a task.
* **remove(taskName)**:     Remove the registered task by task name.
* **complete(taskName)**:   Set task as completed.
* **clearAll()**:           Remove all tasks registered.
* **pendingTasks()**:       Return array of pending tasks registered.
* **setFinishTask(task)**:  Define a function (task) to execute when completing tasks.
* **createInstance()**:     Defines an independent instance of Tasknization.
* **isComplete()**:         Check that all tasks have been completed.
* **isFinished()**:         Informs if the defined finish function has been executed.


## Authors
* **Jeferson Mota** 

## License
MIT
