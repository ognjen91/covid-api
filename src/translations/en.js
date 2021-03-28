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
      deathStats : {
        title : "Deaths Stats",
        totalText : 'lifes lost since the day one.',
        averageText : 'lifes lost each day, on average.'
      },
      serbia : {
        title : 'Serbia vs Covid 19',
        totalCasesText1 : 'With total of',
        totalCasesText2 : 'confirmed cases',
        totalCasesText3 : 'Serbia is ranked',
        totalCasesText4 : 'in the World',
        totalCasesText5: 'Unfortunately, since the day one,',
        totalCasesText6: 'citizens lost their battle with the virus,',
        totalCasesText7: 'and this ranks Serbia as',
        totalCasesText8: 'globally',
        statsSubtitle: 'Serbia Stats By Date',

      },
      lastUpdateText : "Last Updated",
    },
    countries : {
      topText : {
        countries : {
          title : 'Stats by coutry',
          text1 : "Click on a county's row to see full data for the country,",
          text2 : "or click on a plus sign to add a country to your feed."
        },
        feed : {
          title : 'My Feed',
          text1 : "Click on a county's row to see full data for the country,",
          text2 : "or click on a minus sign to remove the country from your feed."
        },
      },
      filterText : 'Filter By Country Name',
      noMatch : 'Sorry, No Matching Countries',
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
      },
    },
    country : {
      title : 'Covid 19 Data For',
      on : 'on',
      firstConfirmed : 'First Confrimed Case',
      trendsTitle : 'Trends & Deaths',
      trends : 'Trends',
      deaths : 'Deaths',
    },
    about : {
      'madeText' : 'Made with',
      'and' : '&',
      'specialThanks' : 'Special thanks to a guy who ate a bat soup back in December 2019.',
      'pluginsUsed' : 'Plugins used:',
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
    heatMaps : {
      confirmedTitle : 'New Cases By Date',
      deathsTitle : 'Deaths By Date',
    },
    recentlyViewed : {
      viewedTitle : "Recently Viewed Countries",
      suggestionsTitle : 'Countries Suggestions'
    }
  }
}
