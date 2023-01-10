import BaseManager from "./BaseManager";
import axios from "axios";
import {
  League,
  LeagueCurrentStateType,
  LeagueResponse,
  LeagueStanding,
  LeagueType,
} from "footballApi";

export default class LeagueManager extends BaseManager {
  constructor(apiToken: string, apiHost: string) {
    super(apiToken, apiHost);
  }

  async get({
    leagueId: id,
    leagueName: name,
    leagueCountry: country,
    leagueAlpha2Code: code,
    leagueSeason: season,
    teamId: team,
    leagueType: type,
    leagueCurrentState: current,
    search,
  }: {
    leagueId?: string;
    leagueName?: string;
    leagueCountry?: string;
    leagueAlpha2Code?: string;
    leagueSeason?: string;
    teamId?: string;
    leagueType?: LeagueType;
    leagueCurrentState?: LeagueCurrentStateType;
    search?: string;
  }) {
    console.log("making request...");
    try {
      const { data, status } = await axios.get(this.buildURL("leagues"), {
        params: {
          id,
          name,
          country,
          code,
          season,
          team,
          type,
          current,
          search,
        },
        headers: {
          "X-RapidAPI-Key": process.env.API_TOKEN,
          "X-RapidAPI-Host": process.env.API_HOST,
        },
      });
      if (status != 200) return null;
      else return data as LeagueResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getStandings(
    season: string,
    { leagueId: league, teamId: team }: { leagueId?: string; teamId?: string }
  ) {
    try {
      const { data, status } = await axios.get(this.buildURL("standings"), {
        params: {
          season,
          league,
          team,
        },
        headers: {
          "X-RapidAPI-Key": process.env.API_TOKEN,
          "X-RapidAPI-Host": process.env.API_HOST,
        },
      });
      if (status != 200) return null;
      else return data as LeagueStanding;
    } catch (error) {
      return null;
    }
  }
}
