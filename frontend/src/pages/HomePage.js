import React from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { Link } from "react-router-dom";

import "../App.css";

const HomePage = () => {
  return (
    <div className="HomePage">
      <Container
        maxW="xl"
        h="100vh"
        centerContent
        className="home-page-container"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", md: "flex-start" }}
          p={3}
          w="100%"
          m="20px 0 5px 0"
          borderRadius="lg"
          borderWidth="1.5px"
          borderColor="black"
          className="boxWithBackground"
          opacity="0.8"
        >
          <Text
            fontSize="4xl"
            fontfamiy="Lato"
            color="black"
            m={{ base: "10px 0", md: "0 0 0 220px" }}
          >
            Talkie
          </Text>
        </Box>
        <Box
          opacity="0.95"
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1.5px"
          borderColor="black"
          backgroundPosition="fixed"
          background-repeat="no-repeat"
          background-size=" cover"
          overflowY="scroll"
          className="boxWithBackground"
        >
          <Tabs variant="soft-rounded">
            <TabList mb="1em">
              <Tab color="black">Login</Tab>
              <Tab color="black">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
                <Link
                  to="/forgotpassword"
                  className="forgot-password-link"
                  color="blue"
                >
                  <u>Forgot Password?</u>
                </Link>
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
