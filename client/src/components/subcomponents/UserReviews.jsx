import React from "react";
import { FaStar } from "react-icons/fa";

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
                <img
                  src="https://pagedone.io/asset/uploads/1704349572.png"
                  alt="John image"
                  class="w-8 h-8"
                />
                <h6 class="font-semibold text-lg leading-8 text-indigo-600 ">
                  Ashutosh Mishra
                </h6>
              </div>
              <p class="font-normal text-md leading-8 text-gray-400">
                Nov 01, 2023
              </p>
            </div>
            <p class="font-light text-md leading-8 text-gray-400">
              One of the standout features of Pagedone is its intuitive and
              user-friendly interface. Navigating through the system feels
              natural, and the layout makes it easy to locate and utilize
              various design elements. This is particularly beneficial for
              designers looking to streamline their workflow.
            </p>
          </div>
          <div class="pt-8 max-xl:max-w-2xl max-xl:mx-auto">
            <div class="flex items-center gap-3 mb-4"></div>
            <h3 class="font-manrope font-semibold text-lg  leading-9 text-black mb-6">
              Pagedone's design system seamlessly bridges the gap between
              designers and developers!
            </h3>
            <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
              <div class="flex items-center gap-3">
                <img
                  src="https://pagedone.io/asset/uploads/1704351103.png"
                  alt="Robert image"
                  class="w-8 h-8"
                />
                <h6 class="font-semibold text-lg leading-8 text-indigo-600">
                  Tushar Patidar
                </h6>
              </div>
              <p class="font-normal text-md leading-8 text-gray-400">
                Nov 01, 2023
              </p>
            </div>
            <p class="font-light text-md leading-8 text-gray-400">
              Pagedone doesn't disappoint when it comes to the variety and
              richness of its design components. From pre-built templates to
              customizable elements, the system caters to both beginners and
              seasoned designers. The extensive library ensures a diverse range
              of options to bring creative visions to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
