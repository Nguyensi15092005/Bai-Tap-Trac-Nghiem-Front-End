import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/TopicService";
import { getQuestionTopic } from "../../services/QuestionService";
import "./quiz.scss";
import { getCookie } from "../../helpers/cookie";
import { redultQuizService } from "../../services/QuizService";


function Quiz() {
  const [dataTopic, setTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const FetchAPI = async () => {
      const response = await getTopic(param.id);
      setTopic(response);
    };
    FetchAPI();
  }, []);

  useEffect(() => {
    const FetchAPI = async () => {
      const response = await getQuestionTopic(param.id);
      setDataQuestion(response);
    };
    FetchAPI();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedAnswer = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswer.push({
          questionId: parseInt(name),
          answers: parseInt(value)
        })
      }
    }
    let options = {
      userId: getCookie("id"),
      topicId: parseInt(param.id),
      answers: selectedAnswer
    }
    const response = await redultQuizService(options);
    if (response) {
      navigate(`/result/${response.id}`);
    }
  }
  return (
    <>
      <h2>Chủ dề của bài Quiz: {dataTopic && (<>{dataTopic.name}</>)}</h2>

      {dataQuestion && (
        <div className="form-quiz">
          <form onSubmit={handleSubmit}>
            {dataQuestion.map((item, index) => (
              <div className="form-quiz__item" key={item.id}>
                <p>Câu {index + 1}: {item.question}</p>
                {item.answer.map((itemAns, indexAns) => (
                  <div className="form-quiz__answer" key={indexAns}>
                    <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`} />
                    <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                  </div>
                ))}
              </div>
            ))}
            <button className="form-quiz__button" type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Quiz;