import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo.jsx";
import TodoForm from "./components/TodoForm.jsx";
import Search from "./components/Search.jsx";
import Filter from "./components/Filter.jsx";

function App() {
	const [todos, setTodos] = useState([
		{
			id: 1,
			text: "Criar funcionalidade",
			category: "Trabalho",
			isCompleted: true,
		},
		{
			id: 2,
			text: "Ir para academia",
			category: "Pessoal",
			isCompleted: false,
		},
		{
			id: 3,
			text: "Estudar react",
			category: "Estudos",
			isCompleted: false,
		},
	]);

	const addTodo = (text, category) => {
		const newTodos = [
			...todos,
			{
				id: todos.length + 1,
				text,
				category,
				isCompleted: false,
			},
		];
		setTodos(newTodos);
	};

	const completeTodo = (id) => {
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isCompleted: true } : todo
		);
		setTodos(newTodos);
	};

	const removeTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [sort, setSort] = useState("Asc");

	return (
		<div className="app">
			<h1>Lista de tarefas</h1>
			<Search search={search} setSearch={setSearch} />
			<Filter
				filter={filter}
				setFilter={setFilter}
				sort={sort}
				setSort={setSort}
			/>
			<div className="todo-list">
				{todos
					.filter((todo) =>
						filter === "All"
							? true
							: filter === "Completed"
							? todo.isCompleted
							: !todo.isCompleted
					)
					.filter((todo) =>
						todo.text.toLowerCase().includes(search.toLowerCase())
					)
					.sort((a, b) =>
						sort === "Asc"
							? a.text.localeCompare(b.text)
							: b.text.localeCompare(a.text)
					)
					.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							removeTodo={removeTodo}
							completeTodo={completeTodo}
						/>
					))}
			</div>
			<TodoForm addTodo={addTodo} />
		</div>
	);
}
export default App;
