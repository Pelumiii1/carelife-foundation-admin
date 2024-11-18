"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import carelife_logo from "../../../public/carelife_new_logo.svg";
import HomeIcon from "../Icons/HomeIcon";
import UserIcon from "../Icons/UserIcon";
import LayerIcon from "../Icons/LayerIcon";
import SettingsIcon from "../Icons/SettingsIcon";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import signout_icon from "../../../public/signout-icon.svg";
import { logout } from "@/redux/slices/authSlice";

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [adminMenuOpen, setAdminMenuOpen] = useState(
    pathname.includes("/administration")
  );

  const menuItems = [
    { name: "Overview", path: "/overview", Icon: HomeIcon },
    {
      name: "Administrator",
      path: "/administration/add-manager",
      Icon: UserIcon,
      submenus: [
        { name: "Add Manager", path: "/administration/add-manager" },
        {
          name: "Manage Administrator",
          path: "/administration/manage-administrator",
        },
      ],
    },
    { name: "Frontend Control", path: "/frontend-control", Icon: LayerIcon },
    {
      name: "Manage notifications",
      path: "/notifications",
      Icon: SettingsIcon,
    },
  ];

  const handleSignout = () => {
    dispatch(logout());
    router.push(`/login`);
  };

  const toggleAdminMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

  return (
    <div className="text-[#344054] text-[16px] font-[500] h-full w-[20vw] border-r p-4 pt-[2.5rem] flex flex-col justify-between">
      <div>
        <Image src={carelife_logo} alt="Carelife Foundation" />
        <p className="text-[16px] font-[700] text-[#101828] my-5">Dashboard</p>
        <ul className="space-y-2">
          {menuItems.map(({ name, path, Icon, submenus }) => (
            <li key={name}>
              {/* Main Menu Item */}
              <div>
                <Link
                  href={path}
                  className={`block p-2 rounded-[6px] flex items-center gap-2 leading-[18px] ${
                    pathname.startsWith("/administration") &&
                    name === "Administrator"
                      ? "bg-[#003871] text-white"
                      : pathname.startsWith(path)
                      ? "bg-[#003871] text-white"
                      : "hover:bg-[#003871] hover:text-white"
                  }`}
                  onClick={name === "Administrator" ? toggleAdminMenu : null}
                >
                  <Icon
                    color={
                      pathname.startsWith("/administration") &&
                      name === "Administrator"
                        ? "#FAFAFA"
                        : pathname.startsWith(path)
                        ? "#FAFAFA"
                        : "#667085"
                    }
                  />
                  {name}
                </Link>
              </div>

              {/* Submenus for Administrator */}
              {submenus && adminMenuOpen && (
                <ul className="ml-6 space-y-2 mt-2">
                  {submenus.map(({ name, path }) => (
                    <li key={name}>
                      <Link
                        href={path}
                        className={`block p-2 rounded-[6px] leading-[18px] ${
                          pathname === path
                            ? "bg-transparent underline "
                            : "hover:bg-[#003871] hover:text-white"
                        }`}
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        {user && (
          <div>
            <h1 className="text-[#101828] font-[600]">{`${user.firstName} ${user.lastName}`}</h1>
            <p>{user.email}</p>
          </div>
        )}
        <Image
          src={signout_icon}
          alt=""
          className="cursor-pointer"
          width={30}
          height={30}
          onClick={handleSignout}
        />
      </div>
    </div>
  );
};

export default Sidebar;
