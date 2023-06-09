const TASK_URL = "task";

const getAllTasks = async () => {
    const url = `${TASK_URL}/getTasks`;

    try {
        const tasks = await fetch(url, {
            method: 'POST'
          });
        const responseJson = await tasks.json();
        return responseJson;
    }
    catch(error) {
      console.log(error) // do different error to showcase - line 15 wrong name + line13 with incorrect path
    }
}

const addTask = async (value) => {
  
  const url = `${TASK_URL}/addTask`;

  const data = {
    task: value,
    isCompleted: false,
    completionTime: null
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const addTask = await fetch(url, options);
    const responseJson = await addTask.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

const updateTask = async toDo => {

  const url = `${TASK_URL}/updateTask`;
  const options = {
    method: 'PATCH',
    headers: {
      'id': toDo._id,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isCompleted: toDo.isCompleted,
      task: toDo.task,
    })
  };

  try {
    const updateTask = await fetch(url, options);
    const responseJson = await updateTask.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
  
};

const removeTask = async (toDo) => {

  const url = `${TASK_URL}/deleteTask`;
  const options = {
    method: 'DELETE',
      headers: {
        'id': toDo._id
      }
  };

  try {
    const deleteTask = await fetch(url, options);
    const responseJson = await deleteTask.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
  
};

export {getAllTasks, addTask, updateTask, removeTask};