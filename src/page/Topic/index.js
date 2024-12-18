import { NavLink } from "react-router-dom";
import "./topic.scss";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/TopicService";
function Topic() {
    const [topics, setTopic] = useState([]);
    useEffect(() => {
        const FetchAPI = async () => {
            const response = await getListTopic();
            setTopic(response);
        };
        FetchAPI();
    }, []);
    return (
        <>
            <div className="nav">
                <h2 className="o">Danh sách chủ đề ôn luyện</h2>
                {topics.length &&
                    <table>
                        <thead>
                            <tr>
                                <th className="id">
                                    ID
                                </th>
                                <th className="title">
                                    Tên chủ đề
                                </th>
                                <th className="lambai"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        <NavLink className="a" to={"/quiz/"+item.id}>Lam bai</NavLink>
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

export default Topic;