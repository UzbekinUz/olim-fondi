const Period = require('../models/periodM');
const StpApplication = require('../models/stpApplyM');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const mongoose = require('mongoose');
const Marking = require('../models/markingM');

const MAX_FILES_PER_MARKING = 10;
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB

// Mezon bo'yicha fayl baholangan bo'lsa u qulflanadi
const isGraded = (submission) => Array.isArray(submission.score) && submission.score.length > 0;
const isFinalStatus = (status) => ['approved', 'rejected'].includes(status);
const removeFromDisk = (dbPath) => {
  if (!dbPath || typeof dbPath !== 'string') return;
  const full = path.join(__dirname, '..', dbPath);
  if (fs.existsSync(full)) {
    try { fs.unlinkSync(full); } catch (e) { }
  }
};
const recalcTotals = (application) => {
  application.files.forEach((file) => {
    file.totalScore = file.score && file.score.length > 0
      ? file.score.reduce((acc, sc) => acc + (sc.mark || 0), 0) / file.score.length
      : 0;
  });
  application.totalScore = application.files.reduce((acc, f) => acc + (f.totalScore || 0), 0);
};
const toArray = (v) => (Array.isArray(v) ? v : v === undefined || v === null ? [] : [v]);
module.exports = {
  // 1. Yangi Period qo'shish
  addpr: async (req, res) => {
    try {
      const { title, startDate, endDate, status } = req.body;

      if (!title || !startDate || !endDate) {
        return res.send({
          ok: false,
          msg: "Title, startDate va endDate maydonlari to'ldirilishi shart!",
        });
      }

      // Agar yangi period statusi 'active' qilib o'rnatilayotgan bo'lsa
      if (status === 'active') {
        const activePeriod = await Period.findOne({ status: 'active' });
        if (activePeriod) {
          return res.send({
            ok: false,
            msg: "Allaqachon faol (active) bo'lgan period mavjud! Avval uni arxivlang.",
          });
        }
      }

      const newPeriod = new Period({
        title,
        startDate,
        endDate,
        status: status || 'draft'
      });

      const savedPeriod = await newPeriod.save();

      return res.send({
        ok: true,
        msg: "Period muvaffaqiyatli yaratildi",
        data: savedPeriod,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.send({
          ok: false,
          msg: "Bir vaqtning o'zida faqat bitta 'active' period bo'lishi mumkin!",
        });
      }
      return res.send({
        ok: false,
        msg: err.message || "Period yaratishda xatolik yuz berdi",
      });
    }
  },
  // 2. Periodni tahrirlash
  editpr: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = { ...req.body };

      if (!id) {
        return res.send({ ok: false, msg: "Period ID ko'rsatilmadi!" });
      }

      // Active statusga o'tkazilayotgan bo'lsa, boshqa active period yo'qligini tekshirish
      if (updateData.status === 'active') {
        const activePeriod = await Period.findOne({ status: 'active', _id: { $ne: id } });
        if (activePeriod) {
          return res.send({
            ok: false,
            msg: "Boshqa faol (active) period mavjud! Avval uni arxivlang.",
          });
        }
      }

      const updatedPeriod = await Period.findByIdAndUpdate(
        id,
        updateData,
        { returnDocument: 'after', runValidators: true }
      );

      if (!updatedPeriod) {
        return res.send({ ok: false, msg: "Period topilmadi!" });
      }

      return res.send({
        ok: true,
        msg: "Period muvaffaqiyatli tahrirlandi",
        data: updatedPeriod,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.send({
          ok: false,
          msg: "Bir vaqtning o'zida faqat bitta 'active' period bo'lishi mumkin!",
        });
      }
      return res.send({
        ok: false,
        msg: err.message || "Periodni tahrirlashda xatolik yuz berdi",
      });
    }
  },

  // 3. Periodni o'chirish
  delpr: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.send({ ok: false, msg: "ID ko'rsatilmadi!" });
      }

      // Arizalari bor davr o'chirilsa, arizalar egasiz qolib ketadi
      const appsCount = await StpApplication.countDocuments({ periodId: id });
      if (appsCount > 0) {
        return res.send({
          ok: false,
          msg: `Bu davrda ${appsCount} ta ariza bor. Avval arizalarni o'chiring yoki davrni arxivlang.`,
        });
      }

      const deletedPeriod = await Period.findByIdAndDelete(id);

      if (!deletedPeriod) {
        return res.send({ ok: false, msg: "Period topilmadi yoki allaqachon o'chirilgan!" });
      }

      return res.send({
        ok: true,
        msg: "Period muvaffaqiyatli o'chirildi",
      });
    } catch (err) {
      return res.send({
        ok: false,
        msg: err.message || "Periodni o'chirishda xatolik yuz berdi",
      });
    }
  },

  // 4. Barcha Periodlarni va ularga biriktirilgan Marking (criteria) larini olish
  getpr: async (req, res) => {
    try {
      const periods = await Period.find()
        .sort({ createdAt: -1 });

      return res.send({
        ok: true,
        data: periods,
      });
    } catch (err) {
      return res.send({
        ok: false,
        msg: err.message || "Periodlarni olishda xatolik yuz berdi",
      });
    }
  },
  getactivepr: async (req, res) => {
    try {
      const periods = await Period.find({ status: "active" })

      return res.send({
        ok: true,
        data: periods,
      });
    } catch (err) {
      return res.send({
        ok: false,
        msg: err.message || "Periodlarni olishda xatolik yuz berdi",
      });
    }
  },

  // Stipendiat faol davr uchun hujjat yuklaydi. Har bir mezonga bir nechta fayl qo'shish mumkin.
  // Baholangan mezonga yoki yakuniy (approved/rejected) arizaga o'zgartirish kiritib bo'lmaydi.
  submitApp: async (req, res) => {
    try {
      const studentId = String(req.user.stpId);
      const files = req.files;

      // 1. Faqat faol davrga ariza topshiriladi (periodId clientdan olinmaydi)
      const activePeriod = await Period.findOne({ status: 'active' });
      if (!activePeriod) {
        return res.send({ ok: false, msg: "Hozirda faol ariza topshirish davri mavjud emas!" });
      }
      const periodId = String(activePeriod._id);

      if (!files || !files.files) {
        return res.send({ ok: false, msg: "Kamida bitta fayl yuklanishi kerak!" });
      }

      const markingList = toArray(req.body.markingIds).map(String);
      const fileList = toArray(files.files);

      if (fileList.length !== markingList.length) {
        return res.send({
          ok: false,
          msg: "Har bir faylga mos markingId kelmadi (fayllar va mezonlar soni teng emas)!"
        });
      }

      // 2. Mezonlar haqiqiy ekanligini tekshirish
      const uniqueMarkings = [...new Set(markingList)];
      if (!uniqueMarkings.every((id) => mongoose.Types.ObjectId.isValid(id))) {
        return res.send({ ok: false, msg: "Mezon identifikatori noto'g'ri!" });
      }
      const existingMarkings = await Marking.countDocuments({ _id: { $in: uniqueMarkings } });
      if (existingMarkings !== uniqueMarkings.length) {
        return res.send({ ok: false, msg: "Ko'rsatilgan mezonlardan biri topilmadi!" });
      }

      // 3. Fayllarni tekshirish (faqat PDF, max 15MB)
      for (const f of fileList) {
        if (path.extname(f.name).toLowerCase() !== '.pdf') {
          return res.send({
            ok: false,
            msg: `Faqat PDF formatdagi fayllar qabul qilinadi! Qabul qilinmadi: ${f.name}`
          });
        }
        if (f.size > MAX_FILE_SIZE) {
          return res.send({
            ok: false,
            msg: `Fayl hajmi 15MB dan oshmasligi kerak! Fayl: ${f.name}`
          });
        }
      }

      // 4. Mavjud arizani topish yoki yangi yaratish
      let application = await StpApplication.findOne({ periodId, studentId });
      if (application && isFinalStatus(application.status)) {
        return res.send({
          ok: false,
          msg: "Arizangiz yakuniy ko'rib chiqilgan, hujjatlarni o'zgartirib bo'lmaydi!"
        });
      }
      if (!application) {
        application = new StpApplication({ periodId, studentId, status: 'draft', files: [] });
      }

      // 5. Baholangan mezonlar va fayllar soni limitini tekshirish (diskka yozishdan oldin)
      const incomingCount = {};
      markingList.forEach((m) => { incomingCount[m] = (incomingCount[m] || 0) + 1; });
      for (const mId of uniqueMarkings) {
        const submission = application.files.find((item) => String(item.markingId) === mId);
        if (submission && isGraded(submission)) {
          return res.send({
            ok: false,
            msg: "Baholangan mezon bo'yicha hujjatni o'zgartirib bo'lmaydi!"
          });
        }
        const already = submission ? toArray(submission.file).length : 0;
        if (already + incomingCount[mId] > MAX_FILES_PER_MARKING) {
          return res.send({
            ok: false,
            msg: `Bitta mezon uchun ko'pi bilan ${MAX_FILES_PER_MARKING} ta fayl yuklash mumkin!`
          });
        }
      }

      // 6. Fayllarni diskka yozib, mezonga biriktirish (mavjudlariga qo'shiladi)
      const folderRelativePath = `/public/uploads/stp/${periodId}_${studentId}`;
      const fullFolderPath = path.join(__dirname, '..', folderRelativePath);
      if (!fs.existsSync(fullFolderPath)) {
        fs.mkdirSync(fullFolderPath, { recursive: true });
      }

      for (let i = 0; i < fileList.length; i++) {
        const currentFile = fileList[i];
        const currentMarkingId = markingList[i];
        const uniqueFileName = `${md5(currentFile.name + Date.now() + i)}.pdf`;
        const fileDbPath = `${folderRelativePath}/${uniqueFileName}`;
        await currentFile.mv(path.join(__dirname, '..', fileDbPath));

        const submission = application.files.find((item) => String(item.markingId) === currentMarkingId);
        if (submission) {
          submission.file = [...toArray(submission.file), fileDbPath];
          submission.uploadedAt = new Date();
        } else {
          application.files.push({
            markingId: currentMarkingId,
            file: [fileDbPath],
            uploadedAt: new Date()
          });
        }
      }

      // 7. Editor qayta yuklashni so'ragan mezonlar bajarilgan bo'lsa, so'rovdan chiqaramiz
      if (application.revision && application.revision.markingIds.length > 0) {
        application.revision.markingIds = application.revision.markingIds.filter(
          (id) => !uniqueMarkings.includes(String(id))
        );
        if (application.revision.markingIds.length === 0) {
          application.revision.note = '';
          application.revision.requestedAt = undefined;
        }
      }

      application.status = 'submitted';
      await application.save();

      return res.send({
        ok: true,
        msg: "Hujjatlaringiz muvaffaqiyatli saqlandi!",
        data: application
      });
    } catch (err) {
      console.error("submitApp error:", err);
      return res.send({
        ok: false,
        msg: err.message || "Fayllarni saqlashda xatolik yuz berdi!"
      });
    }
  },

  // Stipendiat baholanmagan mezondan bitta faylni o'chiradi
  removeFile: async (req, res) => {
    try {
      const studentId = String(req.user.stpId);
      const { markingId, file } = req.body;

      const activePeriod = await Period.findOne({ status: 'active' });
      if (!activePeriod) {
        return res.send({ ok: false, msg: "Hozirda faol davr mavjud emas!" });
      }

      const application = await StpApplication.findOne({ periodId: activePeriod._id, studentId });
      if (!application) {
        return res.send({ ok: false, msg: "Ariza topilmadi!" });
      }
      if (isFinalStatus(application.status)) {
        return res.send({ ok: false, msg: "Yakuniy ko'rib chiqilgan arizani o'zgartirib bo'lmaydi!" });
      }

      const submission = application.files.find((item) => String(item.markingId) === String(markingId));
      if (!submission) {
        return res.send({ ok: false, msg: "Mezon bo'yicha hujjat topilmadi!" });
      }
      if (isGraded(submission)) {
        return res.send({ ok: false, msg: "Baholangan hujjatni o'chirib bo'lmaydi!" });
      }

      const current = toArray(submission.file);
      if (!current.includes(file)) {
        return res.send({ ok: false, msg: "Fayl topilmadi!" });
      }

      removeFromDisk(file);
      const left = current.filter((f) => f !== file);
      if (left.length === 0) {
        application.files.pull(submission._id);
      } else {
        submission.file = left;
      }
      if (application.files.length === 0) {
        application.status = 'draft';
      }
      await application.save();

      return res.send({ ok: true, msg: "Fayl o'chirildi!", data: application });
    } catch (err) {
      console.error("removeFile error:", err);
      return res.send({ ok: false, msg: err.message || "Faylni o'chirishda xatolik!" });
    }
  },

  // Faqat Editor: stipendiat hujjatlarini (hammasini yoki bitta mezon bo'yicha) o'chirib, qayta yuklashni so'raydi
  resetApplication: async (req, res) => {
    try {
      if (req.user?.role !== 'Editor') {
        return res.send({ ok: false, msg: "Bu amalni faqat Editor bajara oladi!" });
      }

      const { applicationId } = req.params;
      const { markingId, note } = req.body;

      const application = await StpApplication.findById(applicationId);
      if (!application) {
        return res.send({ ok: false, msg: "Ariza topilmadi!" });
      }

      const targets = markingId
        ? application.files.filter((f) => String(f.markingId) === String(markingId))
        : [...application.files];

      if (targets.length === 0) {
        return res.send({ ok: false, msg: "O'chiriladigan hujjat topilmadi!" });
      }

      const resetIds = [];
      targets.forEach((submission) => {
        toArray(submission.file).forEach(removeFromDisk);
        resetIds.push(String(submission.markingId));
        application.files.pull(submission._id);
      });

      const prev = (application.revision?.markingIds || []).map(String);
      application.revision = {
        note: (note || '').trim() || "Hujjatlaringizni qaytadan yuklang.",
        markingIds: [...new Set([...prev, ...resetIds])],
        requestedAt: new Date(),
      };

      recalcTotals(application);
      application.status = 'draft';
      await application.save();

      const updated = await StpApplication.findById(applicationId)
        .populate('files.markingId')
        .populate('periodId');

      return res.send({
        ok: true,
        msg: "Hujjatlar o'chirildi, stipendiatdan qayta yuklash so'raldi!",
        data: updated
      });
    } catch (err) {
      console.error("resetApplication error:", err);
      return res.send({ ok: false, msg: err.message || "Xatolik yuz berdi!" });
    }
  },

  checkActiveApplication: async (req, res) => {
    try {
      const { stpId } = req.user;
      const studentId = stpId
      if (!studentId || studentId === "undefined") {
        return res.send({
          ok: false,
          msg: "studentId yuborilmadi yoki noto'g'ri!"
        });
      }

      // 1. Ayni vaqtda faol (active) bo'lgan davrni bazadan qidiramiz
      const activePeriod = await Period.findOne({ status: 'active' });

      if (!activePeriod) {
        return res.send({
          ok: false,
          hasActivePeriod: false,
          hasSubmitted: false,
          msg: "Hozirda faol ariza topshirish davri mavjud emas."
        });
      }

      // 2. Ushbu faol davr uchun talabaning arizasi bor-yo'qligini tekshiramiz
      const application = await StpApplication.findOne({
        periodId: activePeriod._id,
        studentId: studentId
      })
        .populate('files.markingId')
        .populate('periodId');

      if (!application) {
        return res.send({
          ok: true,
          hasActivePeriod: true,
          hasSubmitted: false,
          activePeriod: activePeriod, // Frontend uchun faol davr ma'lumotlari
          msg: "Faol davr mavjud, lekin ariza topshirilmagan."
        });
      }

      // 3. Ariza topildi
      return res.send({
        ok: true,
        hasActivePeriod: true,
        hasSubmitted: true,
        data: application,
        msg: "Mavjud ariza topildi!"
      });

    } catch (err) {
      console.error("checkActiveApplication error:", err);
      return res.send({
        ok: false,
        msg: err.message || "Serverda xatolik yuz berdi!"
      });
    }
  },
  getApplicationsByPeriod: async (req, res) => {
    try {
      const { periodId } = req.params;

      const applications = await StpApplication.find({ periodId })
        .populate('files.markingId')
        .populate('periodId')
        .sort({ createdAt: -1 });

      return res.send({
        ok: true,
        count: applications.length,
        data: applications
      });
    } catch (err) {
      console.error("getApplicationsByPeriod error:", err);
      return res.send({ ok: false, msg: err.message || "Serverda xatolik!" });
    }
  },
  // 2. Barcha arizalar ro'yxatini olish (Filtrlar bilan: status, periodId)
  getAllApplicationsForAdmin: async (req, res) => {
    try {
      const { periodId, status } = req.body;
      let filter = {};

      if (periodId) filter.periodId = periodId;
      if (status) filter.status = status;

      const applications = await StpApplication.find(filter)
        .populate('files.markingId')
        .populate('periodId')
        .sort({ createdAt: -1 });

      return res.send({
        ok: true,
        count: applications.length,
        data: applications
      });
    } catch (err) {
      console.error("getAllApplicationsForAdmin error:", err);
      return res.send({ ok: false, msg: err.message || "Serverda xatolik!" });
    }
  },
  // 3. ID bo'yicha bitta arizani to'liq ko'rish
  getApplicationById: async (req, res) => {
    try {
      const { id } = req.params;

      const application = await StpApplication.findById(id)
        .populate('files.markingId')
        .populate('periodId');

      if (!application) {
        return res.send({ ok: false, msg: "Ariza topilmadi!" });
      }

      return res.send({ ok: true, data: application });
    } catch (err) {
      console.error("getApplicationById error:", err);
      return res.send({ ok: false, msg: err.message });
    }
  },

  // 4. Arizaga ball qo'yish va admin izohini saqlash (Grade Application)
  gradeApplication: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const expertId = req.user?.adminId;
      const { grades, status } = req.body;
      const application = await StpApplication.findById(applicationId);

      if (!application) {
        return res.send({ ok: false, msg: "Ariza topilmadi!" });
      }

      // whomark String sifatida saqlanadi, expertId esa ObjectId — solishtirish uchun String ga keltiramiz
      const currentExpert = String(expertId);

      // 1. Fayllar bo'yicha ball va izohlarni scoreSchema strukturasiga mos saqlash
      if (Array.isArray(grades) && Array.isArray(application.files)) {
        grades.forEach((g) => {
          // Frontend'dan fileId sifatida f._id yoki f.markingId kelishiga moslashuvchan qidiruv
          const fileIndex = application.files.findIndex((f) => {
            const isFileIdMatch = f?._id.toString() === g.fileId;

            return isFileIdMatch;
          });

          if (fileIndex !== -1) {
            const currentFile = application.files[fileIndex];

            // score massivini xavfsizlantirish
            if (currentFile.score === undefined || !Array.isArray(currentFile.score)) {
              currentFile.score = [];
            }

            // Ekspert avval baholagan-baholamaganini aniqlash
            const existingScoreIndex = currentFile.score.findIndex(
              (s) => s.whomark === currentExpert
            );

            if (existingScoreIndex !== -1) {
              // 1-HOLAT: Mavjud ekspertning mark va adminComment ma'lumotlarini yangilaymiz
              if (g.score !== undefined && g.score !== null) {
                currentFile.score[existingScoreIndex].mark = Number(g.score);
              }
              if (g.adminComment !== undefined) {
                currentFile.score[existingScoreIndex].adminComment = g.adminComment;
              }
            } else {
              // 2-HOLAT: Yangi scoreSchema obyekti sifatida push qilamiz
              currentFile.score.push({
                mark: g.score !== undefined && g.score !== null ? Number(g.score) : 0,
                whomark: currentExpert,
                adminComment: g.adminComment || "",
              });
            }
          }
        });
      }

      // 2. Statusni yangilash
      // Editorning yakuniy qarori (approved/rejected) baholashda o'chib ketmasin
      const isFinal = ["approved", "rejected"].includes(application.status);
      application.status = status || (isFinal ? application.status : "reviewed");
      application.files.forEach((file) => {
        // Har bir fayl uchun totalScore hisoblash
        const totalFileScore =
          file.score && file.score.length > 0
            ? file.score.reduce((acc, s) => acc + (s.mark || 0), 0) / file.score.length
            : 0;
        file.totalScore = totalFileScore;
      });

      // Ariza bo'yicha umumiy totalScore hisoblash
      const totalApplicationScore = application.files.reduce((acc, f) => acc + (f.totalScore || 0), 0);
      application.totalScore = totalApplicationScore;
      // 3. O'zgarishlarni bazaga saqlash
      await application.save();
      // Population va javob
      const updatedApp = await StpApplication.findById(applicationId)
        .populate("files.markingId")
        .populate("periodId");

      return res.send({
        ok: true,
        msg: "Ariza muvaffaqiyatli baholandi!",
        data: updatedApp,
      });
    } catch (err) {
      console.error("gradeApplication error:", err);
      return res.send({
        ok: false,
        msg: err.message || "Baholashda xatolik yuz berdi!",
      });
    }
  },

  // 5. Ariza statusini o'zgartirish (approved, rejected, reviewed, submitted)
  updateApplicationStatus: async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;

      if (!['submitted', 'reviewed', 'approved', 'rejected'].includes(status)) {
        return res.send({ ok: false, msg: "Noto'g'ri status kiritildi!" });
      }

      const application = await StpApplication.findByIdAndUpdate(
        applicationId,
        { status },
        { returnDocument: 'after' }
      );

      if (!application) {
        return res.send({ ok: false, msg: "Ariza topilmadi!" });
      }

      return res.send({
        ok: true,
        msg: "Ariza holati yangilandi!",
        data: application
      });

    } catch (err) {
      console.error("updateApplicationStatus error:", err);
      return res.send({ ok: false, msg: err.message });
    }
  },

  // 6. Arizani va unga tegishli fayllar papkasini o'chirish
  deleteApplication: async (req, res) => {
    try {
      const application = await StpApplication.findByIdAndDelete(req.params.id);

      if (!application) {
        return res.send({ ok: false, msg: "Ariza topilmadi!" });
      }

      const folderPath = path.join(__dirname, '..', `/public/uploads/stp/${application.periodId}_${application.studentId}`);
      if (fs.existsSync(folderPath)) {
        try { fs.rmSync(folderPath, { recursive: true, force: true }); } catch (e) { }
      }

      return res.send({ ok: true, msg: "Ariza va fayllari o'chirildi!" });
    } catch (err) {
      console.error("deleteApplication error:", err);
      return res.send({ ok: false, msg: err.message });
    }
  }
};