import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

import Container from "./Container";

const Footer = () => {
  return (
    <div className="bg-[#F2F4F8] shadow-2xl ">
      <Container>
        <div className="border-t  p-4 pt-12">
          <div className="flex justify-between flex-col space-y-12 md:space-y-0  md:flex-row flex-wrap">
            <div className="flex-1">
              <Link className="flex gap-2" href={"/"}>
                <div className="w-[300px] ">
                  <div className=" flex items-center gap-4">
                    <p className="text-xl lg:text-3xl font-bold">Easy Shop</p>
                  </div>
                </div>
              </Link>
              <p className="mr-12 mt-6">
                The E-Commerce Application is designed to provide a complete
                online shopping experience.
              </p>
              <div className="flex gap-6 mt-12">
                <Link className="link link-hover" href="">
                  <p className="border p-2 block rounded-full hover:shadow-xl hover:shadow-gray-500/50 hover:bg-gray-500   ">
                    <FaFacebookF />
                  </p>
                </Link>
                <Link className="link link-hover" href="">
                  <p className="border p-2 block rounded-full hover:shadow-xl hover:shadow-gray-500/50 hover:bg-gray-500">
                    <FaTwitter />
                  </p>
                </Link>
                <Link className="link link-hover" href="">
                  <p className="border p-2 block rounded-full hover:shadow-xl hover:shadow-gray-500/50 hover:bg-gray-500 ">
                    <FaLinkedinIn />
                  </p>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <h6 className="text-2xl font-bold text-gray-500">Quick Links</h6>
              <div className="flex justify-between gap-24">
                <div className="flex flex-col gap-4">
                  <Link className="link link-hover" href="/">
                    Home
                  </Link>
                  <Link className="link link-hover" href="/products">
                    Products
                  </Link>
                  <Link className="link link-hover" href="/flash-sales">
                    Flash Sales
                  </Link>
                  <Link className="link link-hover" href="/resent-products">
                    Resent products
                  </Link>
                </div>

                <div className="flex flex-col gap-4" />
              </div>
            </div>

            <div className="flex-1">
              <h6 className="text-2xl font-bold text-gray-500">
                Get Connected
              </h6>
              <div className="space-y-8">
                <h2 className=" flex items-center gap-2">
                  <HiOutlineMail size={25} />
                  <span>fayjulkarim2@gmail.com</span>
                </h2>
                <h2 className=" flex items-center gap-2">
                  <FaPhoneAlt size={20} />
                  <span>01721-880383</span>
                </h2>
                <h2 className=" flex  gap-2">
                  <FiClock size={25} />
                  <div>
                    <p>Saturday href Wednesday: 9:00 AM – 6:00 PM </p>
                  </div>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
