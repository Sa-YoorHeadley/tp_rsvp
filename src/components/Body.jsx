import { useState } from "react";
import axios from "../api/axios";

function Body() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [errors, setErrors] = useState([])
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const [response, setResponse] = useState("yes");
  const [plusOneResponse, setPlusOneResponse] = useState("yes");

  const search = async () => {
    setIsLoading(true);
    // setErrors([])
    if (!firstName || !lastName) {
      alert("Please enter a first and last name");
      return;
    }
    const url = `https://tp-rsvp-server.onrender.com/search?firstName=${firstName}&lastName=${lastName}`
    // const url = `http://localhost:3001/search?firstName=${firstName}&lastName=${lastName}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        // console.log(res.data)
        // console.log(res.data.plusOne)
        if (res?.data) {
          setData(res.data);
          setStatus(res.status);
        }
      })
      .catch((error) => {
        console.log(error);
        setData(error?.response?.data);
        setStatus(error?.response?.status);
      });
    setIsLoading(false);
  };

  const respond = async () => {
    setIsLoadingResponse(true);
    // setErrors([])
    const url = `https://tp-rsvp-server.onrender.com/search/${response}?firstName=${firstName}&lastName=${lastName}`
    // const url = `http://localhost:3001/search/${response}?firstName=${firstName}&lastName=${lastName}`;
    axios
      .patch(url)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setData(res.data);
          setStatus(res.status);
          setIsLoadingResponse(false);
          alert("Thank you for responding!");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        setData(error.response.data);
        setStatus(error.response.status);
        setIsLoadingResponse(false);
        alert("Search Failed! Please Try Again!");
      });

    // setData(null)
    // setStatus(null)
    // setFirstName('')
    // setLastName('')
  };

  function handleChange(event) {
    setData(null);
    setStatus(null);
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
    }
    if (event.target.name === "lastName") {
      setLastName(event.target.value);
    }
  }

  return (
    <div className="h-full flex flex-col items-center gap-8 py-16 px-12 text-[#D9BE73] bg-[#003730] sm:text-xl text-center">
      <h1 className="text-3xl sm:text-4xl">RSVP</h1>
      <p>
        To RSVP, simply search for your name and confirm your attendance
        details.
      </p>
      <div className="flex flex-col gap-8 sm:flex-row">
        <input
          className="w-48 py-1 px-4 rounded-lg border-2 border-[#D9BE73] bg-transparent placeholder:text-[#D9BE73]"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleChange}
        />
        <input
          className="w-48 py-1 px-4 rounded-lg border-2 border-[#D9BE73] bg-transparent placeholder:text-[#D9BE73]"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleChange}
        />
      </div>
      <button
        className="w-32 py-1 px-4 rounded-lg bg-[#D9BE73] border-2 border-[#D9BE73] text-[#003730] disabled:bg-gray-300"
        disabled={isLoading}
        onClick={search}
      >
        {!isLoading ? "Search" : "Loading"}
      </button>
      {/* Unconfirmed Respdoned */}
      {data && data.response === "Pending" && status === 200 && (
        <div>
          <p>
            Will {firstName} {lastName} be attending?
          </p>
          <div className="flex justify-center">
            <div className="flex">
              <label className="" htmlFor="yes">
                Yes
              </label>
              <input
                className="mx-2 mt-1"
                type="radio"
                name="yes"
                id="yes"
                checked={response === "yes"}
                onChange={() => setResponse("yes")}
              />
            </div>
            <div className="flex">
              <label className="" htmlFor="no">
                No
              </label>
              <input
                className="mx-2 mt-2"
                type="radio"
                name="no"
                id="no"
                checked={response === "no"}
                onChange={() => setResponse("no")}
              />
            </div>
          </div>

          {data.plusOne && (
            <>
              <p>
                Will {firstName} {lastName} be attending with a plus 1
              </p>
              <div className="flex justify-center">
                <div className="flex">
                  <label className="" htmlFor="plusOneYes">
                    Yes
                  </label>
                  <input
                    className="mx-2 mt-1"
                    type="radio"
                    name="plusOneYes"
                    id="plusOneYes"
                    checked={plusOneResponse === "yes"}
                    onChange={() => setPlusOneResponse("yes")}
                  />
                </div>
                <div className="flex">
                  <label className="" htmlFor="plusOneNo">
                    No
                  </label>
                  <input
                    className="mx-2 mt-1"
                    type="radio"
                    name="plusOneNo"
                    id="plusOneNo"
                    checked={plusOneResponse === "no"}
                    onChange={() => setPlusOneResponse("no")}
                  />
                </div>
              </div>
            </>
          )}
          <button
            className="mt-8 w-32 py-1 px-4 rounded-lg bg-[#D9BE73] border-2 border-[#D9BE73] text-[#003730]"
            disabled={isLoadingResponse}
            onClick={respond}
          >
            {!isLoadingResponse ? "Respond" : "Loading"}
          </button>
        </div>
      )}

      {/* Confirmed Respdoned */}
      {data && data.response !== "Pending" && status === 200 && (
        <div>
          <p>
            {firstName} {lastName} has already responded with{" "}
            <strong>{data.response}</strong>.
          </p>
          <p className="mt-2">
            Will {firstName} {lastName} be attending?
          </p>
          <div className="mb-4 flex justify-center">
            <div className="flex">
              <label className="" htmlFor="yes">
                Yes
              </label>
              <input
                className="mx-2 mt-1"
                type="radio"
                name="yes"
                id="yes"
                checked={response === "yes"}
                onChange={() => setResponse("yes")}
              />
            </div>
            <div className="flex">
              <label className="" htmlFor="no">
                No
              </label>
              <input
                className="mx-2 mt-2"
                type="radio"
                name="no"
                id="no"
                checked={response === "no"}
                onChange={() => setResponse("no")}
              />
            </div>
          </div>
          {data.plusOne && (
            <>
              <p>
                Will {firstName} {lastName} be attending with a plus 1
              </p>
              <div className="flex justify-center">
                <div className="flex">
                  <label className="" htmlFor="plusOneYes">
                    Yes
                  </label>
                  <input
                    className="mx-2 mt-1"
                    type="radio"
                    name="plusOneYes"
                    id="plusOneYes"
                    checked={plusOneResponse === "yes"}
                    onChange={() => setPlusOneResponse("yes")}
                  />
                </div>
                <div className="flex">
                  <label className="" htmlFor="plusOneNo">
                    No
                  </label>
                  <input
                    className="mx-2 mt-1"
                    type="radio"
                    name="plusOneNo"
                    id="plusOneNo"
                    checked={plusOneResponse === "no"}
                    onChange={() => setPlusOneResponse("no")}
                  />
                </div>
              </div>
            </>
          )}
          <button
            className="mt-8 w-32 py-1 px-4 rounded-lg bg-[#D9BE73] border-2 border-[#D9BE73] text-[#003730]"
            disabled={isLoadingResponse}
            onClick={respond}
          >
            {!isLoadingResponse ? "Respond" : "Loading"}
          </button>
        </div>
      )}

      {/* Not Found */}
      {!data && status === 404 && (
        <div>
          <p>
            {firstName} {lastName} was not found.
          </p>
        </div>
      )}

      {/* Error */}
      {!data && status !== null && status !== 404 && (
        <div>
          <p>Search Failed! Please Try Again!</p>
        </div>
      )}
    </div>
  );
}

export default Body;
