import { renderHook, waitFor } from "@testing-library/react";
import fetchTypeList from "./fetchTypeList";
import { describe, expect, test } from "vitest";

describe("fetchTypeList custom hook", async () => {
  const { result } = renderHook(() => fetchTypeList());
  const { list, error, isLoading } = result.current;

  it("should return an object of list, isLoading, error", () => {
    const keys = Object.keys(result.current);
    const expected = ["list", "isLoading", "error"];
    expect(keys).toEqual(expect.arrayContaining(expected));
  });
  await waitFor(() => {
    if (error === true) {
      test("should have an error state when promise does not resolve", () => {
        expect(isLoading).toBeFalsy();
        expect(error).toBeTruthy();
        expect(list).toHaveLength(0);
      });
    } else if (error === false) {
      test("should return an array and no error when resolved", () => {
        expect(isLoading).toBeTruthy();
        expect(error).toBeFalsy();
        expect(list).toHaveLength(18);
      });
    }
  });
});
