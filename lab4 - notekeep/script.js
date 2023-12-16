document.addEventListener('DOMContentLoaded', () => {
    displayNotes();
  });
  
  function addNote() {
    const unique = "id" + Math.random().toString(16).slice(2);
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const date = new Date().toLocaleString();
  
    const note = {
      unique,
      title,
      content,
      color,
      pin,
      date
    };
  
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  
    displayNotes();
  }
  
  function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
  
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    notes.sort((a, b) => {
      if (a.pin && !b.pin) {
        return -1;
      } else if (!a.pin && b.pin) {
        return 1;
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  
    notes.forEach((note, index) => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note', note.color);
  
      const formattedDate = note.date.toLocaleString();
  
      if (note.pin === true) {
        noteElement.innerHTML = `
          <h5>Przypięte</h5>
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <p>Data utworzenia: ${formattedDate}</p>
          <button onclick="pinNote('${note.unique}')">Przypnij</button>
          <button onclick="editNote('${note.unique}')">Edytuj</button>
          <select id="color-${note.unique}" onchange="changeColor('${note.unique}', this.value)">
            <option value="yellow" ${note.color === 'yellow' ? 'selected' : ''}>Żółty</option>
            <option value="pink" ${note.color === 'pink' ? 'selected' : ''}>Różowy</option>
            <option value="blue" ${note.color === 'blue' ? 'selected' : ''}>Niebieski</option>
          </select>
          <button onclick="deleteNote('${note.unique}')">Usuń</button>
        `;
      } else {
        noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <p>Data utworzenia: ${formattedDate}</p>
          <button onclick="pinNote('${note.unique}')">Przypnij</button>
          <button onclick="editNote('${note.unique}')">Edytuj</button>
          <select id="color-${note.unique}" onchange="changeColor('${note.unique}', this.value)">
            <option value="yellow" ${note.color === 'yellow' ? 'selected' : ''}>Żółty</option>
            <option value="pink" ${note.color === 'pink' ? 'selected' : ''}>Różowy</option>
            <option value="blue" ${note.color === 'blue' ? 'selected' : ''}>Niebieski</option>
          </select>
          <button onclick="deleteNote('${note.unique}')">Usuń</button>
        `;
      }
  
      notesList.appendChild(noteElement);
    });
  }
  
  function pinNote(unique) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToPin = notes.find(note => note.unique === unique);
  
    if (noteToPin) {
      noteToPin.pin = !noteToPin.pin;
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    }
  }
  
  function editNote(unique) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToEdit = notes.find(note => note.unique === unique);
  
    if (noteToEdit) {
      const updatedTitle = prompt('Aktualizuj tytuł:', noteToEdit.title);
      const updatedContent = prompt('Aktualizuj treść:', noteToEdit.content);
  
      if (updatedTitle !== null && updatedContent !== null) {
        noteToEdit.title = updatedTitle;
        noteToEdit.content = updatedContent;
  
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
      }
    }
  }
  
  function changeColor(unique, newColor) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteToColorChange = notes.find(note => note.unique === unique);
  
    if (noteToColorChange) {
      noteToColorChange.color = newColor;
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    }
  }
  
  function deleteNote(unique) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.unique !== unique);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
  }
  