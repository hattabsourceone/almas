import React, { useEffect, useState } from "react";
import banner from "@assets/CustomOrder/banner.png";
import img1 from "@assets/CustomOrder/1.png";
import img2 from "@assets/CustomOrder/2.png";
import img3 from "@assets/CustomOrder/3.png";
import img4 from "@assets/CustomOrder/4.png";
import Contact from "@components/shared/Contact/Contact";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { toast } from "react-toastify";
import Banner from "@components/shared/Banner/Banner";
import { Country } from "country-state-city";

const CustomOrderPage: React.FC = () => {
  const [metals, setMetals] = useState([]);
  const countries = Country.getAllCountries();
  const [formData, setFormData] = useState({
    full_name: "",
    email_address: "",
    address: "",
    mobile_number: "",
    type: "",
    metal: "",
    country: "",
    message: "",
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        setFormData((prev) => ({ ...prev, [name]: input.files![0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMetalChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const fetchMetals = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/get_all_metal`);
      if (response.status === 200) {
        setMetals(response.data.metals);
      }
    } catch (error) {
      console.error("Error fetching metals:", error);
    }
  };

  const handleSubmit = async () => {
    const requestData = {
      ...formData,
      file: formData.file ? await fileToBase64(formData.file) : "",
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/send_design_request`,
        requestData
      );
      if (response.status === 200) {
        toast.success("Your order has sent successfully.", {
          autoClose: 2500,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There is an error! please try again.", {
        autoClose: 2500,
      });
    }
  };

  useEffect(() => {
    document.title = "Custom Order";
    fetchMetals();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Banner title="CUSTOM MADE JEWELLERY" img={banner} />
      <div className="flex flex-col w-full mx-auto">
        <div className="flex flex-row w-[86%] lg:w-[84%] xl:w-[82%] 2xl:w-[72%] mx-auto space-x-4  mb-8">
          <div className="col-sm-4 mt-[141px]">
            <img
              src={img1}
              className="lg:max-w-[266px] xl:max-w-[328px] 2xl:max-w-[445px] rounded-[100%] object-cover"
            />
          </div>
          <div className="col-sm-8">
            <p className="text-[#201F41] text-[50px] 2xl:text-[60px] uppercase font-normal mb-6 2xl:mb-10 mt-[75px] leading-[55px]">
              Bespoke Design
            </p>
            <div className="w-[95%] 2xl:w-[70%] relative">
              <p className="text-[#53556b] text-[16px] italic font-normal leading-7 relative z-10">
                Apart from being beautiful, the jewellery we wear often reflects
                our unique taste, personality and lifestyle. But above all, it
                has a different meaning to each one of us. Our custom designing
                service has been created on this basis, to capture the true
                essence of your dream item and transform it into something that
                is completely your own.
              </p>
              <div className="rounded-full border-2 flex p-3 absolute z-0 w-[168px] h-[168px] bg-[#666] opacity-[8%]"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[95%] lg:w-[66%] xl:w-[59%] 2xl:w-[53%] mx-auto space-x-10 mt-10 mb-6">
          <p className="text-center text-[#201F41] text-[50px] 2xl:text-[60px] uppercase font-normal">
            THE JOURNEY OF A JEWEL
          </p>
          <div className="flex flex-col w-full lg:flex-row mx-auto mt-4">
            <img
              src={img2}
              className="w-[99%] mx-auto lg:w-[293px] xl:w-[360px] 2xl:w-[490px]"
            />
            <div className="flex flex-col lg:px-8">
              <p className="text-[12px] uppercase text-[#666] font-normal pt-[50px]">
                STEP 1.
              </p>
              <p className="text-[#88787e] text-[25px] italic font-medium mb-3 mt-2">
                Share your ideas.
              </p>
              <p className="text-[16px] text-[#666] font-normal text-justify">
                Contact our design team to let us know what jewellery you would
                like to create. The more detailed your enquiry, the easier we
                can craft your dream jewellery piece. Once you agree to a
                design, our experts will offer you a quote on your bespoke
                piece.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[95%] lg:w-[66%] xl:w-[59%] 2xl:w-[53%] mx-auto space-x-10 mb-6">
          <div className="flex flex-col w-full lg:flex-row mx-auto mt-4">
            <div className="flex flex-col lg:px-8">
              <p className="text-[12px] uppercase text-[#666] font-normal pt-[50px]">
                STEP 2.
              </p>
              <p className="text-[#88787e] text-[25px] italic font-medium mb-3 mt-2">
                Design your item.
              </p>
              <p className="text-[16px] text-[#666] font-normal text-justify">
                After settling a deposit fee, our team will start working on the
                fine details of your piece. This is a collaborative process
                between you and the designer. To better illustrate your vision,
                we can provide drawings, computer designs and mock-ups of the
                jewel. Our experts will not proceed to production until you are
                completely satisfied with the result.
              </p>
            </div>
            <img
              src={img3}
              className="w-[99%] mx-auto lg:w-[293px] xl:w-[360px] 2xl:w-[490px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-[95%] lg:w-[66%] xl:w-[59%] 2xl:w-[53%] mx-auto space-x-10 mb-8">
          <div className="flex flex-col w-full lg:flex-row mx-auto mt-4">
            <img
              src={img4}
              className="w-[99%] mx-auto lg:w-[293px] xl:w-[360px] 2xl:w-[490px]"
            />
            <div className="flex flex-col lg:px-8">
              <p className="text-[12px] uppercase text-[#666] font-normal pt-[50px]">
                STEP 3.
              </p>
              <p className="text-[#88787e] text-[25px] italic font-medium mb-3 mt-2">
                Receive your dream jewellery.
              </p>
              <p className="text-[16px] text-[#666] font-normal text-justify">
                This is the part where you can sit back and relax. Your
                jewellery design will be sent off to our expert craftsmen in our
                workshop for completion. The crafting process may take around
                four to five weeks depending on your design. Once ready, we can
                deliver your item beautifully packaged right to your doorstep.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[95%] lg:w-[86%] xl:w-[84%] 2xl:w-[73%] mx-auto md:space-x-4 mb-8 mt-8">
          <p
            data-aos="fade-right"
            data-aos-duration="500"
            className="text-center text-[#201F41] aos-init aos-animate text-[50px] xl:text-[60px] uppercase font-normal leading-[55px] md:leading-tight"
          >
            Custom Design Request Quote
          </p>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="aos-init aos-animate mt-4 flex flex-col md:flex-row md:justify-between md:gap-8 w-full"
          >
            <div className="w-full md:w-[40%] h-[64px]">
              <input
                type="text"
                name="full_name"
                id="full_name"
                className="mt-1 block h-[34px] pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px]"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-[40%] h-[64px]">
              <input
                type="email"
                name="email_address"
                id="email_address"
                className="mt-1 block h-[34px] pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px]"
                placeholder="E-Mail"
                value={formData.email_address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="aos-init aos-animate flex flex-col md:flex-row md:justify-between md:gap-8 w-full"
          >
            <div className="w-full md:w-[40%] h-[64px]">
              <input
                type="text"
                name="address"
                id="address"
                className="mt-1 block h-[34px] pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px]"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-[40%] h-[64px]">
              <input
                type="text"
                name="mobile_number"
                id="mobile_number"
                className="mt-1 block h-[34px] pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px]"
                placeholder="Mobile number"
                value={formData.mobile_number}
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="aos-init aos-animate flex flex-col md:flex-row md:justify-between md:gap-8 w-full"
          >
            <div className="w-full md:w-[40%] h-[64px]">
              <input
                type="text"
                name="type"
                id="type"
                className="mt-1 block h-[34px] pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px]"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-[40%] h-[64px]">
              <select
                name="metal"
                value={formData.metal}
                onChange={handleMetalChange}
                className="mt-1 block h-[34px] pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px] bg-[#f9f9f9]"
              >
                <option value="">Metal</option>
                {metals.map((metal: any) => (
                  <option key={metal.id} value={metal.id}>
                    {metal.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="aos-init aos-animate flex flex-col md:flex-row md:justify-between md:gap-8 w-full "
          >
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              id="country"
              className="mt-1 block h-[34px] pl-2 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px] bg-[#f9f9f9]"
            >
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="aos-init aos-animate col-span-2 mt-8"
          >
            <label htmlFor="file" className="block text-[15px] text-[#666]">
              File upload
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="block h-10 w-full border-none rounded-[4px] shadow-none text-[12px] text-[#666]"
              style={{ fontFamily: '"Open Sans", sans-serif' }}
              onChange={handleChange}
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-duration="500"
            className="aos-init aos-animate col-span-2 mt-16"
          >
            <textarea
              id="message"
              name="message"
              rows={8}
              className="mt-1 block pt-2 pl-3 w-full border-[1px] border-[#ccc] rounded-[4px] shadow-none text-[#555] text-[12px]"
              style={{ fontFamily: '"Open Sans", sans-serif' }}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              fontFamily: '"Open Sans", sans-serif',
            }}
            className="text-[18px] mt-8 mb-20 px-[33px] w-min py-[8px] font-medium text-white bg-[#201F41] rounded-[10px]"
          >
            Submit
          </button>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default CustomOrderPage;
