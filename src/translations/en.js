export default {
  header : {
    home : 'Home',
    countries : 'Countries',
    feed : 'My Feed',
    about : 'About'
  },
  pages : {
    home : {
      mainTitle : "Global Covid 19 Data For",
      caseWindows : {
        TotalConfirmed : "Total Confirmed",
        NewConfirmed : "Repored Today",
        TotalDeaths : "Total Deaths",
        NewDeaths : "Deaths Today",
        TotalRecovered : "Total Recovered",
        NewRecovered : "Recovered Today",
      },
      lastUpdateText : "Last Updated",
      totalDeathsTitle : "Deaths Stats"
    },
    countries : {
      table : {
        titles : {
          Country: "Country",
          TotalConfirmed : "Total Confirmed",
          NewConfirmed : "Confirmed Today",
          TotalDeaths : "Deaths",
          NewDeaths : "Deaths Today",
          TotalRecovered : "Recovered",
          InFeed : "In Feed"
        }
      }
    }
  },
  components : {
    topList : {
        title : "Most Cases",
        optionTotalConfirmed : "Total Confirmed Cases",
        optionTotalDeaths : "Deaths Since Day One",
        show : "Show",
    },
    countryDeathChart : {
      activeAndRecovered : "Active & Recovered",
      deaths : "Deaths",
      deathPercentageText : "Death Percentage"
    },
    recentlyViewed : {
      title : "Recently Viewed Countries"
    }
  }
}
