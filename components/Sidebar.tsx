import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#C6D9CB] h-screen flex flex-col p-4">
      {/* User Profile */}
      <div className="flex items-center mb-6">
        <div className="relative mr-4">
          <img
            src="/icons/profile.png"
            alt="User Profile"
            className="w-12 h-12 rounded-full"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border border-[#C6D9CB] rounded-full"></span>
        </div>
        <div>
          <p className="font-bold text-lg">Full User Name</p>
          <p className="text-gray-600 text-sm">@username</p>
        </div>
      </div>
      <hr className="border-gray-400 mb-4" />

      {/* Navigation Sections */}
      <div className="flex flex-col space-y-6 flex-grow">
        {/* Discover Section */}
        <div>
          <p className="text-gray-500 text-sm uppercase mb-2">Discover</p>
          <ul className="space-y-2">
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/lawyericon.png" alt="Lawyers" className="w-5 h-5 mr-3" />
              <span>Lawyers</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/office.png" alt="Offices" className="w-5 h-5 mr-3" />
              <span>Offices</span>
            </li>
          </ul>
        </div>

        {/* Manage Section */}
        <div>
          <p className="text-gray-500 text-sm uppercase mb-2">Manage</p>
          <ul className="space-y-2">
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/notifications.png" alt="Notifications" className="w-5 h-5 mr-3" />
              <span>My Notifications</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/booking.png" alt="Bookings" className="w-5 h-5 mr-3" />
              <span>My Bookings</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/case.png" alt="Cases" className="w-5 h-5 mr-3" />
              <span>My Cases</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/chat.png" alt="Chat" className="w-5 h-5 mr-3" />
              <span>My Chat</span>
            </li>
          </ul>
        </div>

        {/* Control Section */}
        <div>
          <p className="text-gray-500 text-sm uppercase mb-2">Control</p>
          <ul className="space-y-2">
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/dashboard.png" alt="Dashboard" className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/settings.png" alt="Settings" className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </li>
          </ul>
        </div>

        {/* More Section */}
        <div className="mt-auto">
          <p className="text-gray-500 text-sm uppercase mb-2">More</p>
          <ul className="space-y-2">
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/docs.png" alt="Docs" className="w-5 h-5 mr-3" />
              <span>Docs</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/FAQ.png" alt="FAQ" className="w-5 h-5 mr-3" />
              <span>FAQ</span>
            </li>
            <li className="flex items-center p-2 rounded hover:bg-blue-200 hover:text-blue-600">
              <img src="/icons/bookmark.png" alt="bookmark" className="w-5 h-5 mr-3" />
              <span>bookmarks</span>
            </li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-400 my-4" />

      {/* Sign Out */}
      <div className="flex items-center p-2 rounded cursor-pointer hover:bg-blue-200 hover:text-blue-600">
        <img src="/icons/signout.png" alt="Sign Out" className="w-5 h-5 mr-3" />
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Sidebar;
