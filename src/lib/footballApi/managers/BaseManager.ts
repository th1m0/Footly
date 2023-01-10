export default abstract class BaseManager {
  private baseURL: string = "https://api-football-v1.p.rapidapi.com/v3";
  constructor(private apiToken: string, private apiHost: string) {}

  getApiToken() {
    return this.apiToken;
  }

  getApiHost() {
    return this.apiHost;
  }

  buildURL(url: string) {
    return this.baseURL + (url.startsWith("/") ? "/" + url : url);
  }

  getYmdString(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${
      (month.toString().length > 1 ? "" : "0") + month.toString()
    }-${day}`;
  }
}
