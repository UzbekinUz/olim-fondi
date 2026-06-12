import { ArrowUp } from "lucide-react";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
function UpButton() {
    return ( 
        <button
          onClick={scrollToTop}
          aria-label="Tepaga qaytish"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-bounce"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
     );
}

export default UpButton;