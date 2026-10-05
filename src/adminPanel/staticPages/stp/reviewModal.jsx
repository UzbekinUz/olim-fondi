import { useState } from 'react';
import { X, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { gradeFileSubmission } from '../../helper/api';

export default function ReviewModal({ application, onClose, onRefresh }) {
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  const handleGrade = async (fileSubId) => {
    try {
      setLoadingId(fileSubId);
      const scoreVal = scores[fileSubId];
      const commentVal = comments[fileSubId];

      if (scoreVal === undefined || scoreVal === '') {
        alert("Iltimos, ball kiriting!");
        return;
      }

      await gradeFileSubmission(application._id, fileSubId, {
        score: Number(scoreVal),
        adminComment: commentVal || ''
      });

      alert("Fayl muvaffaqiyatli baholandi!");
      onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || "Baholashda xatolik yuz berdi");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {application.studentId?.fullName || "Arizachi"}
            </h2>
            <p className="text-sm text-gray-500">
              {application.studentId?.email} | {application.studentId?.phone}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl">
            <div>
              <span className="text-sm text-blue-600 font-medium">Umumiy To'plangan Ball:</span>
              <h3 className="text-2xl font-bold text-blue-900">{application.totalScore} Ball</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              application.status === 'reviewed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {application.status.toUpperCase()}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-700">Topshirilgan Hujjatlar va Mezonlar</h3>

          {/* Files List */}
          <div className="space-y-4">
            {application.files?.map((file) => (
              <div key={file._id} className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {file.markingId?.title || "Me'zon nomi yo'q"}
                    </h4>
                    <p className="text-xs text-gray-500">Maksimal ball: {file.markingId?.maxScore || 'N/A'}</p>
                  </div>
                  <a
                    href={`http://localhost:5000${file.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-indigo-600 font-medium hover:underline"
                  >
                    <FileText className="w-4 h-4" /> Faylni O'chish / Ko'rish <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Grade Input Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-gray-200">
                  <input
                    type="number"
                    placeholder={`Ball (Joriy: ${file.score ?? 'Baholanmagan'})`}
                    defaultValue={file.score ?? ''}
                    onChange={(e) => setScores({ ...scores, [file._id]: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Izoh (ixtiyoriy)"
                    defaultValue={file.adminComment || ''}
                    onChange={(e) => setComments({ ...comments, [file._id]: e.target.value })}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleGrade(file._id)}
                    disabled={loadingId === file._id}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-2 text-sm font-medium transition flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {loadingId === file._id ? "Saqlanmoqda..." : "Saqlash"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}