import { AxiosInstance } from "axios";
import { AxiosHttpService } from "../../../src/infra/http/axios.adapter";

describe("AxiosHttpService", () => {
  let httpService: AxiosHttpService;
  let instance: AxiosInstance;

  beforeEach(() => {
    instance = {
      get: jest.fn(),
      delete: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    } as unknown as AxiosInstance
    httpService = new AxiosHttpService(instance);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should do a GET request successfully", async () => {
    const mockResponse = { data: [{ id: 1, name: "Product 1" }] };
    (instance.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await httpService.get("products", {});

    expect(instance.get).toHaveBeenCalledWith("products", { params: {} });
    expect(result).toEqual(mockResponse);
  });

  it("deve lançar um erro na requisição GET", async () => {
    const mockError = new Error("Erro na requisição");
    (instance.get as jest.Mock).mockRejectedValue(mockError);

    await expect(httpService.get("products", {})).rejects.toThrow(
      "Erro na requisição"
    );
  });

  it("should do a POST request successfully", async () => {
    (instance.post as jest.Mock).mockResolvedValue({});

    const result = await httpService.post("products", {
      id: 1,
      name: "Product 1",
    });

    expect(instance.post).toHaveBeenCalledWith("products", {
      id: 1,
      name: "Product 1",
    });
    expect(result).toBe(true);
  });

  it("should return false when throwns an error in a POST request", async () => {
    (instance.post as jest.Mock).mockRejectedValue(new Error("Erro na requisição"));

    const result = await httpService.post("products", {
      id: 1,
      name: "Product 1",
    });

    expect(result).toBe(false);
  });

  it("should do a PUT request successfully", async () => {
    (instance.put as jest.Mock).mockResolvedValue({});

    const result = await httpService.put("products/1", {
      id: 1,
      name: "Product 1",
    });

    expect(instance.put).toHaveBeenCalledWith("products/1", {
      params: { id: 1, name: "Product 1" },
      data: { id: 1, name: "Product 1" },
    });
    expect(result).toBe(true);
  });

  it("should return false when throwns an error in a PUT request", async () => {
    (instance.put as jest.Mock).mockRejectedValue(new Error("Erro na requisição"));

    const result = await httpService.put("products/1", {
      id: 1,
      name: "Product 1",
    });

    expect(result).toBe(false);
  });

  it("should do a DELETE request successfully", async () => {
    (instance.delete as jest.Mock).mockResolvedValue({});

    const result = await httpService.delete("products/1", { id: 1 });

    expect(instance.delete).toHaveBeenCalledWith("products/1", {
      params: { id: 1 },
    });
    expect(result).toBe(true);
  });

  it("should return false when throwns an error in a DELETE request", async () => {
    (instance.delete as jest.Mock).mockRejectedValue(new Error("Erro na requisição"));

    const result = await httpService.delete("products/1", { id: 1 });

    expect(result).toBe(false);
  });
});
