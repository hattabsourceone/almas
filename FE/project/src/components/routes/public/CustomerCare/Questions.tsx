import { BASE_URL } from "@components/api/api";
import Tab, { PropsTab } from "@components/shared/Tab/Tab";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<PropsTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/v1/get_all_questions`
        );
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        setError("Failed to load questions");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Added empty dependency array to prevent infinite loops

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div
      className="py-3 md:pl-[16px] lg:pl-[68px] xl:pl-[110px] 2xl:pl-[0px] flex flex-col"
      // className="col-12 h-screen "
    >
      <div
        className="text-center sm:text-left"
        // className=" min-h-44 bg-contain float-left lg:mb-[15vh]"
      >
        <h1 className="xl:size-[160px] 2xl:size-[170px] text-[27px]  sm:text-left sm:w-[92%] md:ml-3 sm:ml-auto gap-3 sm:gap-3 md:text-[40px] md:w-[70%] xl:bg-slogan-bg bg-no-repeat bg-contain xl:py-6 xl:px-5 lg:w-full xl:w-[35%]  xl:ml-10 md:text-start text-[#201f41] uppercase 2xl:text-[60px] 2xl:pl-0">
          FREQUENTLY ASKED QUESTIONS
        </h1>
      </div>

      <div
        className="accordion accordion-flush sm:w-[90%] md:w-[92%] md:m-0  xl:w-[63%] 2xl:w-[70%] 2xl:mx-3 sm:mx-7 xl:mx-10 xl:my-20 2xl:my-20"
        id="accordionFlushExample"
      >
        {questions.map((question, i) => (
          <Tab
            key={i}
            id={i}
            question={question.question}
            response={question.response}
          />
        ))}
      </div>
    </div>
  );
};

export default Questions;
