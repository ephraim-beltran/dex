import { renderHook, waitFor } from "@testing-library/react";
import useAsync from "../src/hooks/useAsync";
import { graphql } from "msw";
import { server } from "../src/mocks/server"
import fetchList from "../src/TypeCalculator/TypeList";

describe("TypeList fetch", () => {
  test("should be pending status in first load", async () => {
    const { result } = renderHook(() => useAsync(fetchList));
    expect(result.current.status).toBe("pending");
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeNull();
  });
  test("should return success status", async () => {
    server.use(
      graphql.query("TypeList", (req, res, ctx) => {
        return res(
          ctx.data({
            pokemon_v2_type: [
              { name: "MockType1", id: "1" },
              { name: "MockType2", id: "2" },
              { name: "MockType3", id: "3" },
              { name: "MockType4", id: "4" },
              { name: "MockType5", id: "5" },
            ],
          })
        );
      }),
    )
    const { result } = renderHook(() => useAsync(fetchList));
    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
    expect(result.current.value).not.toBeNull();
    expect(result.current.value).toHaveLength(5);
  });
});
