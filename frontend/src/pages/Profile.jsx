import React, { useRef, useState } from 'react';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState("https://via.placeholder.com/150");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 text-center">
        <div className="relative w-28 h-28 mx-auto mb-4">
          <img
            src={profileImg}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full text-xs shadow"
          >
            ✏️
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <h2 className="text-xl font-semibold mb-1">Your Name</h2>
        <p className="text-gray-500 text-sm mb-4">User Profile</p>
      </div>

      {/* Info Card */}
      <div className="bg-white shadow-md rounded-2xl p-6 mt-6 space-y-6">
        {/* Name, Age, Address */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📝 Update Profile</h3>
          <input type="text" placeholder="Your Name" className="input input-bordered w-full mb-2" />
          <input type="number" placeholder="Age" className="input input-bordered w-full mb-2" />
          <input type="text" placeholder="Address" className="input input-bordered w-full mb-2" />
          <button className="btn btn-primary w-full">Save</button>
        </div>

        {/* Email and Password */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📧 Email & Password</h3>
          <input type="email" placeholder="New Email" className="input input-bordered w-full mb-2" />
          <input type="password" placeholder="New Password" className="input input-bordered w-full mb-2" />
          <button className="btn btn-primary w-full">Update</button>
        </div>

        {/* Phone Verification */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📱 Phone Verification</h3>
          <input type="text" placeholder="Phone Number" className="input input-bordered w-full mb-2" />
          <button className="btn btn-secondary w-full">Send OTP</button>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📍 Update Location</h3>
          <input type="text" placeholder="Your Location" className="input input-bordered w-full mb-2" />
          <button className="btn btn-accent w-full">Save Location</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
