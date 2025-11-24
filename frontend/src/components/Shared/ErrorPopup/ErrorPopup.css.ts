import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
});

export const popup = style({
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  width: "300px",
  textAlign: "center"
});

export const button = style({
  marginTop: "15px",
  padding: "8px 15px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#007bff",
  color: "white"
});