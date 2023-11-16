"use client";
import React, { useState } from "react";
import Header from "../../components/Header";

function Transcription() {
  const [transcript, setTranscript] = useState("123");
  const [url, setUrl] = useState("");

  async function handleTranscription() {}

  return (
    <>
      <Header />
      <div className="py-10 pt-48">
        <div className="flex justify-center space-x-3 items-center pb-12">
          <span className="text-3xl font-bold">
            Turn any YouTube video into your personal tutor
          </span>
        </div>
        <div className="flex justify-center space-x-3 items-center ">
          <div>
            <input
              placeholder="Paste the Youtube video URL here..."
              className="px-5 py-2 border rounded-md w-[500px]"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleTranscription}
              className="px-7 py-2 roudned-md text-white bg-black rounded-md"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="pt-24">
          <div>
            <span className="text-xl font-bold">Transcript:</span>
          </div>
          <div>
            <p className="">{transcript}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transcription;
