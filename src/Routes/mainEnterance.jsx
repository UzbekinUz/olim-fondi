import ApplicationCard from "../components/application";
import ApplicationForm from "../components/applyTest";
import Auth from "../components/auth";

function MainEnterence({admin,app,applyCheck, authCheck,setAuthCheck,L,bor,setBor}) {
  return ( 
        <div id="apply" className="py-10 bg-white">
        {admin.auth ? (
          // Agar tizimga kirgan bo'lsa, ariza formasini ko'rsatamiz va unga usernameId ni dinamik beramiz
          bor==="false" || bor==="resend" ? (
            <ApplicationForm setBor={setBor} applyCheck={applyCheck} usernameId={admin.usernameId} bor={bor} />
          ) : (
            <ApplicationCard application={app} setBor={setBor} />
          )
        ) : (
          // Agar tizimga kirmagan bo'lsa, avval login/register qilishini so'raymiz
          <div className="flex flex-col items-center justify-center">
            <Auth L={L} refresh={authCheck} setRefresh={setAuthCheck} />
          </div>
        )}
      </div>
     );
}

export default MainEnterence;