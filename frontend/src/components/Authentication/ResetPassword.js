import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { VStack, Flex, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { BiHide, BiShow } from "react-icons/bi";

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const { resetToken } = useParams();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!password) {
      toast({
        title: "Please enter a new password",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Weak Password",
        status: "warning",
        description: "Password should be at least 6 characters long.",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password.length > 20) {
      toast({
        title: "Very Long Password",
        status: "warning",
        description: "Password should be at most 20 characters long.",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // console.log(resetToken);
      await axios.put(
        `/api/user/resetpassword/${resetToken}`,
        {
          password,
        },
        config
      );
      toast({
        title: "Password Reset Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      history.push("/"); // Redirect to login page after successful password reset
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  // ... your existing code ...

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100%"
      w="100%"
      bg="#C2DEDC"
    >
      <VStack
        className="boxWithBackground"
        spacing="5px"
        maxW="400px"
        bg="none"
        p="7"
        borderRadius="lg"
        borderWidth="2px"
        borderColor="black"
      >
        <FormControl id="password" isRequired>
          <FormLabel>
            New Password
            <InputGroup>
              <Input
                borderColor="black"
                type={show ? "text" : "password"}
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  colorScheme="none"
                  color="black"
                >
                  {show ? <BiHide size="lg" /> : <BiShow size="lg" />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormLabel>
        </FormControl>
        <FormControl id="Cpassword" isRequired>
          <FormLabel>
            Confirm Password
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmpassword(e.target.value)}
                borderColor="black"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                  colorScheme="none"
                  borderColor="black"
                  color="black"
                >
                  {show ? <BiHide size="lg" /> : <BiShow size="lg" />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormLabel>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Reset Password
        </Button>
        <Text>
          <p>
            Ensuring strong password security is vital to protect user accounts.
            When users reset passwords, its crucial to follow certain rules.
            Passwords should be at <b>least 6 characters</b> to provide basic
            security against brute-force attacks. On the other hand, setting a{" "}
            <b>maximum limit of 20 characters</b> helps prevent potential
            vulnerabilities and data corruption. By adhering to these
            guidelines, users can create strong and secure passwords.
            <br />
            If you face any issues, feel free to reach out to our support team
            at <br />
            <b>teamtalkie27@gmail.com.</b>
            <br />
            <b>© Team Talkie</b>
          </p>
        </Text>
      </VStack>
    </Flex>
  );
};
export default ResetPassword;
