function task(taskName, status, subTask) {
    return ({
        name: taskName,
        isAllDone: status,
        task: subTask
    })
}

function subTask(subTaskName, status) {
    return ({
        name: subTaskName,
        isDone: status,
    })
}

export { task, subTask }