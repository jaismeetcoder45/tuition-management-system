function Navbar() {

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
  
  
};

  return (
    <div className="flex justify-between items-center">
  <h1 className="text-xl font-bold">
    Dashboard
  </h1>

  <div className="flex gap-3">
    <button
      onClick={toggleDarkMode}
      
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      🌙
    </button>

    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</div>
  )
}

export default Navbar