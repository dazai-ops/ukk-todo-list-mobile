// Consistent format for Priority in Front End
// Low, Medium, High
export const formatPriority = (priority) => {
  if(!priority) return undefined
  
  const listsPriority = {
    low: "Low",
    medium: "Medium",
    high: "High",
  }
  return priority ? listsPriority[priority.toLowerCase()] : "";
}

// Consistent format for Status in Front End
// Open, In Progress, Done
export const formatStatus = (status) => {
  if(!status) return undefined

  const listsStatus = {
    open: "Open",
    in_progress: "In Progress",
    done: "Done",
  }
  return status ? listsStatus[status.toLowerCase()] : "";
}

// Consistent format for Status in API
// open, in_progress, done
export const formatStatusToSnake = (status) => {
  if(!status) return undefined
  const listsStatus = {
    "Open": "open",
    "In Progress": "in_progress",
    "Done": "done",
  }
  return listsStatus[status] || undefined;
}

// Consistent format for Priority in API
// low, medium, high
export const formatPriorityToLowercase = (priority) => {
  if(!priority) return undefined
  const listsPriority = {
    "Low": "low",
    "Medium": "medium",
    "High": "high",
  }
  return listsPriority[priority] || undefined;
}

// Format date to Indonesia for Front End
// Output: "Selasa, 30-07-2024"
// Hari ini
export const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak valid";

  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  const [year, month, day] = dateString.split("-");
  const inputDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  if (dateString === formattedToday) {
    return "Hari ini";
  }

  const dayNameOptions = { weekday: "long" };
  const dayName = new Intl.DateTimeFormat("id-ID", dayNameOptions).format(inputDate);

  return `${dayName}, ${day}-${month}-${year}`;
}

// Format time to Indonesia for Front End
// Output: "00:00"
export const formatTime = (timeString) => {
  const date = new Date(`1970-01-01T${timeString}`);

  const formattedTime = new Intl.DateTimeFormat('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  }).format(date);

  return formattedTime
}

// Format time to Indonesia for API
// Output: "00:00:00"
export const formatTimeToDate = (timeString) => {
  if(!timeString) return new Date()
  
  const [hour, minute, seconds] = timeString.split(":").map(Number);
  const date = new Date()
  date.setHours(hour, minute, seconds || 0)
  return date
}