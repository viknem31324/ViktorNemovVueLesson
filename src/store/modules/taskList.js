import axios from "axios";

export default {
    actions: {
        async axioTaskList(ctx) {
            const ref = await axios.get("http://localhost:3001/taskList");
            const taskList = ref.data;
            ctx.commit("updateTaskList", taskList);
        },
        async axioTask(ctx, inx) {
            const ref = await axios.get("http://localhost:3001/taskList");
            const task = ref.data[inx];
            ctx.commit("updateTask", {task, inx});
        },
        async addNewTask(ctx, newTask) {
            await axios.post("http://localhost:3001/taskList", {
                title: newTask.title,
                desc: "",
                created: newTask.created,
                updated: newTask.updated,
                done: newTask.done,
            });
            const ref = await axios.get("http://localhost:3001/taskList");
            const task = ref.data[newTask.arrLength];
            ctx.commit("addTask", task);
        },
        async removeTask(ctx, cell) {
            try {
                await axios.delete(`http://localhost:3001/taskList/${cell.task.id}`, { id: cell.task.id });
                console.log(cell.task.id)
                ctx.commit("removeTask", cell.inx);
            } catch (e) {
                console.error(e);
            }
        },
        async doneTask(ctx, cell) {
            try {
                await axios.patch(`http://localhost:3001/taskList/${cell.task.id}`, {
                  done: !cell.task.done,
                  updated: cell.createdDay,
                });
                ctx.commit("updateDoneTask", cell);
              } catch (e) {
                console.error(e);
              }
        },
        checkTab(ctx, check) {
            ctx.commit("updateCheckBtn", check);
        },
        async createTitle(ctx, cell) {
            if (cell.title !== "" && cell.desc !== "") {
              try {
                await axios.patch(`http://localhost:3001/taskList/${cell.id}`, {
                  title: cell.title,
                  desc: cell.desc,
                  updated: cell.createdDay,
                });
                ctx.commit("updateTextTask", cell);
              } catch (e) {
                console.error(e);
              }
            }
          },
    },
    mutations: {
        updateTaskList(state, taskList) {
            state.taskList = taskList;
        },
        updateTask(state, cell) {
            state.taskList[cell.inx] = cell.task;
        },
        updateCheckBtn(state, check) {
            state.check = check;
        },
        visibleTask(state, arr) {
            state.visiblTask = arr;
        },
        addTask(state, newTask) {
            state.taskList.push(newTask);
        },
        removeTask(state, inx) {
            state.taskList.splice(inx, 1);
        },
        updateTextTask(state, cell){
            let task = state.taskList[cell.inx];
            task.title = cell.title;
            task.desc = cell.desc;
            task.updated = cell.createdDay;
            state.taskList[cell.inx] = task;
        },
        updateDoneTask(state, cell){
            let task = state.taskList[cell.inx];
            // console.log(task)
            task.done = !task.done;
            // console.log(task.done)
            task.updated = cell.createdDay;
            state.taskList[cell.inx] = task;
            console.log(state.taskList[cell.inx].done)
        }
    },
    state: {
        taskList: [],
        visiblTask: [],
        check: "all",
        arrTab: [
            { key: "all", text: "display all tasks" },
            { key: "compl", text: "display completed tasks" },
            { key: "outst", text: "display outstanding tasks" },
        ],
    },
    getters: {
        getVisTask(state) {
            return state.visiblTask;
        },
        allTaskList(state) {
            return state.taskList;
        },
        allArrTab(state) {
            return state.arrTab;
        },
        getCheck(state) {
            return state.check;
        },
        findAllTask(state) {
            return state.taskList;
        },
        findCompilTask(state) {
            return state.taskList.filter((item) => item.done == true);
        },
        findOutsTask(state) {
            return state.taskList.filter((item) => item.done == false);
        },
        taskCompl(state) {
            return (state.taskList.filter((item) => item.done)).length;
        },
        taskAll(state) {
            return state.taskList.length;
        },
        createdDay() {
            return (
                new Date().getDate() +
                " / 0" +
                (new Date().getMonth() + 1) +
                " / " +
                new Date().getFullYear()
            );
        },
    },
}