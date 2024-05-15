import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "react-bootstrap";

const jsonData = [
  { name: "jena", color: "red", lable: "j" },
  { name: "keerthees", color: "black", lable: "K" },
  { name: "karthik", color: "blue", lable: "K" },
];

const AutoSearch = () => {
  const [text, setText] = useState("");
  const [showdata, setshowdata] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [lableshow, setlableshow] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setText(value);
    if (value.includes("@")) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const newText = `${text}${suggestion} `;
    const textWithoutAtSymbol = newText.replace("@", "");
    setText(textWithoutAtSymbol);
    setShowSuggestions(false);
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };
  const handledatashow = () => {
    const textWithoutAtSymbol = text.replace("@", "");
    setshowdata(textWithoutAtSymbol);
    setlableshow(true);
  };
  useEffect(() => {
    const searchFields = ["name"];

    const filteredData = jsonData.filter((suggestion) => {
      const lowerSearchTerm = searchtext.toLowerCase();

      return searchFields.some(
        (field) =>
          typeof suggestion[field] === "string" &&
          suggestion[field].toLowerCase().includes(lowerSearchTerm),
      );
    });
    setFilteredSuggestions(filteredData);
  }, [searchtext]);

  return (
    <>
      <div className="Auto-screen bg-black">
        <div className="container position-relative aling-cls ">
          <div className="col-sm-12 ">
            <div className="row  ">
              <div className="w-100 text-center">
                <textarea
                  value={text}
                  onChange={handleChange}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-area-cls"
                  placeholder="Create a post..."
                />
                {showSuggestions && (
                  <div className="absolute bg-white border border-gray-300 mt-1 rounded w-full list table-responsive">
                    <input
                      value={searchtext}
                      onChange={handleSearchChange}
                      placeholder="Search..."
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer-cls hover:bg-gray-200"
                        onClick={() => handleSelectSuggestion(suggestion.name)}
                      >
                        <span className={`round ${suggestion.color}`}>
                          {suggestion.lable}
                        </span>
                        <span className="text-color-cls">
                          {suggestion.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-3 ">
              <div className="col-sm-7 "></div>
              <div className="col-sm-2 text-end ">
                <div className="w-100">
                  <button
                    onClick={handledatashow}
                    type="button"
                    className="btn-size hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border-blue-500 hover:border-transparent rounded"
                  >
                    post
                  </button>
                </div>
              </div>
            </div>
            {lableshow && (
              <div className="row mt-3 ">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                  <Card>
                    <CardBody className=" show-card">
                      <label>{showdata}</label>
                    </CardBody>

                    <CardFooter className="footer">
                      <label className="footer-lable">keerthees</label>
                      <p className="font-sz">1 hour ago</p>
                    </CardFooter>
                  </Card>
                </div>
                <div className="col-sm-3"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoSearch;
