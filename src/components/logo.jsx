function Logo({ className = "w-28", isLight = true }) {
  return (
    <img
      src={isLight ? "/image/logo/logo-light.png" : "/image/logo/logo.png"}
      alt="smart-kart"
      className={className}
    />
  );
}
export default Logo;
