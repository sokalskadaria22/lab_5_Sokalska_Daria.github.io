const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
}

const {useState, useEffect} = React;

const Todo = ({todo, onDeleteClick, onCheckboxClick}) => {
  return (
      <li className={classNames.TODO_ITEM}>
          <input onClick={() => {onCheckboxClick(todo.id)}} className={classNames.TODO_CHECKBOX} type="checkbox" defaultChecked={todo?.checked || undefined}/>
          <label className={classNames.TODO_TEXT}><span>{todo.text}</span></label>
          <button className={classNames.TODO_DELETE} onClick={() => {onDeleteClick(todo.id)}}>delete</button>
      </li>
  )
}

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos') || "[]"));
  useEffect(() => {
      // update local storage every time todo array changing
      localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo() {
      const text = prompt('Enter task to do');
      // create todo object, id is date timestamp
      const todo = { id: Date.now(), text, checked: false };
      // update our todo array
      setTodos([...todos, todo]);
  }
  function toggleCheckbox(key) {
      // find todo and change its checked prop in arrau
      setTodos(todos.map(todo => todo.id === key ? {...todo, checked: !todo.checked} : todo));
      // update localStorage array
      localStorage.setItem('todos', JSON.stringify(todos));
  }
  function deleteTodo(key) {
      // find todo index in array
      const index = todos.findIndex(item => item.id === Number(key));
      // if todo exist
      if (index >= 0) {
          // delete todo from array
          setTodos(todos.filter(item => item.id !== Number(key)));
      }
  }
  return (
      <div className="container center">
          <h1 className="center title">My TODO App</h1>
          <div className="flow-right controls">
              <span>Item count: <span id="item-count">{todos.length}</span></span>
              <span>Unchecked count: <span id="unchecked-count">{todos.filter((todoEl) => !todoEl?.checked).length}</span></span>
          </div>
          <button className="button center" onClick={addTodo}>New TODO</button>
          <ul id="todo-list" className="todo-list">
              {todos.map(todo => <Todo onCheckboxClick={toggleCheckbox} onDeleteClick={deleteTodo} key={todo.id} todo={todo}/>)}
          </ul>
      </div>
  );
}

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<App />);