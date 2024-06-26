import React from "react";
import { Link } from "react-router-dom";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-gray-800  text-wh1 min-w-screen">
      <div className=" bg-gray-900 flex items-start justify-center">
        <p>&#169; Akshat and Ashutosh, 2023</p>
      </div>
      <div className="flex h-fit flex-col text-center lg:text-left pt-6 lg:pt-0 lg:flex-row flex-wrap items-center justify-start">
        <div className="flex flex-1 h-64 justify-center items-center logo-container">
          <h2 className="lobster   gdc1 text-[60px]">Sleek</h2>
        </div>

        <div className="flex-1 footervl min-h-64 flex flex-col items-center justify-center">
          <div>
            <h2 className="my-3 font-bold">User</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="pagenotfound">Careers</Link>
              </li>
              <li>
                <Link to="pagenotfound">Jobs</Link>
              </li>
              <li>
                <Link to="dashboard">Profile</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1 footervl min-h-64 flex items-center justify-center">
          <div>
            <h2 className="my-3 font-bold">Orders</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/orders">Track Orders</Link>
              </li>
              <li>
                <Link to="pagenotfound">Deals</Link>
              </li>
              <li>
                <Link to="/contact">Raise a complaint</Link>
              </li>
              <li>
                <Link to="pagenotfound">Site Map</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 footervl min-h-64 flex items-center justify-center">
          <div>
            <h2 className="my-3 font-bold">Security</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="pagenotfound">Track Complaint</Link>
              </li>
              <li>
                <Link to="pagenotfound">FAQs</Link>
              </li>
              <li>
                <Link to="pagenotfound">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="contact">Contact us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-[1.5] footervl min-h-64 flex flex-col items-center justify-center">
          <div className="pl-2">
            <div>
              <h4 className="font-bold">Address</h4>
              <p>
                Rajiv Gandhi Proudyogiki Vishwavidyalaya Airport Bypass Road,
                Bhopal, Madhya Pradesh -462033
              </p>
            </div>
            <div>
              <h4 className="font-bold">Our Mails</h4>
              <p>
                <p>akshatmaurya25@gmail.com</p>
                <p>falconmishra@gmail.com</p>
              </p>
            </div>
          </div>
        </div>

        <div className=" flex-3/4 p-4 flex min-h-64  footervl items-center justify-start">
          <div className="pl-2 flex flex-col gap-4 ">
            <h4 className="font-bold">Socials</h4>
            <div className="socials flex flex-col gap-4">
              <i className="cursor:pointer">
                <FaInstagram style={{ fontSize: "30px" }} />
              </i>
              <i className="cursor:pointer">
                <RiTwitterXLine style={{ fontSize: "30px" }} />
              </i>
              <i className="cursor:pointer">
                <FaDiscord style={{ fontSize: "30px" }} />
              </i>
              <i className="cursor:pointer">
                <FaTelegram style={{ fontSize: "30px" }} />
              </i>
              {/* <FaMeta  style={{ fontSize: '30px'}}/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
