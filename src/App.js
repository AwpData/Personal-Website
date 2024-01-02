import './App.css';
import { React, useState } from 'react';

import {Header} from "./Header.js";

import {ChakraProvider, VStack, Heading, Box, Text} from "@chakra-ui/react"
import {SunIcon, MoonIcon} from "@chakra-ui/icons"

function App() {
  const [dark_mode_icon_background, set_dark_mode_icon_background] = useState("black")
  const [dark_mode_icon, set_dark_mode_icon] = useState(<MoonIcon color="white"/>)
  const [dark_mode_header, set_dark_mode_header] = useState("light-mode-header")
  const [dark_mode_main, set_dark_mode_main] = useState("light-mode-main")

function handle_dark_mode() {
  set_dark_mode_icon_background(prevColor => (prevColor === "black" ? "white" : "black"));
  set_dark_mode_header(prevHeader => (prevHeader === "dark-mode-header" ? "light-mode-header" : "dark-mode-header"));
  set_dark_mode_main(prevMain => (prevMain === "dark-mode-main" ? "light-mode-main" : "dark-mode-main"));
  set_dark_mode_icon(prevIcon => (prevIcon.type === MoonIcon ? <SunIcon color="black" /> : <MoonIcon color="white" />));
}
  return (
    <ChakraProvider>
      <Header dark_mode_color={dark_mode_icon_background} dark_mode_icon={dark_mode_icon} handle_dark_mode={handle_dark_mode} light_mode_header={dark_mode_header}/>
      {/*Below is the main content for the home page*/}
      <Box minH="100vh" className={dark_mode_main}>
        <VStack align="start" pt="8" ml="8">
          <Heading size="2xl">Hi there, thank you for visiting!</Heading>
          <Text fontSize="xl">While this website is still a work in progress, you can contact me via the contact button if needed.</Text>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
