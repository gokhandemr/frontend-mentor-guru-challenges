import {createSlice} from "@reduxjs/toolkit";
import data from "../../data.json";

const initialState = {
  boards: localStorage.getItem("boards") ? JSON.parse(localStorage.getItem("boards")) : (localStorage.setItem("boards", JSON.stringify(data.boards)), location.reload()),
  boardName: localStorage.getItem("boards") !== "[]" ? JSON.parse(localStorage.getItem("boards"))[0].name : "Empty",
  board: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeBoardName: (state, action) => {
      state.boardName = action.payload;
    },
    // Board
    setBoard: (state, action) => {
      const newBoard = state.boards && state.boards.filter((item) => item.name === action.payload && item);
      state.board = newBoard[0];
    },
    addBoard: (state, action) => {
      const newBoard = action.payload;
      state.boards = [...state.boards, newBoard];
      state.boardName = newBoard.name;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    deleteBoard: (state, action) => {
      const newBoards = state.boards.filter((item) => item.name !== action.payload && item);
      state.boards = newBoards;
      location.reload();
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    editBoard: (state, action) => {
      const {oldName, newBoard} = action.payload;
      const newBoards = state.boards.map((board) => (board.name === oldName ? newBoard : board));
      state.boards = newBoards;
      state.boardName = newBoard.name;
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    // Task
    taskViewTaskStatusChange: (state, action) => {
      const {newStatus, oldStatus, newTask} = action.payload;

      // Durumu değişen görevi bulunduğu "board"dan sildik.
      state.boards.map((board) =>
        board.name === state.boardName
          ? {
              name: board.name,
              columns: board.columns.map((column) =>
                column.name === oldStatus
                  ? {
                      name: column.name,
                      tasks: column.tasks.splice(
                        column.tasks.findIndex((e) => e.title === newTask.title),
                        1
                      ),
                    }
                  : column
              ),
            }
          : board
      );

      // Durumu değişmiş olan "task"ı yeni "column"a push'ladık
      state.boards.map((board) => (board.name === state.boardName ? {name: board.name, columns: board.columns.map((column) => (column.name === newStatus ? {name: column.name, tasks: column.tasks.push(newTask)} : column))} : board));
      // Local'e kayıt ettik
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    taskViewSubtaskStatusChange: (state, action) => {
      const {columns} = state.board;
      const {columnName, taskTitle, subtask} = action.payload;

      // yeni subtask oluşturuldu
      const newSubtask = {title: subtask.title, isCompleted: !subtask.isCompleted};

      // manipüle ettiğimiz board'ı newBoard değişkenine atadık ve yeni bir board oluşturmuş olduk
      const newBoard = {
        name: state.boardName,
        columns: columns.map((column) =>
          column.name === columnName ? {name: columnName, tasks: column.tasks.map((item) => (item.title === taskTitle ? {...item, subtasks: item.subtasks.map((item2) => (item2.title === subtask.title ? newSubtask : item2))} : item))} : column
        ),
      };

      // tüm boardsları içeren boards yani board state'ini manipüle eidlen board'ın ismine göre filtreleyip yakalanın boardı güncelledik
      const newBoards = state.boards.map((board) => (board.name === state.boardName ? newBoard : board));

      state.boards = newBoards;
      // en sonunda ise üst seviyededeki boards yani boars stateini local'e kayıt ettik
      localStorage.setItem("boards", JSON.stringify(newBoards));
    },
    deleteTask: (state, action) => {
      const {title, status} = action.payload;

      const newBoards = state.boards.map((board) =>
        board.name === state.boardName ? {name: state.boardName, columns: board.columns.map((column) => (column.name === status ? {name: status, tasks: column.tasks.filter((task) => task.title !== title && task)} : column))} : board
      );

      state.boards = newBoards;

      const newBoard = state.boards && state.boards.filter((item) => item.name === state.boardName && item);
      state.board = newBoard && newBoard[0];

      localStorage.setItem("boards", JSON.stringify(newBoards));
    },
    addNewTask: (state, action) => {
      const newTask = action.payload;
      state.boards.map((board) => (board.name === state.boardName ? board.columns.map((column) => (column.name === newTask.status ? column.tasks.push(newTask) : column)) : board));
      localStorage.setItem("boards", JSON.stringify(state.boards));
    },
    editTask: (state, action) => {
      const {updateTask} = action.payload;
      const {task} = action.payload;

      const newBoards = state.boards.map((board) =>
        board.name === state.boardName
          ? {name: state.boardName, columns: board.columns.map((column) => (column.name === task.status ? {name: task.status, tasks: column.tasks.map((item) => (item.title === task.title ? updateTask : item))} : column))}
          : board
      );

      if (task.status !== updateTask.status) {
        // Status'ü değişim task'ı eski column'dan sildik
        newBoards.map((board) =>
          board.name === state.boardName
            ? {
                name: state.boardName,
                columns: board.columns.map((column) => (column.name === task.status ? {name: column.name, tasks: column.tasks.map((item, index) => (item.title == updateTask.title ? column.tasks.splice(index, 1) : item))} : column)),
              }
            : board
        );
        // Status'ü değişen task'ı yeni column'a push'ladık
        newBoards.map((board) => (board.name === state.boardName ? {name: state.boardName, columns: board.columns.map((column) => (column.name === updateTask.status ? {name: column.name, tasks: column.tasks.push(updateTask)} : column))} : board));
      }

      state.boards = newBoards;
      localStorage.setItem("boards", JSON.stringify(newBoards));
    },
  },
});

export const {changeBoardName, setBoard, addBoard, deleteBoard, editBoard, taskViewTaskStatusChange, taskViewSubtaskStatusChange, deleteTask, addNewTask, editTask} = dataSlice.actions;
export default dataSlice.reducer;
