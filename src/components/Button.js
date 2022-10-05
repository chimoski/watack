import React from "react";

export const Button = ({ value, onClick, className }) => {
	return (
		<button className={`btn ${className}`} onClick={onClick}>
			{value}
		</button>
	);
};
