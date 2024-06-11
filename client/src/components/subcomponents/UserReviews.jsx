import React from "react";
import { FaStar } from "react-icons/fa";
import u1 from "./Assest-Subcomponents/u1.jpg";
import u2 from "./Assest-Subcomponents/u2.jpg";
import u3 from "./Assest-Subcomponents/u3.png";

export default function UserReviews({ rating }) {
  return (
    <section class="relative font-poppins pb-32">
      <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div class="w-full">
          <h2 class="font-manrope font-bold text-4xl text-black mb-8 text-center">
            Our customer reviews
          </h2>
          <div class="  flex justify-center  py-2 Lg:px-96 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
            <div class="p-8 bg-amber-50 w-fit rounded-3xl flex items-center justify-center flex-col">
              <h2 class="font-manrope font-bold text-3xl text-amber-400 mb-6">
                {rating}
              </h2>
              <div class="flex w-fit items-center justify-center gap-2 sm:gap-6 mb-4">
                <FaStar className="text-amber-400 text-[2rem]" />
                <FaStar className="text-amber-400 text-[2rem]" />
                <FaStar className="text-amber-400 text-[2rem]" />
                <FaStar className="text-amber-400 text-[2rem]" />
                <FaStar className="text-amber-400 text-[2rem]" />
              </div>
              <p class="font-medium text-md leading-8 text-gray-900 text-center">
                46 Ratings
              </p>
            </div>
          </div>

          <div class="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
            <div class="flex items-center gap-3 mb-4"></div>
            <h3 class="font-manrope font-semibold text-lg  leading-9 text-black mb-6">
              Outstanding Experience!!!
            </h3>
            <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
              <div class="flex items-center gap-3">
                <img src={u1} alt="John image" class="w-10 h-10 rounded-full" />
                <h6 class="font-semibold text-lg leading-8 text-indigo-600 ">
                  Akshat Maurya
                </h6>
              </div>
              <p class="font-normal text-md leading-8 text-gray-400">
                Sep 1, 2023
              </p>
            </div>
            <p class="font-light text-md leading-8 text-gray-400">
              Sleek consistently delivers outstanding quality and style. Their
              products are not only elegant but also durable, making them a top
              choice for anyone seeking reliability and sophistication. The
              attention to detail and excellent customer service further elevate
              the overall experience. Highly recommended!
            </p>
          </div>
          <div class="pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
            <div class="flex items-center gap-3 mb-4"></div>
            <h3 class="font-manrope font-semibold text-lg  leading-9 text-black mb-6">
              Exceptional Service!
            </h3>
            <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
              <div class="flex items-center gap-3">
                <img src={u3} alt="John image" class="w-10 h-10 rounded-full" />
                <h6 class="font-semibold text-lg leading-8 text-indigo-600 ">
                  Ashutosh Mishra
                </h6>
              </div>
              <p class="font-normal text-md leading-8 text-gray-400">
                June 26, 2023
              </p>
            </div>
            <p class="font-light text-md leading-8 text-gray-400">
              I was thoroughly impressed with the service provided. The team was
              responsive, professional, and went above and beyond to meet my
              needs. Every interaction was smooth and efficient, making the
              entire experience highly satisfactory. I highly recommend their
              services.
            </p>
          </div>
          <div class="pt-8 max-xl:max-w-2xl max-xl:mx-auto">
            <div class="flex items-center gap-3 mb-4"></div>
            <h3 class="font-manrope font-semibold text-lg  leading-9 text-black mb-6">
              Truly Satisfied!
            </h3>
            <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
              <div class="flex items-center gap-3">
                <img
                  src={u2}
                  alt="Robert image"
                  class="w-10 h-10 rounded-full"
                />
                <h6 class="font-semibold text-lg leading-8 text-indigo-600">
                  Tushar Patidar
                </h6>
              </div>
              <p class="font-normal text-md leading-8 text-gray-400">
                Nov 24, 2023
              </p>
            </div>
            <p class="font-light text-md leading-8 text-gray-400">
              I am truly satisfied with Sleek. Their products are a perfect
              blend of style and functionality. The quality is exceptional, and
              their customer service is top-notch. Every purchase feels like a
              great investment. Highly recommend Sleek to anyone looking for
              premium products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
