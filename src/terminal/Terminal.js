import { io } from "socket.io-client";
import prepareData from "./api/prepareData";
import prepareReq from "./api/prepareReq";
import { apiData } from "./apiData/api";

/**
 * A class that represents a terminal that will has access to API and socket
 *
 * @param {string} serverUrl - The URL of the API server.
 * @param {string} socketUrl - The URL of the socket server.
 */
class Terminal {
  constructor(serverUrl, socketUrl) {
    this.req = prepareReq(serverUrl);
    this.data = prepareData;
    this.socket = io(socketUrl, {
      withCredentials: true,
      autoConnect: false,
    });
  }

  /**
   * Makes an API request.
   * @param {object} options - An object containing request options.
   * @param {string} options.name - The name of the API to be called.
   * @param {object} options.queries - An object containing query string parameters for the request.
   * @param {object} options.params - An object containing URL path parameters for the request.
   * @param {object} options.body- An object containing the request body.
   * @return {object} The response from the API.
   *
   * @throws {Error} If the specified API couldn't be api.
   */
  request(args) {
    const { type = "regular", name, queries = {}, params = {}, body = {} } = args;
    if (type === "raw") return this.req(args);
    let api = apiData[name];
    if (!api) throw new Error(`Couldn't find your required api. name:${name}`);
    api = { ...api, queries: { ...api.queries, ...queries }, params: { ...api.params, ...params }, body: { ...api.body, ...body } };
    api = this.data(api);
    return this.req({ method: api.method, uri: api.uri, body: api.body, headers: api.headers });
  }
}

export const terminal = new Terminal(process.env.NEXT_PUBLIC_SERVER_URL, process.env.NEXT_PUBLIC_SOCKET_SERVER);
