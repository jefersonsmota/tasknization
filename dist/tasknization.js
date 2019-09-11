/** motaJs@tasknization.js 1.0.0
* Define a function to perform after completing token-defined tasks.
* (c) 2019 Jeferson Mota <jsmota.dev@gmail.com>
* This tasknization.js is freely distributable under the MIT license
*/

; (function (w) {
    'use strict';

    function Tasknization() {
        var _tasks = [];
        var _completed = [];
        var _finishTask = null;

        var _tasknization = {
            setFinishTask: setFinishTask,
            add: add,
            remove: remove,
            complete: complete,
            clearAll: clearAll,
            pendingTasks: pendingTasks
        };

        /**
        * Define a function (task) to execute when completing tasks.
        * @function setFinishTask
        * @param {Function} task Function.
        */
        function setFinishTask(task) {
            if (task == null || typeof (task) !== 'function') {
                throw new Error('This task is not function');
            }

            _finishTask = task;
        }

        /**
         * Define task.
         * @function add 
         * @param {string} taskName Task name.
         */
        function add(tasksName) {
            if (tasksName == null || tasksName == '') {
                throw new Error('Param is not valid');
            }

            if (typeof (tasksName) === 'string' && _tasks.indexOf(tasksName) < 0) {
                _tasks.push(tasksName);
            }
        }

        /**
         * Remove the registered task by task name.
         * @function remove 
         * @param {string} taskName Task name.
         */
        function remove(taskName) {
            if (taskName == null || taskName.length <= 0) {
                throw new Error('Param is not valid');
            }

            var index = _tasks.indexOf(taskName);

            if (index < 0 || _tasks.length <= 0) {
                return;
            }

            _tasks.splice(index, 1);

            index = _completed.indexOf(taskName);

            if (index < 0 || _completed.length <= 0) {
                return;
            }

            _completed.splice(index, 1);
        }

        /**
         * Set task as completed.
         * @function complete 
         * @param {string} taskName Task name.
         */
        function complete(taskName) {
            if (taskName == null || typeof (taskName) !== 'string') {
                throw new Error('Param is not valid');
            }

            if (_tasks.indexOf(taskName) >= 0) {
                _completed.push(taskName);
            }

            if (_tasks.length == _completed.length && _finishTask !== null) {
                _finishTask();
            }
        }

        /**
         * Remove all tasks registered.
         * @function clearAll 
        */
        function clearAll() {
            _tasks = [];
            _completed = [];
        }

        /**
        * Return array of pending tasks registered.
        * @function pendingTasks
        * @return {any[]} Array of pending tasks.
        */
        function pendingTasks() {
            var pending = [];

            var length = _tasks.length;
            for (var i = 0; i < length; i++) {
                if (_completed.indexOf(_tasks[i]) < 0) {
                    pending.push(_tasks[i]);
                }
            }

            return pending;
        }

        return _tasknization;
    }

    var tasknization = new Tasknization();

    /**
     * Defines an independent instance of Tasknization.
     * @function createInstance
     * @return {Object} Independent instance of Tasknization.
    */
    tasknization.createInstance = function () {
        return new Tasknization();
    }

    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS
        module.exports = tasknization;
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function () {
            return tasknization;
        });
    } else if (typeof (window.tasknization) === 'undefined') {
        // window
        w.tasknization = tasknization;
    }
})(typeof window !== 'undefined' ? window : this);