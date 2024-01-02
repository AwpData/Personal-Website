import React from "react";

import {Button, Spacer, Heading, Box, Flex, IconButton} from "@chakra-ui/react"
import {EmailIcon} from "@chakra-ui/icons"

export function Header({dark_mode_color, dark_mode_icon, handle_dark_mode, light_mode_header}) {
    return(
    <Flex alignItems="center" justifyContent="center" h="100px" gap="8" boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)" borderBottom="2px solid #ccc" className={light_mode_header}>
        <Box p="8">
          <p style={{ fontSize: '36px' }}>TREVOR<b>TANG</b></p>
        </Box>
        <Spacer />
        <Box p="2">
          <Heading size="md">HOME</Heading>
        </Box>
        <Box p="2">
          <Heading size="md">PROJECTS</Heading>
        </Box>
        <Box p="2">
          <Heading size="md">ABOUT</Heading>
        </Box>
        <Spacer />
        <Button colorScheme="teal" leftIcon={<EmailIcon/>} size="lg" align="baseline"><Heading size="md">Contact</Heading></Button>
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