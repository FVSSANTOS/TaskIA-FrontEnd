import React from 'react';

// O componente recebe 'task' (os dados da tarefa) e 'onMove' (função para mudar de coluna)
export default function Card({ task, onMove }) {
  // Desestruturando as propriedades da tarefa para facilitar o uso
  const { id, titulo, descricao, prioridade, esforco, coluna } = task;

  // Função auxiliar para definir a cor da tag com base na prioridade
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'alta': return 'bg-red-500 text-white';
      case 'média': 
      case 'media': return 'bg-yellow-500 text-black';
      case 'baixa': return 'bg-green-500 text-white';
      default: return 'bg-gray-400 text-black';
    }
  };

  return (
    <div className="card bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-3 flex flex-col gap-2">
      {/* Cabeçalho do Card: Título e Tag de Prioridade gerada pela IA */}
      <div className="flex justify-between items-start gap-2">
        <h4 className="font-bold text-lg text-gray-800 break-words">{titulo}</h4>
        {prioridade && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(prioridade)}`}>
            {prioridade}
          </span>
        )}
      </div>

      {/* Descrição da Tarefa */}
      <p className="text-sm text-gray-600 break-words">{descricao}</p>

      {/* Rodapé do Card: Estimativa de Esforço da IA e Controles de Movimentação */}
      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
        {esforco && (
          <div className="text-xs text-gray-500 flex items-center gap-1">
            ⏱️ <span>{esforco}</span>
          </div>
        )}

        {/* Seleção para mover entre as colunas obrigatórias */}
        <select 
          value={coluna} 
          onChange={(e) => onMove(id, e.target.value)}
          className="text-xs bg-gray-50 border border-gray-300 rounded p-1 text-gray-700 cursor-pointer"
        >
          <option value="A Fazer">A Fazer</option>
          <option value="Em Progresso">Em Progresso</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>
    </div>
  );
}