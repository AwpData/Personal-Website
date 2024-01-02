import {useState} from "react";
import {Button, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, 
    ModalCloseButton, FormControl, FormLabel, Input, Textarea, useDisclosure, InputLeftElement, InputGroup, FormErrorMessage, Spinner, useToast} from "@chakra-ui/react"
import { EmailIcon, CheckCircleIcon, SmallCloseIcon, PhoneIcon} from "@chakra-ui/icons"

export function ContactModal() {
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure required fields are filled in 
        if (!formData.name || !formData.email || !formData.message) {
            setFormErrors({
                name: !formData.name ? "Name is required" : "",
                email: !formData.email ? "Email is required" : "",
                message: !formData.message ? "Message is required" : "",
            });
            return;
        }

        // Reset the form errors
        setFormErrors({
            name: "",
            email: "",
            message: "",
        });

        setIsSubmitting(true);

        // I am using Formspree to handle email sending
        try {
            const response = await fetch("https://formspree.io/f/mjvnvrpl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }); // Send data to formspree and wait

            // 1 second timeout so you can admire the process haha
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const result = await response.json(); // Get the data from formspree

            if (result.ok) {
                console.log("Email sent successfully")
                toast({
                    title: "Email Sent",
                    description: "Your email was sent successfully, thank you!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } else if (result.errors && result.errors.includes("quota")) {
                console.error("Submission Limit Exceeded");
                // Display error toast for submission limit exceeded
                toast({
                    title: "Submission Limit Exceeded",
                    description: "Sorry, I have reached the API submission limit for this month. Please contact me at tangtr@uw.edu",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.error("Email failed to send")
                toast({
                    title: "Email Sending Failed",
                    description: "There was an error sending your email. Please try again.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } 

        } catch (error) {
            console.error("Error: ", error);
            toast({
                title: "Error",
                description: "An error occurred. Please check your network connection and try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

        setIsSubmitting(false);
        
        setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
        });

        onClose();
    };

    return (
    <>
        <Button colorScheme="teal" leftIcon={<EmailIcon/>} size="lg" align="baseline" onClick={onOpen}><Heading size="md">Contact</Heading></Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader><b>Contact Form</b></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4} isRequired isInvalid={formErrors.name}> 
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4} isRequired isInvalid={formErrors.email}>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <EmailIcon color="gray.300"/>
                                </InputLeftElement>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Phone Number</FormLabel>
                            <InputGroup>
                                <InputLeftElement>
                                    <PhoneIcon color="gray.300"/>
                                </InputLeftElement>
                                <Input
                                    type="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl mb={4} isRequired isInvalid={formErrors.message}>
                            <FormLabel>Message</FormLabel>
                            <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            style={{ height: '200px' }}
                            />
                            <FormErrorMessage>{formErrors.message}</FormErrorMessage>
                        </FormControl>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" colorScheme="green" mr={3}  
                    leftIcon={
                        isSubmitting ? <Spinner size="sm" color="white" /> : <CheckCircleIcon />} 
                    onClick={(e) => {handleSubmit(e);}}
                    isLoading={isSubmitting}>
                        Send</Button>
                    <Button onClick={onClose} colorScheme="red" leftIcon={<SmallCloseIcon/> } isDisabled={isSubmitting}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}