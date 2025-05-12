import { renderHook, act } from "@testing-library/react";
import useAi from "./useAi";

global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe("useAi hook (with fetch mock)", () => {
  it("should initialize with null data, null error, and loading false", () => {
    const { result } = renderHook(() => useAi("/api/test"));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle a successful request", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ response: "Echo: Hello" }),
    });

    const { result } = renderHook(() =>
      useAi<{ prompt: string }, { response: string }>("/api/test")
    );

    await act(async () => {
      await result.current.call({ prompt: "Hello" });
    });

    expect(fetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ prompt: "Hello" }),
      })
    );

    expect(result.current.data).toEqual({ response: "Echo: Hello" });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("should handle fetch failure (non-ok response)", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    const { result } = renderHook(() => useAi("/api/test"));

    await act(async () => {
      await result.current.call({ prompt: "fail" });
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.loading).toBe(false);
  });

  it("should reflect loading state during async call", async () => {
    let resolveFetch: (value: any) => void;

    (fetch as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        })
    );

    const { result } = renderHook(() => useAi("/api/test"));

    act(() => {
      result.current.call({ prompt: "test loading" });
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveFetch?.({
        ok: true,
        json: async () => ({ response: "done" }),
      });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ response: "done" });
  });
});
