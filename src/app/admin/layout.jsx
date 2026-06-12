import AdminNavbar from "./AdminNavbar";
import {AuthProvider} from "@/context/AuthContext";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen">
      <AuthProvider>
        <AdminNavbar />
        <main>{children}</main>
      </AuthProvider>
    </div>
  );
}