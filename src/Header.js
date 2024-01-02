import React from "react";

import {ContactModal} from "./ContactPopUp.js"

import { Link as ReactRouterLink } from "react-router-dom"
import { Link as ChakraLink} from "@chakra-ui/react"

import {Spacer, Heading, Box, Flex, IconButton} from "@chakra-ui/react"


export function Header({dark_mode_color, dark_mode_icon, handle_dark_mode, light_mode_header}) {
    return(
    <Flex alignItems="center" justifyContent="center" h="100px" gap="8" boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" borderBottom="2px solid #ccc" className={light_mode_header}>
        <Box p="8">
          <p style={{ fontSize: '36px' }}>TREVOR<b>TANG</b></p>
        </Box>
        <Spacer />
        <Box p="2">
          <Heading size="md"><ChakraLink as={ReactRouterLink} to="/Personal-Website" _hover={{ color: 'teal' }}>HOME</ChakraLink></Heading>
        </Box>
        <Box p="2">
          <Heading size="md"><ChakraLink as={ReactRouterLink} to="/Projects" _hover={{ color: 'teal' }}>PROJECTS</ChakraLink></Heading>
        </Box>
        <Box p="2">
          <Heading size="md"><ChakraLink as={ReactRouterLink} to="/About" _hover={{ color: 'teal' }}>ABOUT</ChakraLink></Heading>
        </Box>
        <Spacer />
        <ContactModal/> {/* See ContactPopUp.js */}
        <IconButton 
          size="lg"
          colorScheme={dark_mode_color}
          aria-label="dark mode toggle button"
          icon={dark_mode_icon}
          onClick={handle_dark_mode}
          p="2"
          m="8"
          style={{ backgroundColor: dark_mode_color }} // Override the dark-mode class
        />
    </Flex>
    )
}