import { useLayoutEffect, useReducer, useState, useEffect } from "react";
import Button from "./components/Button";

const btnValues = [
	["AC", "←", "%", "÷"],
	["7", "8", "9", "×"],
	["4", "5", "6", "-"],
	["1", "2", "3", "+"],
	["0", ".", "="],
];
const topBtns = ["AC", "%", "←"];
const sideBtns = ["÷", "×", "-", "+", "="];
const _operators = ["÷", "×", "-", "+", "%"];
const equalBtns = ["="];
const _screenValues = btnValues
	.flat()
	.filter((item) => !["AC", "←", "="].includes(item));
const signs = sideBtns.filter((btn) => btn !== "=");
const numbers = btnValues
	.flat()
	.filter((item) => !topBtns.includes(item) && !sideBtns.includes(item));
const initialState = {
	computation: null,
	operators: null,
	screenValues: null,
	currentValue: "0",
	lastScreenValue: null,
	overWrite: false,
	isComputated: false,
};
const Actions = {
	ADD_VALUES: "ADD_VALUES",
	DELETE: "DELETE",
	CLEAR: "CLEAR",
	EVALUATE: "EVALUATE",
	ADD_OPERATORS: "ADD_OPERATORS",
	ADD_SCREENVALUES: "ADD_SCREENVALUES",
};
function reducer(state, { type, payload }) {
	const {
		computation,
		operators,
		screenValues,
		currentValue,
		lastScreenValue,
		overWrite,
	} = state;
	switch (type) {
		case Actions.ADD_VALUES:
			if (currentValue == "0" && payload == "0") return state;
			if (payload == "." && currentValue.includes(".")) return state;
			if (currentValue === null && payload == ".") {
				console.log("hello");
				return {
					...state,
					currentValue: payload,
				};
			}
			if (overWrite === true) {
				return {
					...state,
					currentValue: payload,
					overWrite: false,
					isComputated: false,
				};
			}
			if (currentValue == "0" && payload != "." && !operators) {
				return {
					...state,
					currentValue: payload,
					isComputated: false,
				};
			}
			return {
				...state,
				currentValue: `${currentValue || " "}${payload}`,
				isComputated: false,
			};
		case Actions.DELETE:
			if (currentValue == null && operators) {
				return {
					...state,
					operators: null,
					currentValue: computation,
					computation: null,
					isComputated: false,
				};
			}
			if (currentValue.length === 1 && !operators) {
				return {
					...state,
					currentValue: "0",
					isComputated: false,
				};
			}
			if (currentValue.length === 1 && operators) {
				return {
					...state,
					currentValue: null,
					isComputated: false,
				};
			}
			if (overWrite === true) {
				return {
					...state,
					currentValue: "0",
					overWrite: false,
					isComputated: false,
				};
			}
			return {
				...state,
				currentValue: currentValue.slice(0, -1),
				isComputated: false,
			};
		case Actions.CLEAR:
			return {
				computation: null,
				operators: null,
				screenValues: null,
				currentValue: "0",
				isComputated: false,
			};
		case Actions.EVALUATE:
			if ((computation == null, operators == null)) return state;
			if (currentValue == null && operators) {
				return {
					...state,
					currentValue: computation,
					operators: null,
					computation: null,
					isComputated: false,
				};
			}
			return {
				...state,
				currentValue: evaluate(state),
				computation: null,
				operators: null,
				overWrite: true,
				isComputated: true,
			};
		case Actions.ADD_OPERATORS:
			if (operators == payload && currentValue == null) return state;
			if (
				payload !== "-" &&
				currentValue == "0" &&
				computation == null &&
				payload !== "+"
			)
				return state;
			if (currentValue == null) {
				return {
					...state,
					operators: payload,
					isComputated: false,
				};
			}
			if (computation == null) {
				return {
					...state,
					computation: currentValue,
					currentValue: null,
					operators: payload,
					isComputated: false,
				};
			}
			return {
				...state,
				operators: payload,
				currentValue: null,
				computation: evaluate(state),
				isComputated: false,
			};
		case Actions.ADD_SCREENVALUES:
			if (
				screenValues == "0" &&
				payload != "." &&
				!operators &&
				payload == "0"
			) {
				return {
					...state,
					screenValues: payload,
				};
			}
			if (_operators.includes(lastScreenValue) && _operators.includes(payload))
				return state;
			return {
				...state,
				screenValues: `${screenValues || ""}${payload}`,
				lastScreenValue: payload,
			};

		default:
			break;
	}
}

function evaluate({ computation, currentValue, operators }) {
	const prev = parseFloat(computation);
	const curr = parseFloat(currentValue);
	let answer = "";
	if (isNaN(prev) || isNaN(curr)) return;
	switch (operators) {
		case "+":
			answer = prev + curr;
			break;
		case "-":
			answer = prev - curr;
			break;
		case "%":
			answer = (prev * curr) / 100;
			break;
		case "÷":
			answer = prev / curr;
			break;
		case "×":
			answer = prev * curr;
			break;
		default:
			break;
	}
	return answer.toString();
}
function App() {
	const [
		{ computation, operators, screenValues, currentValue, isComputated },
		dispatch,
	] = useReducer(reducer, initialState);
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
	function toggleTheme(theme, setTheme) {
		setTheme((theme) => (theme === "light" ? "dark" : "light"));
	}
	useLayoutEffect(() => {
		document.body.className = theme;
		localStorage.setItem("theme", theme);
	});

	const transformSun =
		theme === "dark" ? "translateX(45px) rotate(250deg)" : "translateX(0px)";
	const opacitySun = theme === "dark" ? "0" : "1";
	const transformMoon =
		theme === "dark" ? "translateX(0px) rotate(350deg)" : "translateX(-45px)";
	const opacityMoon = theme === "dark" ? "1" : "0";
	const switchBg = theme === "light" ? "rgb(15, 128, 101)" : "rgb(90, 128, 15)";

	return (
		<div className='wrapper'>
			{/* <p>{screenValues}</p> */}
			{/* <div className='time'>{time}</div> */}
			<div
				className='switch-container'
				onClick={() => toggleTheme(theme, setTheme)}>
				<div className='box' style={{ background: switchBg }}>
					<i
						className='fas fa-sun '
						id='sun'
						style={{ transform: transformSun, opacity: opacitySun }}></i>
					<i
						className='fas fa-moon'
						id='moon'
						style={{ transform: transformMoon, opacity: opacityMoon }}></i>
					<span className='ball'></span>
				</div>
			</div>
			<div className='screen'>
				{isComputated && <span>Ans</span>}
				<div className='screen1'>
					{computation} {operators}
				</div>
				<div className='screen2'>{currentValue}</div>
			</div>
			<div className='buttonBox'>
				{btnValues.flat().map((val, idx) => (
					<Button
						key={idx}
						value={val}
						onClick={() => {
							navigator.vibrate([50]);
							if (_screenValues.includes(val)) {
								dispatch({ type: Actions.ADD_SCREENVALUES, payload: val });
							}
							if (numbers.includes(val)) {
								dispatch({ type: Actions.ADD_VALUES, payload: val });
							}
							if (val === "AC") {
								dispatch({ type: Actions.CLEAR });
							}
							if (_operators.includes(val)) {
								dispatch({ type: Actions.ADD_OPERATORS, payload: val });
							}
							if (val === "=") {
								dispatch({ type: Actions.EVALUATE });
							}
							if (val === "←") {
								dispatch({ type: Actions.DELETE });
							}
						}}
						className={
							equalBtns.includes(val)
								? "equalTo"
								: sideBtns.includes(val)
								? "sideBtns"
								: topBtns.includes(val)
								? "topBtns"
								: ""
						}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
