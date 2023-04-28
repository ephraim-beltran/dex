import { render, screen } from "@testing-library/react";
import TypeSelection from "../src/TypeCalculator/TypeSelection";

test('should show buttons for props', () => {
    const testList = [
        {name: 'test1', id: 1},
        {name: 'test2', id: 2},
        {name: 'test3', id: 3},
        {name: 'test4', id: 4},
        {name: 'test5', id: 5},
    ]
    const buttonTextList = testList.map(listItem => listItem.name);

    render(<TypeSelection typeList={testList} />)
    const buttons = screen.getAllByRole('label')

    expect(buttons).toContain(buttonTextList);
})