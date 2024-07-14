import react from 'react';

//funcao para o componente da navbar
export default function Navbar() {
  return (
    <>
      <nav className="navbar justify-between bg-base-300">
        <a className="btn btn-ghost text-lg text-red-800">
          {/* <img alt="Logo" src="/logo.svg" className="w-4" /> */}
          Blackfyre Legion
        </a>

        <div className="dropdown dropdown-end sm:hidden">
          <button className="btn btn-ghost">
            <i className="fa-solid fa-bars text-lg"></i>
          </button>

          <ul
            tabIndex="0"
            className="menu dropdown-content z-[1] w-56 gap-2 rounded-box bg-base-200 p-6 shadow"
          >
            <li>
              <a>Sobre</a>
            </li>
            <li>
              <a>Projetos</a>
            </li>
            <a className="btn btn-primary btn-sm">Log in</a>
          </ul>
        </div>

        <ul className="menu hidden gap-2 sm:menu-horizontal">
          <li>
            <a>Sobre</a>
          </li>
          <li>
            <a>Projetos</a>
          </li>
          <a className="btn btn-ghost btn-sm bg-red-800">Login</a>
        </ul>
      </nav>
    </>
  );
}
