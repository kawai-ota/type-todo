import { useState, useRef} from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef()

  const handleAddTodo = () => {
    //タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  }

  /* 上の行で、値をnullにしているのは、一度
     const name = todoNameRef.current.value
     この部分をからにして、新しいタスクの追加をできるようにするため。 */


  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);  
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }  

  /* toggleTodoは関数なので、呼び出し方としては、toggleTodo(変数)で呼び出すことができる。
     idは数学のnみたいな感じなので、n=todo.idとしたら、todos.id = todos.idとすることができる。
     そして、setTodosで値を更新する。 */

  /* まず、上でやってることとしては、newTodosに値をコピーして、
  　　todoに値を格納する。このfind関数は、一つ一つの
  　　値を確かめる関数のこと。そして、todoから取得したidの値を
  　　一致するかどうかを調べる。 */


  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  /* 上のfilter関数は!todo.completedでfalseならばtrueになるtrueならば
     falseになるため、新たな配列に格納されない。だから完了したタスクの削除
     を押したときに新たな配列にtrueのやつは入らないので消されてしまう。 */
  
  return (
    <div>
       <TodoList todos = {todos} toggleTodo = {toggleTodo} />
       <input type = "text" ref={todoNameRef}/>
       <button onClick={handleAddTodo}>タスクの追加</button>
       <button onClick={handleClear}>完了したタスクの削除</button>
       <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  );
}



/* find関数については、条件式がtrueならばtrueのものだけを変数の中に入れてあげればいい。
　filter関数は
   引数todoに配列の中から取り出された1個1個の値が代入されている。
   filter メソッドは、Callback 関数が true の時の要素のみで新たに配列を作成してくれる。
   todo.completedはtrueならば!があるからfalseになる。逆にfalseならばtrueになる。
   filter関数はtrueのもので新たな配列を作る。つまり、もともとtrueのものはfalseになるので
   falseになり、配列に格納されない。*/

export default App;

/* ・<TodoList>のtodosに関しては、props名であり、({todos})
   　で渡すこともできる。
   ・<input type = "text" ref={todoNameRef}/>
   　ここに関しては、textに書いたものがrefとして取得される。
   　そして、useRefで要素を取得できる。 
*/
