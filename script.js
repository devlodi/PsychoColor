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
        "Esgotamento": "#708090"
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

            // Criar um degradê de cores para as emoções
            cellColor.style.background = `linear-gradient(to right, ${entry.emotions.map(emotion => emotions[emotion]).join(', ')})`;

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