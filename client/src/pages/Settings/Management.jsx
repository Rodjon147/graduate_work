import React, {useState} from 'react';
import "./Management.css"
import FilmControl from "../../components/FilmControl/FilmControl";
import UserControl from "../../components/UsersControl/UserControl";
import CollectionsControl from "../../components/CollectionsControl/CollectionsControl";

const Management = () => {

    const [currentTabs, serCurrentTab] = useState(1)

    const tabs = [
        {id: 1, name: 'Фильмы', content: <FilmControl/>},
        {id: 2, name: 'Пользователи', content: <UserControl/>},
        {id: 3, name: "Подборки", content: <CollectionsControl/>}
    ]

    const tabsHandler = (e) => {
        serCurrentTab(e)
    }

    return (
        <div className="management_container">
            <div className="management_form">
                <div className="management_tabs">
                    <h1>Настройки</h1>
                    <ul>
                        {tabs.map(
                            tabs => {
                                return <li key={tabs.id} className={currentTabs === tabs.id ? "active_tabs" : ""} onClick={() => tabsHandler(tabs.id)}>{tabs.name}</li>
                            }
                        )}
                    </ul>

                </div>
                <div className="management_content">
                        {tabs.map(
                            tabs => {
                                return <div key={tabs.id}> {currentTabs === tabs.id ? tabs.content : null} </div>
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default Management;