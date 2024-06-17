export const BlockBackground = ({ children, style }) => {
	const combinedStyle = {
		...{
			// margin: "30px auto 50px",
			padding: "20px 40px",
			marginBottom: "30px",
			borderRadius: "40px",
			background: "rgba(245, 245, 253, 0.3)",
			boxShadow: "5px 5px 13px #f0f0f8, -5px -5px 13px #fafaff"
		},
		...style
	};
	return <div style={combinedStyle}>{children}</div>;
};
