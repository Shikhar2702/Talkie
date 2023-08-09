import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
  Text,
  Box,
  Button,
  useColorMode,
  Center,
  Switch,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Talkie from "../../bgpics/Logo.png";

function SideDrawer() {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    isOpen: isConfirmOpen,
    onOpen: handleConfirmOpen,
    onClose: handleConfirmClose,
  } = useDisclosure();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    if (colorMode === "dark") {
      toggleColorMode();
    }
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      // console.log(data);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);

      // Remove notification for this chat
      setNotification(
        notification.filter((notif) => notif.chat._id !== data._id)
      );

      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  // Function to handle user deletion
  const deleteUserHandler = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Make an API call to delete the user
      await axios.delete(`/api/user/${user._id}`, config);

      // Display success toast when user is deleted
      toast({
        title: "User Deleted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      // After successful deletion, perform logout
      logoutHandler();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Delete the User",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    handleConfirmClose();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={colorMode === "light" ? "#75C2F6" : "#4942E4"}
        color={colorMode === "light" ? "black" : "white"}
        width="100%"
        padding="5px 10px"
        borderWidth="none"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            color={colorMode === "light" ? "black" : "white"}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} paddingLeft={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontfamily="Work sans" display="flex">
          Talkie
          <Text
            m="5px 0 0 6px"
            bg="white"
            borderRadius="full"
            width="30px"
            height="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={Talkie}
              height="18px"
              width="36px"
              borderRadius="full"
              alt="Talkie"
            ></img>
          </Text>
        </Text>
        <Center display="flex" alignItems="center">
          {colorMode === "light" ? (
            <SunIcon color="black" />
          ) : (
            <MoonIcon color="white" />
          )}
          <Tooltip placement="bottom-end">
            <Switch
              size="sm"
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
              aria-label="Mode"
              colorScheme="grey"
              borderWidth="1px"
              borderRadius="lg"
              bg={colorMode === "light" ? "gray.300" : "gray.600"}
              checkedIcon={
                colorMode === "light" ? (
                  <MoonIcon color="gray.800" />
                ) : (
                  <SunIcon color="yellow.400" />
                )
              }
            />
          </Tooltip>
          <Menu>
            <MenuButton padding={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" marginRight={1} />
            </MenuButton>
            <MenuList pl={2} color={colorMode === "light" ? "black" : "white"}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              background="none"
              rightIcon={
                <HamburgerIcon
                  color={colorMode === "light" ? "black" : "white"}
                />
              }
            >
              <Center display="flex" alignItems="center">
                {/* Conditionally render the Avatar */}
                {user.pic ===
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? (
                  <Avatar size="sm" cursor="pointer" name={user.name} />
                ) : (
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                  />
                )}

                {/* ... (rest of the component code) */}
              </Center>
            </MenuButton>
            <MenuList color={colorMode === "light" ? "black" : "white"}>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              <MenuItem onClick={handleConfirmOpen}>Delete User</MenuItem>
              <DeleteConfirmationModal
                isOpen={isConfirmOpen}
                onClose={handleConfirmClose}
                onDelete={deleteUserHandler}
              />
              <MenuItem>
                <Button colorScheme="blue">
                  <a href="/about">About Talkie</a>
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Center>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
