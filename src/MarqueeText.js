// src/MarqueeText.js
import React from "react";
import { Box } from "@chakra-ui/react"; // Chakra UI의 Box 컴포넌트 사용
import "./marquee.css"; // CSS 파일 추가

function MarqueeText({ text }) {
  return (
    <Box className="marquee" width="100%">
      <Box className="marquee-text" width="100%">{text}</Box>
    </Box>
  );
}

export default MarqueeText;
