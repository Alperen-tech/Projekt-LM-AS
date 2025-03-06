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