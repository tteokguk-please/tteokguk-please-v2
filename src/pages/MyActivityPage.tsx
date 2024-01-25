import { Fragment, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import ReceivedIngredientsList from "@/components/MyActivityPage/ReceivedIngredientsList";

const MyActivityPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Fragment>
      <Header hasPreviousPage>활동 내역</Header>
      <div className={styles.container}>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className={styles.tabList}>
            <Tab className={tabIndex === 0 ? styles.selectedTab : ""}>받은 떡국 재료</Tab>
            <Tab className={tabIndex === 1 ? styles.selectedTab : ""}>내가 응원한 떡국</Tab>
          </TabList>
          <TabPanel className={styles.tabPanel}>
            <ReceivedIngredientsList />
          </TabPanel>
          <TabPanel className={styles.tabPanel}></TabPanel>
        </Tabs>
      </div>
    </Fragment>
  );
};

export default MyActivityPage;

const styles = {
  container: css({
    height: "calc(100% - 4.8rem)",
  }),
  tabList: css({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.6rem",
    fontWeight: 700,
    borderBottomWidth: "0.1rem",
    borderBottomColor: "primary.45",
    padding: "0.8rem 5.6rem 0.9rem",
    marginBottom: "2rem",
    cursor: "pointer",
  }),
  tabPanel: css({
    display: "flex",
    flexFlow: "column wrap",
    paddingX: "1.8rem",
  }),
  selectedTab: css({
    position: "relative",
    outline: "none",
    _after: {
      content: '""',
      position: "absolute",
      bottom: "-0.9rem",
      left: "50%",
      transform: "translateX(-50%)",
      width: "9.4rem",
      height: "0.4rem",
      backgroundColor: "primary.100",
    },
  }),
};
