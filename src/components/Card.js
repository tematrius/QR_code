const Card = ({ children, onClick }) => {
    return (
      <div
        className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={onClick}
      >
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children }) => {
    return <div className="flex flex-col items-center">{children}</div>;
  };
  
  export default Card;
  