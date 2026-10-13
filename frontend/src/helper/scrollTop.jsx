import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Agar linkda biron bir seksiyaga ID bo'lsa (#mission kabi), tepaga chiqmaydi, o'sha seksiyaga o'tadi
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}