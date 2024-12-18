import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAnswer } from "../../services/AswersService";
import { getQuestionTopic } from "../../services/QuestionService";
import "./Result.scss";

function Result() {
  const param = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [dung, setDung] = useState(0);
  const [sai, setSai] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchAPI = async () => {
      const dataAnswer = await getAnswer(param.id);
      const dataQuestion = await getQuestionTopic(dataAnswer.topicId)

      let resultFinal = [];
      for (let i = 0; i < dataQuestion.length; i++) {
        resultFinal.push({
          ...dataQuestion[i],
          ...dataAnswer.answers.find(item => item.questionId === parseInt(dataQuestion[i].id))
        });
      };

      let dung = 0;
      let sai = 0;

      for (let i = 0; i < resultFinal.length; i++) {
        if (resultFinal[i].answers === resultFinal[i].correctAnswer) {
          dung++;
        }
        else {
          sai++;
        }
      }
      setDung(dung);
      setSai(sai);
      setDataResult(resultFinal);
      console.log(resultFinal);
    }
    FetchAPI();
  }, []);

  // const handleClick =() =>{
  //   {dataResult.topicId && (
  //     navigate(`/quiz/${dataResult.topicId}`)
  //   )};
  // }
  return (
    <>
      <h2>Kết Quả: Đúng {dung} && Sai {sai}</h2>
      {dataResult && (
        <div className="result">
          {dataResult.map((item, index) => (
            <div className="result__item" key={item.id}>
              <p>
                Câu {index + 1}: {item.question}
                {item.answers === item.correctAnswer ? (
                  <span className="result__tag result__tag--true">Đúng</span>
                ) : (
                  <span className="result__tag result__tag--false">Sai</span>
                )}
              </p>
              {item.answer.map((itemAns, indexAns) => {
                let className = "";
                let checked = false;
                if (item.answers === indexAns) {
                  checked = true;
                  className = "result__answer--selectsed";
                }
                if (item.correctAnswer === indexAns) {
                  className += " result__answer--result";
                }
                return (
                  <div className="result__answer" key={indexAns}>
                    <input type="radio" checked={checked} disabled />
                    <label className={className} >{itemAns}</label>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
      {/* <button onClick={handleClick}>
        Lam lai
      </button> */}

    </>
  )
}

export default Result;