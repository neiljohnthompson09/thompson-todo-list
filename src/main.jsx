import {StrictMode,useState} from 'react'
import {createRoot} from 'react-dom/client'
import {CheckCircle2,Circle,ClipboardList,Plus,Trash2} from 'lucide-react'
import './index.css'

function TaskItem({task,onToggle,onDelete}){
 return <div className={`flex items-center gap-3 rounded-2xl border p-4 transition ${task.done?'border-emerald-200 bg-emerald-50':'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm'}`}>
  <button onClick={()=>onToggle(task.id)} className="shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400" aria-label="Toggle task">
   {task.done?<CheckCircle2 className="h-7 w-7 text-emerald-600"/>:<Circle className="h-7 w-7 text-slate-400 hover:text-indigo-600"/>}
  </button>
  <div className="min-w-0 flex-1"><p className={`break-words font-medium ${task.done?'text-slate-500 line-through':'text-slate-800'}`}>{task.text}</p><span className={`mt-1 inline-block text-xs font-semibold ${task.done?'text-emerald-700':'text-amber-600'}`}>{task.done?'Done':'Not Done'}</span></div>
  <button onClick={()=>onDelete(task.id)} className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" aria-label="Delete task"><Trash2 className="h-5 w-5"/></button>
 </div>
}

function UserGuide(){
 return <section className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6">
  <h2 className="text-xl font-bold text-slate-900">Instructions / User Guide</h2>
  <div className="mt-4 grid gap-4 md:grid-cols-3">
   <div><h3 className="font-semibold text-indigo-700">How to add a task</h3><p className="mt-1 text-sm leading-6 text-slate-600">Type a task and click Add Task or press Enter.</p></div>
   <div><h3 className="font-semibold text-indigo-700">How to mark a task</h3><p className="mt-1 text-sm leading-6 text-slate-600">Click the circle beside a task to switch Done and Not Done.</p></div>
   <div><h3 className="font-semibold text-indigo-700">How to delete a task</h3><p className="mt-1 text-sm leading-6 text-slate-600">Click the trash icon to remove a task.</p></div>
  </div>
 </section>
}

function App(){
 const [tasks,setTasks]=useState([{id:1,text:'Finish Laboratory 2 activity',done:false},{id:2,text:'Review React state and events',done:true}])
 const [input,setInput]=useState('')
 const addTask=e=>{e.preventDefault();const text=input.trim();if(!text)return;setTasks(t=>[...t,{id:Date.now(),text,done:false}]);setInput('')}
 const toggleTask=id=>setTasks(t=>t.map(x=>x.id===id?{...x,done:!x.done}:x))
 const deleteTask=id=>setTasks(t=>t.filter(x=>x.id!==id))
 const done=tasks.filter(x=>x.done).length
 return <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6"><div className="mx-auto max-w-4xl">
  <header className="mb-6 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg"><ClipboardList className="h-9 w-9"/></div><p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">DCIT 26 • Laboratory 2</p><h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">My To-Do List</h1><p className="mx-auto mt-3 max-w-2xl text-slate-600">A simple React task manager for adding, completing, and deleting tasks.</p></header>
  <section className="rounded-3xl bg-white p-5 shadow-xl sm:p-7">
   <form onSubmit={addTask} className="flex flex-col gap-3 sm:flex-row"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter a new task..." className="min-w-0 flex-1 rounded-2xl border border-slate-300 px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"/><button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-3.5 font-bold text-white hover:bg-indigo-700"><Plus className="h-5 w-5"/>Add Task</button></form>
   <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-emerald-50 p-4 text-center"><p className="text-2xl font-black text-emerald-700">{done}</p><p className="text-sm font-semibold text-emerald-800">Done</p></div><div className="rounded-2xl bg-amber-50 p-4 text-center"><p className="text-2xl font-black text-amber-700">{tasks.length-done}</p><p className="text-sm font-semibold text-amber-800">Not Done</p></div></div>
   <div className="mt-6 space-y-3">{tasks.length?tasks.map(t=><TaskItem key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask}/>):<div className="rounded-2xl border-2 border-dashed p-10 text-center text-slate-500">No tasks yet. Add your first task above.</div>}</div>
  </section>
  <UserGuide/><footer className="py-8 text-center text-sm text-slate-500">DCIT 26 • Application Development and Emerging Technologies</footer>
 </div></main>
}
createRoot(document.getElementById('root')).render(<StrictMode><App/></StrictMode>)
