document.addEventListener('DOMContentLoaded', function() {
    const emotions = {
        "Felicidade": "#FFD700",
        "Tristeza": "#0000FF",
        "Raiva": "#FF0000",
        "Surpresa": "#FFA500",
        "Medo": "#008000",
        "Amor": "#FF1493",
        "Nojo": "#800080",
        "Empolgação": "#FF4500",
        "Calma": "#00CED1",
        "Ansiedade": "#FF6347",
        "Esperança": "#00FF00",
        "Confusão": "#FFFF00",
        "Alegria": "#FF69B4",
        "Desgosto": "#008080",
        "Compaixão": "#FFC0CB",
        "Orgulho": "#800000",
        "Timidez": "#FFB6C1",
        "Gratidão": "#DAA520",
        "Desespero": "#800000",
        "Euforia": "#FFD700",
        "Curiosidade": "#9370DB",
        "Indiferença": "#C0C0C0",
        "Inveja": "#228B22",
        "Coragem": "#800080",
        "Desconfiança": "#FF6347",
        "Frustração": "#800080",
        "Solidão": "#4682B4",
        "Humildade": "#FFFF00",
        "Nostalgia": "#D2691E",
        "Esgotamento": "#708090",
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
    "Contentamento": "#86bc9e" // Verde suave para satisfação e calma

    };


   // Carregar entradas do Local Storage ou iniciar um objeto vazio se não houver nada salvo
    let currentEntries = JSON.parse(localStorage.getItem('entries')) || {};

document.getElementById('summaryBtn').addEventListener('click', function() {
    const emotionsCount = {};
    // Calcular a contagem de cada emoção
    for (const date in currentEntries) {
        currentEntries[date].emotions.forEach(emotion => {
            if (!emotionsCount[emotion]) {
                emotionsCount[emotion] = 0;
            }
            emotionsCount[emotion]++;
        });
    }

    // Atualizar o modal com as contagens
    const emotionsCountDiv = document.getElementById('emotionsCount');
    emotionsCountDiv.innerHTML = ''; // Limpar as contagens anteriores
    let gradientColors = []; // Para armazenar as cores que serão usadas no gradiente

    for (const [emotion, count] of Object.entries(emotionsCount)) {
        emotionsCountDiv.innerHTML += `<p>${emotion}: ${count} vezes</p>`;
        // Adicionar a cor dessa emoção ao array de gradientes, multiplicado pela contagem
        gradientColors.push(...Array(count).fill(emotions[emotion]));
    }

    // Atualizar o gradiente de cores com as cores das emoções que foram contadas
    const emotionsGradientDiv = document.getElementById('emotionsGradient');
    emotionsGradientDiv.style.background = `linear-gradient(to right, ${gradientColors.join(', ')})`;

    // Exibir o modal
    document.getElementById('summaryModal').style.display = 'block';
});

// Fechar o modal de resumo
document.querySelector('#summaryModal .closeSummary').addEventListener('click', function() {
    document.getElementById('summaryModal').style.display = 'none';
});


window.onclick = function(event) {
    if (event.target == document.getElementById('summaryModal')) {
        document.getElementById('summaryModal').style.display = 'none';
    }
};






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


// JavaScript para fechar o modal
document.addEventListener('DOMContentLoaded', (event) => {
    // Quando o documento estiver carregado, configure o ouvinte de eventos
    var closeModalButtons = document.querySelectorAll('.close'); // Seleciona todos os botões de fechar

    closeModalButtons.forEach(function(btn) {
        btn.onclick = function() {
            var modal = btn.closest('.modal'); // Encontra o modal mais próximo do botão
            modal.style.display = 'none'; // Esconde o modal
        };
    });
});
