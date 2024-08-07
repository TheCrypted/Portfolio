import {createContext, useContext, useState} from "react";

const MouseOverContext = createContext({})

export const LinkOverTrigger = ({children}) => {
	const [linkOver, setLinkOver] = useState(false)

	const contextValue = {
		linkOver,
		setLinkOver
	}

	return (
		<MouseOverContext.Provider value={contextValue}>
			{children}
		</MouseOverContext.Provider>
	)
}

export const queryLinkOver = () => {
	return useContext(MouseOverContext);
}