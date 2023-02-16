import React, {useState} from 'react';
import './App.css';
import { Routes, Route} from "react-router-dom";
import Tabs from './components/tabs/tabs.component';
import ProgramTab from './components/tabs/program-tab.component';
import ResidentTab from './components/tabs/resident-tab.component';

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

const tabs: TabsType = [
  {
    label: "Programs",
    index: 1,
    Component: ProgramTab
  },
  {
    label: "Residents",
    index: 2,
    Component: ResidentTab
  }
];

function App() {
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} /> } />
      </Routes>
    </div>
  );
}

export default App;
