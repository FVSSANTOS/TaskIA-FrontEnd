import React from "react";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl flex flex-col py-8 z-50 hidden md:flex">
      {/* Logo Section */}
      <div className="px-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_tree
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">TaskIA</h1>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-0.5">AI Productivity</p>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 space-y-2 px-3">
        <a className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-white hover:bg-slate-700/40 rounded-lg transition-all duration-200 group" href="#">
          <span className="material-symbols-outlined text-lg group-hover:text-indigo-400 transition-colors">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3.5 text-white bg-indigo-600/20 border-l-2 border-indigo-500 rounded-lg hover:bg-indigo-600/30 transition-all duration-200 group" href="#">
          <span className="material-symbols-outlined text-lg text-indigo-400" style={{ fontVariationSettings: "'FILL' 1" }}>
            view_kanban
          </span>
          <span className="text-sm font-medium">Quadro Kanban</span>
        </a>
        
      </nav>

      {/* Bottom Section */}
      <div className="px-3 mt-auto space-y-3">
        <button className="w-full py-3 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/50 hover:shadow-indigo-600/70 hover:brightness-110 active:scale-95 transition-all">
          + Novo Projeto
        </button>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/40 rounded-lg transition-all duration-200 group" href="#">
          <span className="material-symbols-outlined text-lg group-hover:text-indigo-400 transition-colors">help</span>
          <span className="text-sm font-medium">Ajuda</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group" href="#">
          <span className="material-symbols-outlined text-lg group-hover:text-red-400 transition-colors">logout</span>
          <span className="text-sm font-medium">Sair</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
