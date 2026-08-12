import { render, screen, fireEvent } from "@testing-library/react";
import CropPredictor from "./CropPredictor";

test("renders upload input and predict button", () => {
  render(<CropPredictor />);
  const uploadInput = screen.getByRole("textbox", { hidden: true }) || screen.getByLabelText(/upload/i);
  const predictButton = screen.getByText(/predict disease/i);
  expect(predictButton).toBeInTheDocument();
});

test("shows preview when image is selected", () => {
  render(<CropPredictor />);
  const file = new File(["dummy"], "leaf.png", { type: "image/png" });
  const input = screen.getByRole("textbox", { hidden: true }) || screen.getByLabelText(/upload/i);
  
  // simulate file upload
  fireEvent.change(input, { target: { files: [file] } });
  
  // Preview should exist
  const previewImg = screen.getByRole("img");
  expect(previewImg).toBeInTheDocument();
});

test("shows simulated prediction", () => {
  render(<CropPredictor />);
  const predictButton = screen.getByText(/predict disease/i);
  fireEvent.click(predictButton);
  const predictionText = screen.getByText(/prediction/i);
  expect(predictionText).toBeInTheDocument();
});
