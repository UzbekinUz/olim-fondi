import { useState, useEffect } from "react";
import "./App.css";
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
  const [selectedApp, setSelectedApp] = useState(null); 
  const [refresh, setRefresh] = useState(false); // null means "Create" mode
  const [appData, setAppData] = useState([]);

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

  const [admin, setAdmin] = useState(false);
  const [adminInfo, setAdminInfo] = useState({});
  const [ref, setRef] = useState(false);
  const handleRef = () => {
    setRef(!ref);
  };
  useEffect(() => {
    axios
      .get(`${API_LINK}/admin/check`, {
        headers: {
          "x-admin-token": `${localStorage.getItem("access_admin_token")}`,
        },
      })
      .then((res) => {
        const { ok, adminInfo } = res.data;
        if (ok) {
          setAdmin(true);
          setAdminInfo(adminInfo);
        } else {
          setAdmin(false);
        }
      });
  }, [ref]);

  if (!admin) {
    return (
      <div className="h-screen fixed top-0 z-500  w-full overflow-hidden flex flex-col bg-slate-50 font-sans">
        <Login
          handleRef={handleRef}
          setAdmin={setAdmin}
          admin={admin}
          adminInfo={adminInfo}
        />
      </div>
    );
  } else {
    return (
      <div className="h-screen fixed top-0 z-500  w-full overflow-hidden flex flex-col bg-slate-50 font-sans">
        {/* Top Navbar Mobile */}
        <Header setSidebarOpen={setSidebarOpen} />

        <SideBar
          adminInfo={adminInfo}
          news={news}
          apps={appData}
          currentDateStr={currentDateStr}
          setSelectedApp={setSelectedApp}
          setAdmin={setAdmin}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setRefresh={setRefresh}
          refresh={refresh}
          handleRef={handleRef}
        />
        {selectedApp && (
          <SelectedApp
            setSelectedApp={setSelectedApp}
            selectedApp={selectedApp}
            triggerToast={triggerToast}
            setRefresh={setRefresh}
            refresh={refresh}
            adminInfo={adminInfo}
          />
        )}
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
