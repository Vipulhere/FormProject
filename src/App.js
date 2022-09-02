import "./App.css";
import Welcome from "./components/welcome";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  useToast,
  Center,
  Button,
} from "@chakra-ui/react";
import Registration from "./components/registration";
import Login from "./components/login";
import { useState } from "react";
function App() {
  const [showform, setshowform] = useState(true);

  const toast = useToast();
  const [name, setname] = useState("");
  function handlename(name) {
    setname(name);
    setshowform(false)
  }

  function handleclick(userdetails) {
    let user = JSON.parse(localStorage.getItem("userdetail"));
    console.log(user);
    if (user === null) {
      user = [];
    }
    const a = user.filter((user) => {
      return user.username === userdetails.username;
    });

    if (a.length === 0) {
      user.push(userdetails);
      localStorage.setItem("userdetail", JSON.stringify(user));
      toast({
        title: `Registered Successfull`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      setname(userdetails.name);
      setshowform(false);
    } else {
      toast({
        title: `User already exists!`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  }
  return (
    <>
      <Welcome name={name} />
    { !showform &&  <Center marginTop="50px"><Button onClick={()=>{setshowform(true);setname("")}} colorScheme='blue'>Logout</Button></Center>}
      {showform && (
        <Container marginTop="50px">
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Register</Tab>
              <Tab>Login</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Registration handleclick={handleclick} />
              </TabPanel>
              <TabPanel>
                <Login handlename={handlename} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      )}
    </>
  );
}

export default App;
