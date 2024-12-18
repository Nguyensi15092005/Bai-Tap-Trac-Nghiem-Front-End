import { useState, useEffect } from "react";
import { getAnswerByUserId } from "../../services/AswersService";
import { getListTopic } from "../../services/TopicService";
import { NavLink } from "react-router-dom";

function Answers() {
  const [dataAnswer, setDataAnswer] = useState([]);
  useEffect(() => {
    const FetchAPI = async () => {
      const AnswerByUserId = await getAnswerByUserId();
      const topics = await getListTopic();
      let result = [];

      for (let i = 0; i < AnswerByUserId.length; i++) {
        console.log(AnswerByUserId[i].topicId)
        result.push({

          ...topics.find(item => parseInt(item.id) === AnswerByUserId[i].topicId),
          ...AnswerByUserId[i],


        });
      }

      setDataAnswer(result);
    };
    FetchAPI();
  }, []);
  console.log(dataAnswer);

  return (
    <>
      <h2 >Danh sách bài đã tập luyện</h2>
      <div className="nav">
        {dataAnswer.length &&
          <table>
            <thead>
              <tr>
                <th className="title">
                  Tên chủ đề
                </th>
                <th className="lambai"></th>
              </tr>
            </thead>
            <tbody>
              {dataAnswer.map(item => (
                <tr key={item.id}>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    <NavLink className="a" to={"/result/" + item.id}>Xem chi tiết</NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </>
  )
}

export default Answers;