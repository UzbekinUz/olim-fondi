import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend serveringiz manzili
});

// Request'ga Token biriktirish
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================================
// PERIOD API
// ==========================================
export const fetchPeriods = () => API.get('/getAllPeriods');
export const fetchPeriodById = (id) => API.get(`/getPeriodById/${id}`);
export const createPeriod = (data) => API.post('/createPeriod', data);
export const updatePeriod = (id, data) => API.put(`/updatePeriod/${id}`, data);
export const deletePeriod = (id) => API.delete(`/deletePeriod/${id}`);
// ==========================================
// APPLICATION API (Backend routerga moslangan)
// ==========================================

// 1. Fayl yuklash yoki arizani yangilash
export const addOrUpdateApplication = (formData) => 
  API.post('/addOrUpdateApplication', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// 2. Arizani yakuniy topshirish
export const submitFinalApplication = (applicationId) => 
  API.post(`/submitFinalApplication/${applicationId}`);

// 3. Admin: Faylga ball va izoh berish
export const gradeFileSubmission = (appId, fileSubId, data) => 
  API.put(`/gradeSubmissionFile/${appId}/file/${fileSubId}`, data);

// 4. Barcha arizalarni olish (Filterlar bilan)
export const fetchApplications = (params) => 
  API.get('/getAllApplications', { params });

// 5. Bitta arizani ID bo'yicha olish
export const fetchApplicationById = (id) => 
  API.get(`/getOneApplication/${id}`);

// 6. Arizadan bitta faylni o'chirish
export const deleteSingleFile = (appId, fileSubId) => 
  API.delete(`/deleteSingleFile/${appId}/file/${fileSubId}`);

// 7. Arizani va uning barcha fayllarini o'chirish
export const deleteApplication = (id) => 
  API.delete(`/deleteApplication/${id}`);