import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders login form", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByText(/login/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("shows error on wrong credentials", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByText(/login/i);

  fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
  fireEvent.click(loginButton);

  const errorMsg = screen.getByText(/invalid email or password/i);
  expect(errorMsg).toBeInTheDocument();
});
