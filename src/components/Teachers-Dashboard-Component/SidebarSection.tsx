import { useState } from 'react'
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb'
import { MdOutlineDashboard } from 'react-icons/md'
import schoollogo from '../../assets/images/schoollogo.png'
import { BiEdit, BiSolidSchool } from 'react-icons/bi'
import { IoSettingsOutline } from 'react-icons/io5'
// import { HiOutlineChartBar } from "react-icons/hi";
import { Link } from 'react-router-dom'

type MenuItem = {
  name: string
  link: string
  icon: React.ReactNode // Preferred approach
}

const menu: MenuItem[] = [
  {
    name: 'Dashboard',
    link: '/Tadmin/Tdashboard-layout',
    icon: <MdOutlineDashboard />,
  },
  { name: 'Result Entry', link: '/Tadmin/result-entry', icon: <BiEdit /> },
  { name: 'Class Subject', link: '/Tadmin/class-subject', icon: <BiSolidSchool /> },
  { name: 'Results', link: '/Tadmin/results', icon: <BiEdit /> },
  { name: 'Settings', link: '/', icon: <IoSettingsOutline /> },
]

const SidebarSection = () => {
  const [open, setOpen] = useState(true)

  return (
    <div className="min-h-full">
      {/* Sidebar */}
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } border h-full duration-300 transition-all relative px-4 py-6`}
      >
        {/* Toggle Button */}
        <div
          className={`absolute top-6 -right-4 w-8 h-8 bg-zinc-50 border-2 border-zinc-50 rounded-full flex items-center justify-center cursor-pointer ${
            !open && 'rotate-180'
          } transition-transform duration-300`}
          onClick={() => setOpen(!open)}
        >
          {open ? <TbLayoutSidebarLeftExpand /> : <TbLayoutSidebarLeftCollapse />}
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={schoollogo}
            alt="school logo"
            className={`transition-all duration-300 object-contain ${open ? 'w-55' : 'w-10'}`}
          />
        </div>

        {/* Menu Items */}

        <nav className="flex flex-col gap-4">
          {menu.map((item, index) => (
            <Link to={item.link}>
              <div
                key={index}
                className="flex items-center gap-4 cursor-pointer hover:bg-purple-600 hover:text-white p-2 rounded-md transition-all"
              >
                <div className="text-2xl">{item.icon}</div>
                {open && <span className="text-base font-medium">{item.name}</span>}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default SidebarSection
