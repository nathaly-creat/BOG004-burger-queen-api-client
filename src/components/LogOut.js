export const LogOut = () => {
  return (
    <div>
      <button
        onClick={() => {
         sessionStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Log Out
      </button>
    </div>
  );
};
