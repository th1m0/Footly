import {
  TeamCountriesInformationResponse,
  TeamInformationResponse,
  TeamSeasonsInformationResponse,
  TeamStatisticsResponse,
} from "footballApi";
import BaseManager from "./BaseManager";
import axios from "axios";

export default class TeamsManager extends BaseManager {
  constructor(apiToken: string, apiHost: string) {
    super(apiToken, apiHost);
  }

  async getStatistics(leagueId: string, season: string, teamId: string) {
    try {
      const { data, status } = await axios.get(
        this.buildURL("teams/statistics"),
        {
          params: {
            league: leagueId,
            season,
            team: teamId,
          },
          headers: {
            "X-RapidAPI-Key": this.getApiToken(),
            "X-RapidAPI-Host": this.getApiHost(),
          },
        }
      );
      if (status != 200) return null;
      else return data as TeamStatisticsResponse;
    } catch (error) {
      return null;
    }
  }

  async getInformation({
    teamId: id,
    teamName: name,
    leagueId: league,
    season,
    countryName: country,
    searchCountry: search,
    teamCode: code,
  }: {
    teamId?: string;
    teamName?: string;
    leagueId?: string;
    season?: string;
    countryName?: string;
    searchCountry?: string;
    teamCode?: string;
  }) {
    try {
      const { data, status } = await axios.get(this.buildURL("teams"), {
        params: {
          id,
          name,
          league,
          season,
          country,
          search,
          code,
        },
        headers: {
          "X-RapidAPI-Key": this.getApiToken(),
          "X-RapidAPI-Host": this.getApiHost(),
        },
      });
      if (status != 200) return null;
      else return data as TeamInformationResponse;
    } catch (error) {
      return null;
    }
  }

  async getTeamSeasonsInformation(teamId: string) {
    try {
      const { data, status } = await axios.get(this.buildURL("teams/seasons"), {
        params: {
          team: teamId,
        },
        headers: {
          "X-RapidAPI-Key": this.getApiToken(),
          "X-RapidAPI-Host": this.getApiHost(),
        },
      });
      if (status != 200) return null;
      else return data as TeamSeasonsInformationResponse;
    } catch (error) {
      return null;
    }
  }

  async getTeamCountriesInformation() {
    try {
      const { data, status } = await axios.get(
        this.buildURL("teams/countries"),
        {
          headers: {
            "X-RapidAPI-Key": this.getApiToken(),
            "X-RapidAPI-Host": this.getApiHost(),
          },
        }
      );
      if (status != 200) return null;
      else return data as TeamCountriesInformationResponse;
    } catch (error) {
      return null;
    }
  }
}
