import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// useEffect(() => {
// 	const interval = setInterval(showTime, 1000);
// 	function showTime() {
// 		let time = new Date();
// 		let hour = time.getHours();
// 		let min = time.getMinutes();
// 		let sec = time.getSeconds();
// 		let am_pm = "AM";

// 		if (hour > 12) {
// 			hour -= 12;
// 			am_pm = "PM";
// 		}
// 		if (hour == 0) {
// 			hour = 12;
// 			am_pm = "AM";
// 		}

// 		hour = hour < 10 ? "0" + hour : hour;
// 		min = min < 10 ? "0" + min : min;
// 		sec = sec < 10 ? "0" + sec : sec;

// 		setTime(hour + ":" + min + ":" + sec + am_pm);
// 		return () => clearInterval(interval);
// 	}
// }, [time]);

// console.log(time);
