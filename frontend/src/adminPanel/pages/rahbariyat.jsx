/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { API_LINK, SITE_LINK } from "../cfg";

// Backend URL manzillari
const API_BASE_URL = `${API_LINK}/webdata`;
const SERVER_URL = SITE_LINK;

const RahbariyatAdmin = () => {
  // State'lar
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");

  // Form State'lari
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  // 1. Ma'lumotlarni yuklash (getAll)
  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const url = filterCategory
        ? `${API_BASE_URL}/getall?category=${filterCategory}`
        : API_BASE_URL + "/getall";
      const response = await axios.get(url);
      if (response.data.ok) {
        setLeaders(response.data.data);
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Yuklashda xatolik:", error);
      alert("Ma'lumotlarni yuklashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeaders();
  }, [filterCategory]);

  // Formani tozalash
  const resetForm = () => {
    setId("");
    setName("");
    setCategory("");
    setPosition("");
    setPhoto(null);
    setIsEditing(false);
    const fileInput = document.getElementById("photo-input");
    if (fileInput) fileInput.value = "";
  };

  // 2 & 3. Qo'shish va Tahrirlash (addPeople / changePeople)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("position", position);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      if (isEditing) {
        formData.append("id", id);
        const response = await axios.put(`${API_BASE_URL}/edit`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.ok) {
          alert(response.data.msg);
          resetForm();
          fetchLeaders();
        } else {
          alert(response.data.msg);
        }
      } else {
        if (!photo) {
          alert("Iltimos, rasm yuklang!");
          return;
        }

        const response = await axios.post(`${API_BASE_URL}/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.ok) {
          alert(response.data.msg);
          resetForm();
          fetchLeaders();
        } else {
          alert(response.data.msg);
        }
      }
    } catch (error) {
      console.error("Saqlashda xatolik:", error);
      alert("Amaliyot bajarilmadi!");
    }
  };

  // Tahrirlash rejimiga o'tish
  const handleEditClick = (leader) => {
    setIsEditing(true);
    setId(leader._id);
    setName(leader.name);
    setCategory(leader.category);
    setPosition(leader.position);
  };

  // 4. O'chirish (deletePeople)
  const handleDelete = async (leaderId) => {
    if (window.confirm("Haqiqatdan ham ushbu a'zoni o'chirmoqchimisiz?")) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/delete`, {
          data: { id: leaderId },
        });

        if (response.data.ok) {
          alert(response.data.msg);
          fetchLeaders();
        } else {
          alert(response.data.msg);
        }
      } catch (error) {
        console.error("O'chirishda xatolik:", error);
        alert("O'chirish jarayonida xatolik yuz berdi!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
          Rahbariyat Admin Paneli
        </h2>

        {/* --- FORM BO'LIMI --- */}
        <div className="bg-gray-100 p-5 rounded-lg mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {isEditing
              ? "A'zo Ma'lumotlarini Tahrirlash"
              : "Yangi Rahbariyat A'zosi Qo'shish"}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Ism, Familiya
              </label>
              <input
                type="text"
                placeholder="Masalan: Abdullayev Toshmat"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isEditing}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required={!isEditing}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800"
              >
                <option value="">Tanlang...</option>
                <option value="Rahbariyat">Rahbariyat</option>
                <option value="Ekspertlar">Ekspertlar</option>
                <option value="Kuratorlar">Kuratorlar</option>
                <option value="Volontyorlar">Volontyorlar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Lavozimi
              </label>
              <input
                type="text"
                placeholder="Masalan: Yoshlar masalalari bo'yicha prorektor"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required={!isEditing}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Rasm yuklash
              </label>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required={!isEditing}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-md text-white font-medium shadow-sm transition duration-200 cursor-pointer ${
                  isEditing
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isEditing ? "Yangilash" : "Saqlash"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium shadow-sm transition duration-200 cursor-pointer"
                >
                  Bekor qilish
                </button>
              )}
            </div>
          </form>
        </div>

        {/* --- JADVAL VA FILTR BO'LIMI --- */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-gray-800">Mavjud Ro'yxat</h3>

          {/* Kategoriya bo'yicha filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 whitespace-nowrap">
              Kategoriya bo'yicha filter:
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm text-gray-700"
            >
              <option value="">Hammasi</option>
              <option value="Rahbariyat">Rahbariyat</option>
              <option value="Ekspertlar">Ekspertlar</option>
              <option value="Kuratorlar">Kuratorlar</option>
              <option value="Volontyorlar">Volontyorlar</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            Ma'lumotlar yuklanmoqda...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Rasm
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">Ism</th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Kategoriya
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900">
                    Lavozim
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-900 text-right">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                {leaders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      Hozircha hech qanday ma'lumot mavjud emas.
                    </td>
                  </tr>
                ) : (
                  leaders.map((leader) => (
                    <tr
                      key={leader._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={`${SERVER_URL}${leader.photo}`}
                          alt={leader.name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/150";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {leader.name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 uppercase">
                          {leader.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {leader.position}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(leader)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md font-medium transition cursor-pointer"
                          >
                            Tahrirlash
                          </button>
                          <button
                            onClick={() => handleDelete(leader._id)}
                            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-md font-medium transition cursor-pointer"
                          >
                            O'chirish
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RahbariyatAdmin;
