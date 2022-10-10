import React, { memo } from "react";

const Button = ({ className, value, onClick }) => {
	return (
		<button className={`btn ${className}`} onClick={onClick}>
			{value}
		</button>
	);
};

export default memo(Button);
