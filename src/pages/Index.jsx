import React, { useState } from "react";
import { Box, Heading, Text, Link, VStack, HStack, Input, Button, Grid, useColorModeValue, useToast } from "@chakra-ui/react";

const prefectures = ["Hokkaido", "Aomori", "Iwate", "Miyagi", "Akita", "Yamagata", "Fukushima", "Ibaraki", "Tochigi", "Gunma", "Saitama", "Chiba", "Tokyo", "Kanagawa", "Niigata", "Toyama", "Ishikawa", "Fukui", "Yamanashi", "Nagano", "Gifu", "Shizuoka", "Aichi", "Mie", "Shiga", "Kyoto", "Osaka", "Hyogo", "Nara", "Wakayama", "Tottori", "Shimane", "Okayama", "Hiroshima", "Yamaguchi", "Tokushima", "Kagawa", "Ehime", "Kochi", "Fukuoka", "Saga", "Nagasaki", "Kumamoto", "Oita", "Miyazaki", "Kagoshima", "Okinawa"];

const Index = () => {
  const [urls, setUrls] = useState({});
  const [inputUrl, setInputUrl] = useState("");
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleAddUrl = () => {
    if (selectedPrefecture && inputUrl) {
      setUrls({ ...urls, [selectedPrefecture]: inputUrl });
      setSelectedPrefecture("");
      setInputUrl("");
      toast({
        title: "URL added.",
        description: `URL for ${selectedPrefecture} has been added.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        Disaster Management Headquarters URLs
      </Heading>
      <Text fontSize="xl" mb={8} textAlign="center">
        Find the disaster management headquarters website for each prefecture in Japan
      </Text>

      <VStack spacing={4} mb={8}>
        <HStack spacing={4}>
          <Input placeholder="Enter URL" value={inputUrl} onChange={handleInputChange} />
          <Input placeholder="Select Prefecture" list="prefectures" value={selectedPrefecture} onChange={(e) => setSelectedPrefecture(e.target.value)} />
          <datalist id="prefectures">
            {prefectures.map((prefecture) => (
              <option key={prefecture} value={prefecture} />
            ))}
          </datalist>
          <Button colorScheme="blue" onClick={handleAddUrl}>
            Add URL
          </Button>
        </HStack>
      </VStack>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {prefectures.map((prefecture) => (
          <Box key={prefecture} bg={bgColor} p={4} borderRadius="md">
            <Heading as="h2" size="md" mb={2}>
              {prefecture}
            </Heading>
            {urls[prefecture] ? (
              <Link href={urls[prefecture]} isExternal color="blue.500">
                Visit Website
              </Link>
            ) : (
              <Text>No URL added yet</Text>
            )}
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Index;
