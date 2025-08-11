import { Link } from "react-router-dom";

type Staff = {
  userName: string;
  role: string;
  email: string;
  lastLogin: string;
};

const staffList: Staff[] = [
  {
    userName: "Mr Johnson",
    role: "Teacher",
    email: "john@mail.com",
    lastLogin: "1 day ago",
  },
  {
    userName: "Mr Johnson",
    role: "Teacher",
    email: "john@mail.com",
    lastLogin: "1 day ago",
  },
];

const StaffMgt = () => {
  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex w-[60%] items-center gap-2 relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-1 rounded-full border border-gray-300 w-full text-sm focus:outline-none"
          />
          <span className="absolute  right-4 text-gray-400 text-xs">🔍</span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/30"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* Add Staff Button */}
      <Link to="/admin/staffmgt/staffReg">
        <div className="flex justify-end mb-4">
          <button className="bg-pink-100 border border-pink-300 px-3 py-1 rounded text-sm hover:bg-pink-200">
            Add New Staff
          </button>
        </div>
      </Link>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Last login</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-4 py-2">{staff.userName}</td>
                <td className="px-4 py-2">{staff.role}</td>
                <td className="px-4 py-2">{staff.email}</td>
                <td className="px-4 py-2">{staff.lastLogin}</td>
                <td className="px-4 py-2">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffMgt;
