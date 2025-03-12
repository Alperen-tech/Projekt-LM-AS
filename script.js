// Navigationsfunktion: döljer alla sektioner och visar vald sektion
function showSection(sectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}
// Visa startsidan
showSection('home');

//  Event Planner Code 
let events = [];
let editIndex = null;
const eventForm = document.getElementById("eventForm");
const eventName = document.getElementById("eventName");
const eventStart = document.getElementById("eventStart");
const eventEnd = document.getElementById("eventEnd");
const saveEventBtn = document.getElementById("saveEventBtn");
const eventList = document.getElementById("eventList");
const filterSelect = document.getElementById("filterSelect");
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveEvent();
});
filterSelect.addEventListener("change", renderEvents);
function saveEvent() {
  const name = eventName.value.trim();
  const start = eventStart.value;
  const end = eventEnd.value;
  if (!name || !start || !end) {
    alert("Vänligen fyll i alla fält.");
    return;
  }
  const newEvent = { name, start, end };
  if (editIndex !== null) {
    events[editIndex] = newEvent;
    editIndex = null;
    saveEventBtn.textContent = "Spara Händelse";
  } else {
    events.push(newEvent);
  }
  eventName.value = "";
  eventStart.value = "";
  eventEnd.value = "";
  renderEvents();
}
function renderEvents() {
  eventList.innerHTML = "";
  let filteredEvents = [...events];
  const filterValue = filterSelect.value;
  const nowTime = Date.now();
  if (filterValue === "upcoming") {
    filteredEvents = filteredEvents.filter(evt => new Date(evt.end).getTime() > nowTime);
  } else if (filterValue === "past") {
    filteredEvents = filteredEvents.filter(evt => new Date(evt.end).getTime() <= nowTime);
  }
  // Ny sorteringslogik:
  // - Kommande händelser sorteras i stigande ordning (tidigast först)
  // - Tidigare händelser sorteras så att den senast inträffade hamnar överst
  // - Kommande händelser placeras alltid före tidigare
  filteredEvents.sort((a, b) => {
    const aTime = new Date(a.start).getTime();
    const bTime = new Date(b.start).getTime();
    const aUpcoming = aTime >= nowTime;
    const bUpcoming = bTime >= nowTime;
    if (aUpcoming && bUpcoming) {
      return aTime - bTime; // Tidigast kommande händelse först
    }
    if (!aUpcoming && !bUpcoming) {
      return bTime - aTime; // Senast inträffade händelse först
    }
    return aUpcoming ? -1 : 1; // Kommande händelser före tidigare
  });
  filteredEvents.forEach((evt, index) => {
    const li = document.createElement("li");
    li.classList.add("eventItem");
    if (new Date(evt.end).getTime() <= nowTime) {
      li.classList.add("pastEvent");
    }
    li.innerHTML = `
      <div>
        <strong>${evt.name}</strong><br/>
        Start: ${evt.start}<br/>
        Slut: ${evt.end}
      </div>
      <div>
        <button onclick="editEvent(${events.indexOf(evt)})">Redigera</button>
        <button onclick="deleteEvent(${events.indexOf(evt)})">Ta bort</button>
      </div>
    `;
    eventList.appendChild(li);
  });
}
function editEvent(index) {
  const evt = events[index];
  eventName.value = evt.name;
  eventStart.value = evt.start;
  eventEnd.value = evt.end;
  editIndex = index;
  saveEventBtn.textContent = "Uppdatera Händelse";
}
function deleteEvent(index) {
  events.splice(index, 1);
  renderEvents();
}
renderEvents();

// **************** Habit Tracker Code ****************
let habits = [];

function addHabit() {
  let habitText = document.getElementById('habitInput').value;
  let priority = document.getElementById('priorityInput').value;
  
  if (habitText !== '') {
    let habit = {
      text: habitText,
      priority: priority,
      count: 0,
      id: Date.now() // unikt id
    };
    habits.push(habit);
    document.getElementById('habitInput').value = '';
    displayHabits();
  } else {
    alert('Please enter a habit!');
  }
}

function increaseCount(id) {
  for (let habit of habits) {
    if (habit.id === id) {
      habit.count++;
      break;
    }
  }
  displayHabits();
  sortHabits(); // Anropa sortering innan vanor visas

}

function decreaseCount(id) {
  for (let habit of habits) {
    if (habit.id === id) {
      if (habit.count > 0) {
        habit.count--;
      }
      break;
    }
  }
  displayHabits();
}

function deleteHabit(id) {
  habits = habits.filter(habit => habit.id !== id);
  displayHabits();
}

function filterHabits() {
  displayHabits();
}

function sortHabits() {
  let sortValue = document.getElementById('habitSortSelect').value;

  if (sortValue === 'count-asc') {
    habits.sort((a, b) => a.count - b.count);
  } else if (sortValue === 'count-desc') {
    habits.sort((a, b) => b.count - a.count);
  } else if (sortValue === 'priority-asc') {
    const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
    habits.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  } else if (sortValue === 'priority-desc') {
    const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
    habits.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  }

  displayHabits();
}




function displayHabits() {
  let habitList = document.getElementById('habitList');
  let filterValue = document.getElementById('habitFilterSelect').value;

  habitList.innerHTML = '';

  habits.forEach(habit => {
    if (filterValue === 'all' || habit.priority === filterValue) {
      let habitDiv = document.createElement('div');
      habitDiv.className = `habit-item ${habit.priority}`;
      habitDiv.innerHTML = `
        <h3>${habit.text}</h3>
        <p>Priority: ${habit.priority}</p>
        <p>Count: ${habit.count}</p>
        <div class="count-buttons">
          <button onclick="decreaseCount(${habit.id})">-</button>
          <button onclick="increaseCount(${habit.id})">+</button>
          <button class="delete-button" onclick="deleteHabit(${habit.id})">Delete</button>
        </div>
      `;
      habitList.appendChild(habitDiv);
    }
  });
}

displayHabits();

