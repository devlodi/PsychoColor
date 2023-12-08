document.addEventListener('DOMContentLoaded', function() {
    const emotions = {
    "Felicidade": "#FFEA00", // Amarelo mais brilhante
    "Tristeza": "#3174AD", // Azul menos saturado
    "Raiva": "#D32F2F", // Vermelho com um tom mais escuro
    "Surpresa": "#FFA726", // Laranja mais suave
    "Medo": "#37474F", // Verde escuro acinzentado
    "Amor": "#E91E63", // Rosa mais profundo
    "Nojo": "#9C27B0", // Roxo mais vibrante
    "Empolgação": "#FF7043", // Laranja avermelhado
    "Calma": "#4DB6AC", // Turquesa suave
    "Ansiedade": "#FF8A65", // Salmão claro
    "Esperança": "#66BB6A", // Verde claro esperançoso
    "Confusão": "#FFEB3B", // Amarelo mais claro
    "Alegria": "#FF4081", // Rosa quente
    "Desgosto": "#546E7A", // Azul petróleo
    "Compaixão": "#FFCDD2", // Rosa pálido
    "Orgulho": "#673AB7", // Roxo mais escuro e saturado
    "Timidez": "#F8BBD0", // Rosa claro suave
    "Gratidão": "#FFC107", // Âmbar
    "Desespero": "#795548", // Marrom, associado à terra
    "Euforia": "#FBC02D", // Amarelo dourado
    "Curiosidade": "#7E57C2", // Roxo suave
    "Indiferença": "#9E9E9E", // Cinza médio
    "Inveja": "#2E7D32", // Verde escuro
    "Coragem": "#D84315", // Laranja queimado
    "Desconfiança": "#EF5350", // Vermelho coral
    "Frustração": "#C62828", // Vermelho vinho
    "Solidão": "#5C6BC0", // Azul calmo
    "Humildade": "#FFEE58", // Amarelo limão
    "Nostalgia": "#795548", // Marrom claro acinzentado
    "Esgotamento": "#78909C" // Azul cinza
    "Confiança": "#4e79a7", // Azul que denota confiabilidade
    "Insegurança": "#f28e2c", // Laranja que pode implicar cautela
    "Entusiasmo": "#e15759", // Vermelho vibrante para energia
    "Paz": "#76b7b2", // Azul-verde calmo para tranquilidade
    "Desilusão": "#af7aa1", // Lilás para sentimentos mistos
    "Satisfação": "#ff9da7", // Rosa claro para contentamento
    "Antecipação": "#9c755f", // Marrom para a expectativa de algo
    "Apatia": "#bab0ab", // Cinza para falta de interesse
    "Saudade": "#d4a6c8", // Roxo claro para memórias agridoces
    "Alegria": "#edc949", // Amarelo brilhante para felicidade
    "Melancolia": "#b07aa1", // Roxo acinzentado para tristeza reflexiva
    "Alívio": "#76c7c2", // Azul-verde claro para sensação de alívio
    "Empatia": "#59a14f", // Verde que implica compreensão e compartilhamento
    "Exaustão": "#af7aa1", // Lilás desbotado para cansaço
    "Vergonha": "#ff9d9a", // Vermelho pálido para constrangimento
    "Culpa": "#f1ce63", // Amarelo mostarda para desconforto
    "Entediamento": "#e8c3b9", // Bege para tédio
    "Admiração": "#8cd17d", // Verde claro para respeito e admiração
    "Surpresa Positiva": "#c5a5cf", // Lavanda para surpresas agradáveis
    "Surpresa Negativa": "#e15759", // Vermelho para choque ou surpresa desagradável
    "Ciúmes": "#b6992d", // Ouro velho para inveja ou desejo
    "Orgulho": "#499894", // Verde-azulado para autoestima positiva
    "Pânico": "#d37295", // Rosa-choque para um estado de alarme extremo
    "Contentamento": "#86bc9e", // Verde suave para satisfação e calma
};


   // Carregar entradas do Local Storage ou iniciar um objeto vazio se não houver nada salvo
    let currentEntries = JSON.parse(localStorage.getItem('entries')) || {};

    const emotionDropdown = document.getElementById('emotionDropdown');
    const emotionList = document.getElementById('emotionList');
    const dayList = document.getElementById('dayList');

    // Função para atualizar a tabela com base nas entradas salvas
        const updateDayList = () => {
        dayList.innerHTML = ''; // Limpar a tabela antes de adicionar novos elementos
        const headerRow = dayList.insertRow(0); // Criar o cabeçalho da tabela
        const headerDate = headerRow.insertCell(0);
        const headerColor = headerRow.insertCell(1);
        const headerActions = headerRow.insertCell(2);

        headerDate.textContent = 'DIA';
        headerColor.textContent = 'COLOR';
        headerActions.textContent = 'AÇÕES';
        headerActions.className = 'actions'; // Adicionar a classe ao cabeçalho de ações

        for (const date in currentEntries) {
            const entry = currentEntries[date];
            const row = dayList.insertRow(-1); // Adiciona a linha ao final da tabela
            const cellDate = row.insertCell(0);
            const cellColor = row.insertCell(1);
            const cellActions = row.insertCell(2); // Célula para ações (editar/excluir)
            cellActions.className = 'actions';
            cellDate.textContent = date;
            cellDate.style.cursor = 'pointer';
            cellColor.style.cursor = 'pointer';

               if (entry.emotions.length === 1) {
            cellColor.style.backgroundColor = emotions[entry.emotions[0]];
        } else {
            cellColor.style.background = `linear-gradient(to right, ${entry.emotions.map(emotion => emotions[emotion]).join(', ')})`;
        }

            cellDate.addEventListener('click', function() {
                alert(entry.description); // Mostrar descrição
            });

            cellColor.addEventListener('click', function() {
                alert(entry.emotions.join(', ')); // Mostrar emoções
            });




                 // Botão de editar
            const editBtn = document.createElement('button');
            editBtn.innerHTML = '✏️'; // Ícone de lápis para editar
            editBtn.classList.add('edit');
            editBtn.onclick = () => editEntry(date);
            cellActions.appendChild(editBtn);

            // Botão de excluir
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '❌'; // Ícone de 'x' para excluir
            deleteBtn.classList.add('delete');
            deleteBtn.onclick = () => deleteEntry(date);
            cellActions.appendChild(deleteBtn);
        }
    };


    // Funções de editar e excluir
    const editEntry = (date) => {
        const entry = currentEntries[date];
        document.getElementById('dateInput').value = date;
        document.getElementById('dayDescription').value = entry.description;
        emotionList.innerHTML = '';
        entry.emotions.forEach(emotion => {
            const emotionDiv = document.createElement('div');
            emotionDiv.textContent = emotion;
            emotionDiv.style.backgroundColor = emotions[emotion];
            emotionList.appendChild(emotionDiv);
        });
        document.getElementById('modal').style.display = 'block';
    };

    const deleteEntry = (date) => {
        if (confirm('Tem certeza que deseja excluir esta entrada?')) {
            delete currentEntries[date];
            localStorage.setItem('entries', JSON.stringify(currentEntries));
            updateDayList();
        }
    };

    for (const emotion in emotions) {
        const option = document.createElement('option');
        option.value = emotion;
        option.textContent = emotion;
        emotionDropdown.appendChild(option);
    }




    document.getElementById('addDayBtn').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'block';
        document.getElementById('dateInput').value = new Date().toISOString().split('T')[0];
    });

    document.getElementById('addEmotionBtn').addEventListener('click', function() {
        const selectedEmotion = emotionDropdown.value;
        const emotionDiv = document.createElement('div');
        emotionDiv.textContent = selectedEmotion;
        emotionDiv.style.backgroundColor = emotions[selectedEmotion];
        emotionList.appendChild(emotionDiv);
    });

    document.getElementById('saveDayBtn').addEventListener('click', function() {
        const date = document.getElementById('dateInput').value;
        const description = document.getElementById('dayDescription').value;
        const emotionsForDay = [...emotionList.childNodes].map(node => node.textContent);

        // Salvar a entrada no objeto e no Local Storage
        currentEntries[date] = {
            description,
            emotions: emotionsForDay
        };
        localStorage.setItem('entries', JSON.stringify(currentEntries));

        updateDayList(); // Atualizar a tabela com as novas entradas

        // Limpar o modal
        emotionList.innerHTML = '';
        document.getElementById('dayDescription').value = '';
        document.getElementById('modal').style.display = 'none';
    });


    updateDayList(); // Atualizar a tabela ao carregar a página
});

document.getElementById('infoIcon').addEventListener('click', function() {
    document.getElementById('infoModal').style.display = 'block';
});

// Fechar o modal quando o usuário clicar no 'X'
document.querySelector('#infoModal .close').addEventListener('click', function() {
    document.getElementById('infoModal').style.display = 'none';
});

// Fechar o modal quando o usuário clicar fora dele
window.onclick = function(event) {
    if (event.target == document.getElementById('infoModal')) {
        document.getElementById('infoModal').style.display = 'none';
    }
};
