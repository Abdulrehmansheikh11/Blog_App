import React from 'react';
import { useState } from 'react';
import { Tabs as ReactTabs, TabList, Tab, TabPanel } from 'react-tabs';
import './Tabs.css'; // Import your CSS file for styling
import Ltab from './Ltab';
import Rtab from './Rtab';


function CustomTabs() {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return (
      <ReactTabs className="main" selectedIndex={selectedTabIndex} onSelect={index => setSelectedTabIndex(index)}>
        <TabList className="custom-tablist">
          <Tab className="custom-tab">Comments</Tab>
          <Tab className="custom-tab">Add Comment</Tab>
        </TabList>
  
        <TabPanel className="custom-tabpanel">
         
            <Ltab/>
        
        </TabPanel>
        <TabPanel className="custom-tabpanel">
         
          <Rtab/>
       
        </TabPanel>
      </ReactTabs>
    );
  }
  
  export default CustomTabs;


