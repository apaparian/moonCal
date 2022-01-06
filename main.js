document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('main-div');
  body.appendChild(mainDiv);

  const moonImage = document.createElement('img');
  moonImage.classList.add('moon-image');

  const phaseName = document.createElement('h3');
  phaseName.classList.add('phase-name');

  const todayDate = document.createElement('h4');
  todayDate.classList.add('today-date');

  const moonAge = document.createElement('h5');
  moonAge.classList.add('moon-age');
  
  const moonVisibility = document.createElement('h5');
  moonVisibility.classList.add('visibility');

  const moonAgePercent = document.createElement('h5');
  moonAgePercent.classList.add('age-percent')
  
  const subContent = document.createElement('p')
  subContent.classList.add('sub-content');

  const rawDate = new Date();
  // phase Array will be an array of names of the phases
  const phaseArray = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous',
    'Full Moon', 'Waning Gibbous', 'Third Quarter', 'Waxing Crescent'];
  //this will be the calculation that will be how far we are from Jan 2nd
  const getJulianDate = (date = rawDate) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset()
    
    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
  }
  const LUNAR_MONTH = 29.530588853;
  const getLunarAge = (rawDate) => {
    const percent = getLunarAgePercent(rawDate);
    const age = percent * LUNAR_MONTH;
    return age;
  }
  const getLunarAgePercent = (rawDate) => {
    return normalize((getJulianDate(rawDate) - 2451550.1) / LUNAR_MONTH);
  }
  const normalize = value => {
    value = value - Math.floor(value);
    if (value < 0)
      value = value + 1
    return value;
  }
  const getLunarPhase = (rawDate) => {
    const age = getLunarAge(rawDate);
    if (age < 1.84566)
      return "New Moon";
    else if (age < 5.53699)
      return "Waxing Crescent";
    else if (age < 9.22831)
      return "First Quarter";
    else if (age < 12.91963)
      return "Waxing Gibbous";
    else if (age < 16.61096)
      return "Full Moon";
    else if (age < 20.30228)
      return "Waning Gibbous";
    else if (age < 23.99361)
      return "Last Quarter";
    else if (age < 27.68493)
      return "Waning Crescent";
    return "New Moon";
  }
  const lunarAgeText = (rawDate) => {
    const lunarAgeCalc = getLunarAge(rawDate)
    if (Math.round(lunarAgeCalc) === 1) {
        return "1 Day"
    } else {
        return Math.round(lunarAgeCalc) + ' ' + 'Days'  
    }
  };
  const getHoroscope = (phase) => {
    if (phase === 'New Moon')
      return 'During this time you should spend a moment breathing, stepping back, refreshing and restarting. This is a time to start new projects and phases within your life. It is a great time to gather your thoughts together and plan for the month ahead.                                         ';
    else if (phase === 'Waxing Crescent')
      return 'During this time you should focus on the why, think of it like planting seeds. Why are you doing what you are doing and what intentions are going to get you there? Write a list of your intentions and keep them in mind. What things do you want to accomplish or get done?               ';
    else if (phase === 'First Quarter')
      return 'During this phase spend extra time making decisions, spend the time to sit back and reflect on any decisions you have made in life. What did they mean to you? USe your previous decision making to help you overcome any obstacles in future decision making.                              ';
    else if (phase === 'Waxing Gibbous')
      return 'During this time really take care in the detail, be mindful of what you are doing and pay that little bit extra attention to everything that you do. Assess your goals and figure out what is working for you right now and what may need to change                                         ';
    else if (phase === 'Full Moon')
      return 'This is a great time to set goals and make any promises to yourself on a soul level. If there are any areas of spiritual growth you wish to develop. This is a great time to set these intentions and release any setbacks, negative feelings, blames and guilt you have placed on yourself.';
     else if (phase === 'Waning Gibbous')
      return 'This is the time to reflect on what has been happening and focus on gratitude. Make a list of all the things you are grateful for.                                                                                                                                                          ';
    else if (phase === 'Last Quarter')
      return 'During this time forgive yourtself of everything. Forgive your mistakes, bad habits, and anyy unfortunate mishaps. Forgiveness allows us to move on and approach every situation from a place of love. Use this time to forgive otherse and forgive yourself                                ';
    else if (phase === 'Waning Crescent')
      return 'During this time take extra care to let go, do not try to control the world around you as this will not bring you peace. Spend time being mindful, going with the flow, and surrendering to the world around you.                                                                           ';
  };

  const updatePage = (rawDate) => {
    phaseName.innerText = getLunarPhase();
    mainDiv.appendChild(phaseName);

    const slicedDate = JSON.stringify(rawDate).slice(6, 11) + '-' + JSON.stringify(rawDate).slice(1, 5);
    todayDate.innerText ='Date:' + ' ' + slicedDate;
    mainDiv.appendChild(todayDate);

    moonImage.setAttribute('src', 'assets/' + phaseName.innerText.replace(' ', '_') + '.png');
    mainDiv.appendChild(moonImage);

    moonAge.innerText = 'Lunar Age:' + ' ' + lunarAgeText(rawDate)
    mainDiv.appendChild(moonAge)

    moonAgePercent.innerText = 'Lunar Age Percent:' + ' ' + Math.round(getLunarAgePercent(rawDate)*100) + "%"
    mainDiv.appendChild(moonAgePercent)
      
    subContent.innerText = getHoroscope(phaseName.innerText);
    mainDiv.appendChild(subContent);
  }
  updatePage(rawDate);
  console.log(rawDate);
  
  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
        rawDate.setDate(rawDate.getDate() - 1);
        const slicedDate = JSON.stringify(rawDate).slice(6, 11) + '-' + JSON.stringify(rawDate).slice(1, 5);
        todayDate.innerText ='Date:' + ' ' + slicedDate;
        updatePage(rawDate);
        console.log(rawDate);
    }
  })

  body.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
        rawDate.setDate(rawDate.getDate() + 1);
        const slicedDate = JSON.stringify(rawDate).slice(6, 11) + '-' + JSON.stringify(rawDate).slice(1, 5);
        todayDate.innerText ='Date:' + ' ' + slicedDate;
        updatePage(rawDate);
        console.log(rawDate);
    } 
  })
  body.appendChild(mainDiv);

const audio = new Audio('assets/Rone - Bye Bye Macadam.mp3');
audio.loop = true;
audio.play();

});
