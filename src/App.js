import { useState } from "react";
import { Button } from "./components/Button";

const btnValues = [
	["AC", "%", "←", "÷"],
	["7", "8", "9", "×"],
	["4", "5", "6", "-"],
	["1", "2", "3", "+"],
	["0", ".", "="],
];
const topBtns = ["AC", "%", "←"];
const sideBtns = ["÷", "×", "-", "+", "="];
const equalBtns = ["="];

function App() {
	const [calc, setCalc] = useState({
		sign: "",
		num: 0,
		res: 0,
	});
	return (
		<div className='wrapper'>
			<div className='screen'>
				<textarea cols='30' rows='10' className='textarea' disabled>
					{calc.num ? calc.num : calc.res}
				</textarea>
			</div>
			<div className='buttonBox'>
				{btnValues.flat().map((val, idx) => (
					<Button
						key={idx}
						value={val}
						onClick={() => {
							console.log(val);
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
