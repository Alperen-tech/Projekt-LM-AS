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