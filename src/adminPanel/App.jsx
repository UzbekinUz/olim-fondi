import { useState, useEffect } from "react";
import "./App.css";
import { Trash } from "lucide-react";
import Login from "./login";
import SelectedApp from "./pages/selectedApp";
import Header from "./pages/header";
import SideBar from "./pages/sidebar";
import { initialNews } from "./data/static.json";
import axios from "axios";
import { API_LINK } from "./cfg";

export default function AppAdmin() {
  const [news, setNews] = useState(initialNews);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null); // Detailed view
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNewsIdx, setEditingNewsIdx] = useState(null);
  const [refresh, setRefresh] = useState(false); // null means "Create" mode
  const [appData, setAppData] = useState([]);
  // News Form fields state
  const [newsForm, setNewsForm] = useState({
    title: "",
    category: "E'lon",
    date: "",
    image: "",
    content: "",
  });
  useEffect(() => {
    axios.get(`${API_LINK}/apply/getall`).then((res) => {
      const { ok, data } = res.data;
      if (ok) {
        setAppData(data);
      }
    });
  }, [refresh]);
  // Custom Toast notification
  const [toast, setToast] = useState({
    show: false,
    message: "",
    icon: null,
    color: "",
  });
  // Current Date String for header
  const [currentDateStr, setCurrentDateStr] = useState("");

  useEffect(() => {
    const dateObj = new Date();
    const monthsUz = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentyabr",
      "Oktyabr",
      "Noyabr",
      "Dekabr",
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDateStr(
      `${dateObj.getDate()}-${monthsUz[dateObj.getMonth()]}, ${dateObj.getFullYear()}`,
    );
  }, []);

  // --- ACTIONS ---
  const triggerToast = (message, icon, colorClass = "text-emerald-400") => {
    setToast({ show: true, message, icon, color: colorClass });
    setTimeout(() => {
      setToast({ show: false, message: "", icon: null, color: "" });
    }, 3500);
  };

  const [admin, setAdmin] = useState(false);



  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await axios.get(`${API_LINK}/news/getall`);
        if (response.data.ok) {
          setNews(response.data.data); // Serverdan kelgan massivni saqlaymiz
        } else {
          console.error(response.data.msg);
        }
      } catch (error) {
        console.error("Yangiliklarni yuklashda xatolik:", error);
      }
    };

    fetchAllNews();
  }, []);

  // --- 2. Yangilikni o'chirish (delete) ---
  const handleDeleteNews = async (id) => {
    if (window.confirm("Haqiqatdan ham ushbu yangilikni o'chirmoqchimisiz?")) {
      try {
        const response = await axios.delete(`${API_LINK}/news/delete/${id}`);
        if (response.data.ok) {
          // UI dan o'chirilgan elementni olib tashlaymiz
          setNews((prev) => prev.filter((item) => item._id !== id));
          triggerToast(
            "Yangilik muvaffaqiyatli o'chirildi!",
            <Trash className="w-5 h-5" />,
            "text-red-400",
          );
        } else {
          alert(response.data.msg);
        }
      } catch (error) {
        console.error("O'chirishda xatolik:", error);
        alert("Serverda xatolik yuz berdi.");
      }
    }
  };

  if (admin) {
    return <Login ref={refresh} setRef={setRefresh} setAdmin={setAdmin} />;
  } else {
    return (
      <div className="h-screen fixed top-0 z-500  w-full overflow-hidden flex flex-col bg-slate-50 font-sans">
        {/* Top Navbar Mobile */}
        <Header setSidebarOpen={setSidebarOpen} />

        <SideBar
        setNewsForm={setNewsForm}
        newsForm={newsForm}
          setRefresh={setRefresh}
          refresh={refresh}
          apps={appData}
          currentDateStr={currentDateStr}
          sidebarOpen={sidebarOpen}
          setEditingNewsIdx={setEditingNewsIdx}
          news={news}
          currentDateStr={currentDateStr}
          setSelectedApp={setSelectedApp}
          setAdmin={setAdmin}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setNews={setNews}
          triggerToast={triggerToast}
          setEditingNewsIdx={setEditingNewsIdx}
          setNewsForm={setNewsForm}
          setNewsModalOpen={setNewsModalOpen}
          setNews={setNews}

          editingNewsIdx={editingNewsIdx}
        />

        {/* ==================== DETAILED APPLICATION VIEW MODAL ==================== */}
        {selectedApp && (
          <SelectedApp
            setSelectedApp={setSelectedApp}
            selectedApp={selectedApp}
            triggerToast={triggerToast}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        )}

        {/* ==================== NEWS ADD / EDIT MODAL ==================== */}
        {/* {newsModalOpen && (
          <NewsDashboard
            news={news}
            setNewsForm={setNewsForm}
            setNewsModalOpen={setNewsModalOpen}
            editingNewsIdx={editingNewsIdx}
            newsForm={newsForm}
            setNews={setNews}
            handleDeleteNews={handleDeleteNews}
            triggerToast={triggerToast}
          />
        )} */}

        {/* ==================== TOAST NOTIFICATION ==================== */}
        {toast.show && (
          <div className="fixed bottom-5 right-5 z-50 transform translate-y-0 opacity-100 transition-all duration-300">
            <div className="bg-slate-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-800">
              <span className={`${toast.color} text-lg`}>{toast.icon}</span>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
