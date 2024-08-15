import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";

export const ReactiveLink = ({children, to, classes}) => {
	const {setLinkOver} = queryLinkOver();
	return (
		<Link className={"cursor-none " + classes} to={to}  onMouseEnter={()=>{
			setLinkOver(true);
		}} onMouseLeave={()=>setLinkOver(false)}>
			{children}
		</Link>
	)
}

ReactiveLink.proptypes = {
	to: PropTypes.string.isRequired,
	classes: PropTypes.string
}