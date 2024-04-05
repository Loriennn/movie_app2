import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import pic4 from './assets/pic4.jpeg';
import pic3 from './assets/pic3.jpeg';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

const style = {
  bg: `min-h-screen w-screen p-4 bg-gradient-to-r from-[#001489] to-[#001489]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto  shadow-xl p-4`,
  heading: `text-3xl font-bold text-center `,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-red-600 text-slate-100`,
  count: `text-center p-2`,
  customFont: {
    fontFamily: 'DMSans, Helvetica, Arial, "Lucida Grande", sans-serif'
  },
  formColor: {
    color: '' // White color
  }
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div>
      <img src={pic3}  style={{ display: 'block', margin: 'auto', width: '30%', height: 'auto' }} />
    <div className={style.bg}>
      <div className={style.container} style={style.customFont}>
        <h3 className={style.heading}>YOUR MOVIE WATCH LIST IS HERE</h3>
        <form onSubmit={createTodo} className={`${style.form} ${style.formColor}`}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`${style.input} text-pink-500 placeholder-pink-500`}
            type='text'
            placeholder='add your movie list here...'
           
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} movies`}</p>
        )}
      </div>
      <div>
      <img
  src={pic4}
  
  style={{ display: 'block', margin: 'auto', width: '60%', height: 'auto' }}
/>

      </div>
    </div>
    </div>





    
  );
  
}

export default App;
