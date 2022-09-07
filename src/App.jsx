import { useState } from "react";
import { getUniqueWords, countWords, getCharFrequency, getCharsHistogram } from "./utils/textAnalyzers";
import './App.css'

export default function App() {
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [textAnalysis, setTextAnalysis] = useState({
    uniqueWords: [],
    wordsQuantity: 0,
    charFrequency: {},
    charsHistogram: []
  });

  const handleChange = (e) => {
    setText(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueWords = getUniqueWords(text);
    const wordsQuantity = countWords(text);
    const charFrequency = getCharFrequency(text);
    const charsHistogram = getCharsHistogram(text);
    setTextAnalysis({ uniqueWords, wordsQuantity, charFrequency, charsHistogram });
  }

  return (
    <main >
      <h1 className="fs-huge text-center fw-semi-bold">Text Analizer</h1>
      <form id="text-form" className="container" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="text-area">
          Paste or Write your text here

          <span className={`error-msg ${errorMsg && "display-block"}`}>
            {errorMsg}
          </span>
        </label>
        <textarea
          id="text-area"
          required=''
          value={text}
          onChange={(e) => handleChange(e)}
        />

        <button type='submit' disabled={text.length === 0}>Analyze Text</button>
      </form>

      <article id="text-analysis" className="container">
        <h2 className="fs-big fw-semi-bold">Text Analysis</h2>
        <section>
          <h3>Text Length</h3>
          <p>{text.length} characters</p>
        </section>
        <section>
          <h3>Number of words</h3>
          <p>{textAnalysis.wordsQuantity} words</p>
        </section>
        <section>
          <h3>Unique Words</h3>
          <p>
            ({[...textAnalysis.uniqueWords].length}) {/*  */}
            {[...textAnalysis.uniqueWords].map((word, idx) => {
              return (<span key={idx}>{word}, </span>);
            })}
          </p>
        </section>
        <section id="char-frequency-section">
          <h3>Char Frequency (number of times)</h3>
          <p>
            {Object.entries(textAnalysis.charFrequency).sort((a, b) => {
              return a[1] < b[1] ? 1 : -1
            }).map(([key, value], idx) => {
              return (<span key={idx}>[ {key}: {value} ],</span>);
            })}
          </p>
        </section>
        <section>
          <h3>Chars Histogram</h3>
          {textAnalysis.charsHistogram.map(([key, value]) => {
            return (
              <p key={key} className="char-meter-p">
                <span className="text-center">{key}</span>
                <meter value={value} min="0" max="100" low="2.1" high="4.2">{value}%</meter>
                <span className="text-center">{value}%</span>
              </p>);
          })}
        </section>
      </article>
    </main>
  )
}
