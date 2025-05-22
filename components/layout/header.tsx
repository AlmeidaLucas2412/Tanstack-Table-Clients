import { ThemeToggler } from "../theme-toggler";

export const Header = () => {
  return (
    <header className="w-full shadow-md shadow-foreground/20">
      <div className="flex justify-between items-center p-6">
        <p className="text-2xl font-light">
          Tanstack<span className="font-semibold">Table</span>
        </p>
        <ThemeToggler />
      </div>
    </header>
  );
};
