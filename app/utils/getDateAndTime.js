export const getTodayDate = () => {
  return new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).split("/").reverse().join("-");
}

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const formattedTomorrow = tomorrow.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).split("/").reverse().join("-");
  
  return formattedTomorrow;
}

export const getCurrentTime = () => {
  const todayTime = new Date();
  const currentTime = todayTime.toTimeString().split(' ')[0];
  return currentTime;
}
