import {
  FixturesEventOptions,
  FixturesOptions,
  FixturesResponse,
} from "footballApi";
import BaseManager from "./BaseManager";
import axios from "axios";

export default class FixturesManager extends BaseManager {
  cache: [] = [];

  constructor(apiToken: string, apiHost: string) {
    super(apiToken, apiHost);
  }

  async get({
    fixtureId: id,
    date,
    leagueId: league,
    season,
    teamId: team,
    fromTo,
    round,
    timezone,
    status,
    venue,
    fixtureIds: ids,
  }: FixturesOptions) {
    if (
      !id &&
      !date &&
      !league &&
      !season &&
      !team &&
      !fromTo &&
      !round &&
      !timezone &&
      !status &&
      !venue &&
      !ids
    ) {
      date = new Date();
    }
    try {
      const { data, status: responseStatus } = await axios.get(
        this.buildURL("fixtures"),
        {
          params: {
            id,
            date: date ? this.getYmdString(date) : undefined,
            league,
            season,
            team,
            from: fromTo ? this.getYmdString(fromTo.from) : undefined,
            to: fromTo ? this.getYmdString(fromTo.to) : undefined,
            round,
            timezone,
            status,
            venue,
            ids: ids ? ids?.join("-") : undefined,
          },
          headers: {
            "X-RapidAPI-Key": this.getApiToken(),
            "X-RapidAPI-Host": this.getApiHost(),
          },
        }
      );
      if (responseStatus != 200) return null;
      else return data as FixturesResponse;
    } catch (error) {
      return null;
    }
  }

  async getHeadToHead(team1Id: string, team2Id: string) {
    try {
      const { data, status } = await axios.get(this.buildURL("fixtures"), {
        params: {
          h2h: `${team1Id}-${team2Id}`,
        },
        headers: {
          "X-RapidAPI-Key": this.getApiToken(),
          "X-RapidAPI-Host": this.getApiHost(),
        },
      });
      if (status != 200) return null;
      else return data as FixturesResponse;
    } catch (error) {
      return null;
    }
  }

  //TODO response data type
  async getEvents(
    fixtureId: string,
    { teamId: team, playerId: player, eventType: type }: FixturesEventOptions
  ) {
    try {
      const { data, status } = await axios.get(
        this.buildURL("fixtures/events"),
        {
          params: {
            fixture: fixtureId,
            team,
            player,
            type,
          },
          headers: {
            "X-RapidAPI-Key": process.env.API_TOKEN,
            "X-RapidAPI-Host": process.env.API_HOST,
          },
        }
      );
      if (status != 200) return null;
      else return data;
    } catch (error) {
      return null;
    }
  }
}
