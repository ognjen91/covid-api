export default {
  header : {
    home : 'Почетна',
    countries : 'Земље',
    feed : 'Моја праћења',
    about : 'О апликацији'
  },
  pages : {
    home : {
      mainTitle : "Ковид 19 подаци на дан",
      caseWindows : {
        TotalConfirmed : "Укупно потврђених",
        NewConfirmed : "Случајева данас",
        TotalDeaths : "Умрлих до данас",
        NewDeaths : "Умрлих Данас",
        TotalRecovered : "Укупно опорављених",
        NewRecovered : "Опорављених данас",
      },
      deathStats : {
        title : "Статистика фаталних исхода",
        totalText : 'смртних исхода до данашњег дана.',
        averageText : 'смртних случајева дневно, у просеку.'
      },
      serbia : {
        title : 'Србија у борби против вируса',
        totalCasesText1 : 'Са укупно',
        totalCasesText2 : 'потврђених случајева',
        totalCasesText3 : 'Србија се налази на',
        totalCasesText4 : 'месту у свету',
        totalCasesText5: 'Нажалост, од почетка пандемије',
        totalCasesText6: 'држављана Србије је изгубило битку са вирусом',
        totalCasesText7: 'и по овоме се Србија налази на месту број',
        totalCasesText8: 'у свијету',
        statsSubtitle: 'Статистика Србије по данима',
        tutorialMobile : 'Клик на квадратић да видите податке за одређени датум',
        tutorialDesktop : 'Пређите курсором преко квадратића да видите податке за одређени датум',
      },
      lastUpdateText : "Последњи пут ажурирано",
    },
    countries : {
      topText : {
        countries : {
          title : 'Статистика по земљама',
          text1 : "Кликните на земљу да видите све податке,",
          text2 : "или кликните на знак + да додате ту земљу у листу оних које пратите."
        },
        feed : {
          title : 'Моја праћења',
          text1 : "Кликните на земљу да видите све податке,",
          text2 : "или кликните на знак - да уклоните земљу из оних које пратите. "
        },
      },
      filterText : 'Филтрирајте земље по називу',
      noMatch : 'Жао нам је, ни једна земља не задовољава критеријум претраге',
      table : {
        titles : {
          Country: "Земља",
          TotalConfirmed : "Укупно случајева",
          NewConfirmed : "Потврђених данас",
          TotalDeaths : "Умрлих",
          NewDeaths : "Умрлих данас",
          TotalRecovered : "Опорављених",
          InFeed : "У праћењима"
        }
      },
    },
    country : {
      title : 'Ковид 19 подаци за',
      on : 'на дан',
      firstConfirmed : 'Први потврђен случај',
      trendsTitle : 'Трендови и смртни исходи',
      trends : 'Трендови',
      deaths : 'Смртни исходи',
    },
    about : {
      'madeText' : 'Направљено у',
      'and' : 'и помоћу',
      'specialThanks' : 'Специјална захвалница господину који је појео супу од слијепог миша у децембру 2019.',
      'pluginsUsed' : 'Коришћено у изради',
    }
  },
  components : {
    topList : {
        title : "Земље са највише случајева",
        optionTotalConfirmed : "Највише потврђених",
        optionTotalDeaths : "Највише умрлих",
        show : "Прикажи",
    },
    countryDeathChart : {
      activeAndRecovered : "Активни и опорављени",
      deaths : "Умрли",
      deathPercentageText : "Проценат смртности"
    },
    heatMaps : {
      confirmedTitle : 'Број случајева по датумима',
      deathsTitle : 'Број умрлих по датумима',
    },
    recentlyViewed : {
      viewedTitle : "Недавно прегледане земље",
      suggestionsTitle : 'Предлажемо да погледате'
    }
  }
}
