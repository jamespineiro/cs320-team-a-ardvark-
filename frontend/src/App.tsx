import Calendar from "./Calendar"; // 👈 make sure the path is correct
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

function App() {
  return (
    <div>
      <h1>Welcome to My Calendar App</h1>
      <Calendar /> {/* 👈 this renders your calendar */}
    </div>
  );
}

export default App;