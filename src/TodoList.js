import React from 'react';
import Todo from './Todo';

const TodoList = ({todos,toggleTodo}) => {
  return todos.map((todo) => <Todo todo = {todo} key = {todo.id} toggleTodo = {toggleTodo} />);
}

export default TodoList;

/* まず、todoという変数名を用意して、それに、map関数で
　　取得してきた、値を格納する。そして、props名をtodoとして、
　　格納した値とイコールにする。このpropsを<Todo>コンポーネントに
　　渡す。*/