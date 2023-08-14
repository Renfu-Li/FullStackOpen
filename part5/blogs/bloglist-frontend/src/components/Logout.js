const Logout = ({ user, setUser, setMessage }) => {
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setMessage("Logged out successfully");
  };

  return (
    <div>
      <span>{user.name} logged in</span>
      <button id="logoutButton" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
