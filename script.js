
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
  
    const newEvent = {
      name,
      start,
      end,
    };
  
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
  
    // Dela upp händelser i kommande / tidigare
    const now = new Date().toISOString(); 
  
    if (filterValue === "upcoming") {
      filteredEvents = filteredEvents.filter(evt => evt.end > now);
    } else if (filterValue === "past") {
      filteredEvents = filteredEvents.filter(evt => evt.end <= now);
    }
  
    // Sortera händelserna efter startdatum (närmast först)
    filteredEvents.sort((a, b) => {
      return new Date(a.start) - new Date(b.start);
    });
  
    filteredEvents.forEach((evt, index) => {
      const li = document.createElement("li");
      li.classList.add("eventItem");
  
      // Kolla om händelsen är passerad
      if (evt.end <= now) {
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
let habits = [];


function addHabit() {
   
    let habitText = document.getElementById('habitInput').value;
    let priority = document.getElementById('priorityInput').value;
    
    
    if (habitText !== '') {
      
        let habit = {
            text: habitText,
            priority: priority,
            count: 0,
            id: Date.now() //create unique id
        };
        
       
        habits.push(habit);
        
        // Clear habitInput
        document.getElementById('habitInput').value = '';
        
        // Updatedisplay
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


function displayHabits() {
  let habitList = document.getElementById('habitList');
  let filterValue = document.getElementById('filterSelect').value;


  habitList.innerHTML = '';
  
 
  habits.forEach(habit => {
      // Check if habit should be shown based on filter
      if (filterValue === 'all' || habit.priority === filterValue) {
          // Create habit element
          let habitDiv = document.createElement('div');
          habitDiv.className = `habit-item ${habit.priority}`;
          
          // Add habit content
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
          
          // Add list
          habitList.appendChild(habitDiv);
      }
  });
}


displayHabits();
displayHabits();

