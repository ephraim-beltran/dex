import { render, screen } from "@testing-library/react";
import TypeCalculator from "./TypeCalculator";
import { expect } from "vitest";

test('TypeCalculator header should render', () => {
    render(<TypeCalculator />)
    const pageHeader = screen.getByText(/type calculator/i);
    expect(pageHeader).toBeInTheDocument();
});

