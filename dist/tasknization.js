/** motaJs@tasknization.js 1.0.2
* Define a function to execute after completing token-defined tasks.
* (c) 2019 Jeferson Mota <jsmota.dev@gmail.com>
* This tasknization.js is freely distributable under the MIT license
*/

; (function (w) {
    'use strict';

    function Tasknization() {
        var _tasks = [];
        var _completed = [];
        var _finishTask = null;
        var _isFinished = false;

        var _tasknization = {
            setFinishTask: setFinishTask,
            add: add,
            remove: remove,
            complete: complete,
            clearAll: clearAll,
            pendingTasks: pendingTasks,
            isComplete: isComplete,
            isFinished: isFinished
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

            if (_tasks.indexOf(taskName) < 0) {
                w.console.warn('This task name not exist: ', taskName);
                return;
            }

            _completed.push(taskName);

            if (_tasks.length === _completed.length && _finishTask !== null) {
                _isFinished = true;
                _finishTask();
            }
        }

        /**
         * Check that all tasks have been completed.
         * @function isComplete
         * @return {boolean} true: all tasks completed, false: is pending.
        */
        function isComplete() {
            return (_tasks.length === _completed.length) && (_tasks.length > 0 && _completed.length > 0);
        }

        /**
         * Informs if the defined function has been executed.
         * @function isFinished
         * @return {boolean} true: final task was called, false: final task has not yet been called.
        */
        function isFinished() {
            return _isFinished;
        }

        /**
         * Remove all tasks registered.
         * @function clearAll 
        */
        function clearAll() {
            _tasks = [];
            _completed = [];
            _isFinished = false;
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