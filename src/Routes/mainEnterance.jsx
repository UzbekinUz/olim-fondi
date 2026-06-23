import ApplicationCard from "../components/application";
import ApplicationForm from "../components/applyTest";
import Auth from "../components/auth";

function MainEnterence({admin,app,applyCheck, authCheck,setAuthCheck,L}) {
    return ( 
        <div id="apply" className="py-10 bg-white">
        {admin.auth ? (
          
          // Agar tizimga kirgan bo'lsa, ariza formasini ko'rsatamiz va unga usernameId ni dinamik beramiz
          !app.bor ? (
            <ApplicationForm applyCheck={applyCheck} usernameId={admin.usernameId} />
          ) : (
            <ApplicationCard application={app.data} />
          )
        ) : (
          // Agar tizimga kirmagan bo'lsa, avval login/register qilishini so'raymiz
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-rose-500 font-semibold mb-4">
              Ariza topshirishdan oldin tizimga kirishingiz yoki ro'yxatdan
              o'tishingiz shart!
            </p>
            <Auth L={L} refresh={authCheck} setRefresh={setAuthCheck} />
          </div>
        )}
      </div>
     );
}

export default MainEnterence;