import FixturesManager from "./managers/FixturesManager";
import LeagueManager from "./managers/LeagueManager";
import TeamsManager from "./managers/TeamsManager";

class FootballApi {
  public fixturesManager: FixturesManager;
  public leagueManager: LeagueManager;
  public teamsManager: TeamsManager;

  constructor(private apiToken: string, private apiHost: string) {
    this.fixturesManager = new FixturesManager(apiToken, apiHost);
    this.leagueManager = new LeagueManager(apiToken, apiHost);
    this.teamsManager = new TeamsManager(apiToken, apiHost);
  }
}

declare global {
  var footballApi: FootballApi | undefined;
}

const api =
  globalThis.footballApi ||
  new FootballApi(
    process.env.API_TOKEN as string,
    process.env.API_HOST as string
  );
if (process.env.NODE_ENV !== "production") globalThis.footballApi = api;

export default api;
