module "footballApi" {
  /**
This is a TypeScript module that defines various types and interfaces used by a football API.

The module starts by defining several types that represent different states and types of fixtures, as well as different types of leagues and events. These include:
- `FixtureTypeShort`: a string that represents the short form of the fixture type, such as "FT" for "Finished"
- `FixtureTypeLong`: a string that represents the long form of the fixture type, such as "Match Finished"
- `FixtureEventType`: a string that represents the type of event that occurred during a fixture, such as "Goal" or "Card"
- `LeagueType`: a string that represents the type of league, such as "league" or "cup"
- `LeagueCurrentStateType`: a string that represents whether the league is currently active or not, "true" or "false"

It also defines several interfaces that are used to provide options for API requests and to represent the response data. These include:
- `FixturesOptions`: an interface that defines options that can be passed to an API request to retrieve fixtures, such as a specific date or league ID
- `FixturesEventOptions`: an interface that defines options that can be passed to an API request to retrieve events that occurred during a fixture, such as a specific team or player ID
- `BaseResponse`: an interface that defines the basic structure of an API response, including information about the request and the number of results returned
- `Fixture`: an interface that represents data about a fixture, including details about the date, venue, and status
- `FixtureLeague`: an interface that represents data about the league associated with a fixture, including its name, country, and season
- `FixtureTeams`: an interface that represents the teams involved in a fixture, including data about each team's record and whether it is the home or away team
- `Team`: an interface that represents data about a team, including its ID, name, and logo
- `FixtureGoals`: an interface that represents the number of goals scored by each team in a fixture
- `FixtureScore`: an interface that represents the score of a fixture at different stages of the match, such as halftime and fulltime
- `FixturesResponse`: an interface that represents the full response data returned by the API when requesting fixtures, including the fixture, league, teams, and score information.
- `TeamStatistic`: an interface that represents a statistics of a team 
- `TeamFixtures`: an interface that represents all the fixtures of a team with different kind of statistics like played games, wins, losses, draws etc.
   */

  //Option Types
  declare type FixtureTypeShort =
    | "TBD"
    | "NS"
    | "1H"
    | "HT"
    | "2H"
    | "ET"
    | "BT"
    | "P"
    | "SUSP"
    | "INT"
    | "FT"
    | "AET"
    | "PEN"
    | "PST"
    | "CANC"
    | "ABD"
    | "AWD"
    | "WO"
    | "LIVE";

  declare type FixtureTypeLong =
    | "Time To Be Defined"
    | "Not Started"
    | "First Half, Kick Off"
    | "Halftime"
    | "Second Half, Second Half Started"
    | "Extra Time"
    | "Break Time"
    | "Penalty In Progress"
    | "Match Suspended"
    | "Match Interrupted"
    | "Match Finished"
    | "Match Finished After Extra Time"
    | "Match Finished After Penalty"
    | "Match Postponed"
    | "Match Cancelled"
    | "Match Abandoned"
    | "Technical Loss"
    | "WalkOver"
    | "In Progress";

  declare type FixtureEventType = "Goal" | "Card" | "Subst" | "Var";

  declare type LeagueType = "league" | "cup";

  declare type LeagueCurrentStateType = "true" | "false";

  declare interface FixturesOptions {
    fixtureId?: string;
    date?: Date;
    leagueId?: string;
    season?: string;
    teamId?: string;
    fromTo?: { from: Date; to: Date };
    round?: string;
    timezone?: string;
    status?: FixtureTypeShort;
    venue?: string;
    fixtureIds?: string[];
  }

  declare interface FixturesEventOptions {
    teamId?: string;
    playerId?: string;
    eventType?: FixtureEventType;
  }

  //Api Response Types

  declare interface BaseResponse {
    get: string;
    parameters: any;
    errors: [];
    results: number;
    paging: {
      current: number;
      total: number;
    };
  }

  declare interface Fixture {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: null | number;
      second: null | number;
    };
    venue: {
      id: number | null;
      name: string;
      city: string;
    };
    status: {
      long: FixtureTypeLong;
      short: FixtureTypeShort;
      elapsed: number | null;
    };
  }

  declare interface FixtureLeague {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round?: string;
  }

  declare interface FixtureTeams {
    home: Team & { winner: boolean | null };
    away: Team & { winner: boolean | null };
  }

  declare interface Team {
    id: number;
    name: string;
    logo: string;
  }

  declare interface FixtureGoals {
    home: number | null;
    away: number | null;
  }

  declare interface FixtureScore {
    halftime: FixtureGoals;
    fulltime: FixtureGoals;
    extratime: FixtureGoals;
    penalty: FixtureGoals;
  }

  declare interface FixturesResponse extends BaseResponse {
    response: {
      fixture: Fixture;
      league: FixtureLeague;
      teams: FixtureTeams;
      goals: FixtureGoals;
      score: FixtureScore;
    }[];
  }

  declare interface TeamStatistic<T> {
    home: T;
    away: T;
    total: T;
  }

  declare interface TeamFixtures {
    played: TeamStatistic<number>;
    wins: TeamStatistic<number>;
    draws: TeamStatistic<number>;
    losses: TeamStatistic<number>;
  }

  declare interface TeamBiggestStatistics {
    streak: {
      wins: number;
      draws: number;
      loses: number;
    };
    wins: {
      home: string;
      away: string;
    };
    losses: {
      home: string;
      away: string;
    };
    goals: {
      for: {
        home: number;
        away: number;
      };
      against: {
        home: number;
        away: number;
      };
    };
  }

  declare interface TeamGoals {
    for: {
      total: TeamStatistic<number>;
      average: TeamStatistic<string>;
      minute: {
        "0-15": { total: number; percentage: string };
        "16-30": { total: number; percentage: string };
        "31-45": { total: number; percentage: string };
        "46-60": { total: number; percentage: string };
        "61-75": { total: number; percentage: string };
        "76-90": { total: number; percentage: string };
        "91-105": { total: number; percentage: string };
        "106-120": { total: number; percentage: string };
      };
    };
    against: {
      total: TeamStatistic<number>;
      average: TeamStatistic<string>;
      minute: {
        "0-15": { total: number; percentage: string };
        "16-30": { total: number; percentage: string };
        "31-45": { total: number; percentage: string };
        "46-60": { total: number; percentage: string };
        "61-75": { total: number; percentage: string };
        "76-90": { total: number; percentage: string };
        "91-105": { total: number; percentage: string };
        "106-120": { total: number; percentage: string };
      };
    };
  }

  declare interface TeamPenaltyStatistics {
    scored: {
      total: number;
      percentage: string;
    };
    missed: {
      total: number;
      percentage: string;
    };
    total: number;
  }

  declare interface TeamLineup {
    formation: string;
    played: number;
  }

  declare interface TeamCardStatistic {
    "0-15": { total: number | null; percentage: string | null };
    "16-30": { total: number | null; percentage: string | null };
    "31-45": { total: number | null; percentage: string | null };
    "46-60": { total: number | null; percentage: string | null };
    "61-75": { total: number | null; percentage: string | null };
    "76-90": { total: number | null; percentage: string | null };
    "91-105": { total: number | null; percentage: string | null };
    "106-120": { total: number | null; percentage: string | null };
  }

  declare interface TeamCards {
    yellow: TeamCardStatistic;
    red: TeamCardStatistic;
  }

  declare interface TeamStatisticsResponse extends BaseResponse {
    response: {
      league: FixtureLeague;
      team: Team;
      form: string | null;
      fixtures: TeamFixtures;
      goals: TeamGoals;
      biggest: TeamBiggestStatistics;
      clean_sheet: {
        home: number;
        away: number;
        total: number;
      };
      failed_to_score: {
        home: number;
        away: number;
        total: number;
      };
      penalty: TeamPenaltyStatistics;
      lineups: TeamLineup[];
      cards: TeamCards;
    };
  }

  declare interface TeamInformation {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: boolean;
    logo: string;
  }

  declare interface VenueInformation {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: string;
    surface: string;
    image: string;
  }

  declare interface TeamInformationResponse extends BaseResponse {
    response: {
      team: TeamInformation;
      venue: VenueInformation;
    }[];
  }

  declare interface TeamSeasonsInformationResponse extends BaseResponse {
    response: number[];
  }

  declare interface Country {
    name: string;
    code: string | null;
    flag: string | null;
  }

  declare interface TeamCountriesInformationResponse extends BaseResponse {
    response: Country[];
  }

  declare interface League {
    id: number;
    name: string;
    type: LeagueType;
    logo: string;
  }

  declare interface CountrySeason {
    year: number;
    start: string;
    end: string;
    current: boolean;
    coverage: Coverage;
  }

  declare interface Coverage {
    fixture: {
      events: boolean;
      lineups: boolean;
      statistics_fixtures: boolean;
      statistics_players: boolean;
    };
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
  }

  declare interface LeagueResponse extends BaseResponse {
    response: {
      league: League;
      country: Country[];
      season: CountrySeason;
    }[];
  }

  declare interface TeamStanding {
    rank: number;
    team: Team;
    points: number;
    goalsDiff: number;
    group: string;
    form: string;
    status: string;
    description: string;
    all: LeagueStandingStatistic;
    home: LeagueStandingStatistic;
    away: LeagueStandingStatistic;
    update: string;
  }

  declare interface LeagueStandingStatistic {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  }

  declare interface LeagueStanding extends BaseResponse {
    response: {
      league: FixtureLeague;
      standings: TeamStanding[][];
    };
  }

  declare interface Player {
    id: number | null;
    name: string | null;
  }

  declare interface FixtureEvent {
    time: {
      elapsed: number;
      extra: any | null; //TODO
    };
    team: Team;
    player: Player;
    assist: Player;
    Type: FixtureEventType;
    detail: string;
    comments: string | null;
  }

  declare interface FixtureEventResponse extends BaseResponse {
    response: {};
  }
}
