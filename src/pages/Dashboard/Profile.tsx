import React from 'react';
import { useState } from 'react';
import { Button } from 'antd';
import ProfileEdit from '../../Components/ui/profile-component/ProfileEdit.js';
import ChangePassword from '../../Components/ui/profile-component/ChangePassword.js';
import { imageUrl } from '../../utils/imageHandler.js';
import { CameraIcon } from '../../Components/ui/icons/SvgIcons.js';

const Tabs = ['Edit Profile', 'Change Password'];

const Profile = () => {
  const [tab, setTab] = useState(Tabs[0]);
  // const { data: profileData, isLoading } = useGetProfileDataQuery({});
  const [image, setImage] = useState<File | null>(null);
  const profileData = {
    data: {
      name: 'Hosain',
      email: 'hosain@gmail.com',
      profile_image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };
  console.log(profileData);
  const profileImage = image
    ? URL.createObjectURL(image)
    : profileData?.data?.profile_image
      ? imageUrl({ image: profileData.data.profile_image, fallback: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' })
      : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <>
      <div className="max-w-[700px] mx-auto  p-4 rounded-md">
        <div className="w-full center-center">
          <div
            onClick={() => {
              if (tab === 'Edit Profile') {
                document.getElementById('fileInput')?.click();
              }
            }}
            className="w-24 h-24 border-2 border-black p-1 cursor-pointer rounded-full relative"
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={profileImage}
              alt="Profile"
            />
            {tab === 'Edit Profile' && (
              <button
                aria-label="Edit Profile Picture"
                className="absolute bg-[var(--bg-red-high)] p-1 rounded-full right-0 bottom-2"
              >
                <CameraIcon />
              </button>
            )}

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <p className="text-2xl text-center text-black mt-2">
          {profileData?.data?.name || 'User Name'}
        </p>
      </div>

      {/* Tabs Section */}
      <div className="mx-auto p-1 border border-[#9333EA] rounded-sm !w-fit center-center my-3">
        {Tabs.map((item) => (
          <Button
            key={item}
            style={{ width: '200px', justifyContent: 'center' }}
            className={`${item === tab
              ? '!bg-[var(--bg-red-high)] !text-white !border-0 !rounded-sm'
              : '!border-0 !rounded-none !text-black !border-black !bg-transparent'
              }`}
            onClick={() => setTab(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="max-w-[700px] mx-auto bg-[var(--black-200)] p-4 rounded-md">
        {tab === 'Edit Profile' ? (
          // isLoading ? (
          //   <span className="loader-black"></span>
          // ) : (
          <ProfileEdit
            image={image}
            data={profileData?.data}
          />
          // )
        ) : (
          <ChangePassword />
        )}
      </div>
    </>
  );
};

export default Profile;
