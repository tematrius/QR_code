const Button = ({ children, onClick }) => {
    return (
      <button
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        onClick={onClick}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  