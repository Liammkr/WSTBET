const fetchData = async () => {
  const url = 'https://http-cors-proxy.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Origin: 'www.example.com',
      'X-Requested-With': 'www.example.com',
      'X-RapidAPI-Key': 'fe4f834be4msh37e1435eae4f36cp1c61f6jsn567ddc1cf847',
      'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
    },
    body: JSON.stringify({
      url: 'https://api.prizepicks.com/projections?league_id=7&per_page=250&state_code=CA&single_stat=true&game_mode=pickem'
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

fetchData(); // Call the async function to execute the code

var apiKey = 'dfb3dcc6e1a7344e07d62b40206ca5a6';
//dfb3dcc6e1a7344e07d62b40206ca5a6
var result = "error"
var jsonData = null
var MLBjsonData , NBAjsonData , sportvalue
window.onload = function() {
  // Paths to your text files
  var NBAfilePath = 'NBA.txt';
  var MLBfilePath = 'MLB.txt';

  // Function to load file content
  function loadFile(filePath, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', filePath, true);
      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              callback(xhr.responseText);
          }
      };
      xhr.send();
  }

  // Load NBA file
  loadFile(NBAfilePath, function(NBAcontent) {
      // Save content of NBA file to a variable
      NBAjsonData = NBAcontent;
      jsonData = NBAjsonData
      //console.log('NBA File Content:', NBAjsonData);

      // Load MLB file
      loadFile(MLBfilePath, function(MLBcontent) {
          // Save content of MLB file to a variable
          MLBjsonData = MLBcontent;
          //console.log('MLB File Content:', MLBjsonData);

          // Now you have both NBA and MLB file contents saved in variables
          // You can perform any further processing here
      });
  });
};

function findPlayerId(name) {
    // Get the JSON input from the textarea
    //var jsonData = document.getElementById('jsonInput').value;
    
    try {
      // Parse the JSON
      var data = JSON.parse(jsonData);
      console.log(data)
      // Get the name entered by the user
      var playerName = name;
      console.log(playerName)
      // Search for the player in the JSON data
      var playerId = null;
      for (var i = 0; i < data.included.length; i++) {
        var item = data.included[i];
        if (item.type === 'new_player' && item.attributes.display_name === playerName) {
          playerId = item.id;
          break;
        }
      }
      
      // Display the result
      if (playerId !== null) {
        var result = playerId
        return playerId;
        console.log(result)
      } else {
        return "Game Started / Error";
      }
    } catch (error) {
      // Handle JSON parsing errors
    }
  }
function findstats(id,market) {
    // Get the JSON input from the textarea
    //var jsonData = document.getElementById('jsonInput').value;
    
    try {
      // Parse the JSON
      var data = JSON.parse(jsonData);
      
      // Get the name entered by the user
      var playerid = id;
      if (market == "player_assists"){
        var category = "Assists"
      }
      if (market == "player_points"){
        var category = "Points"
      }
      if (market == "player_points_assists"){
        var category = "Pts+Asts"
      }
      if (market == "player_points_rebounds"){
        var category = "Pts+Rebs"
      }
      if (market == "player_points_rebounds_assists"){
        var category = "Pts+Rebs+Asts"
      }
      if (market == "player_rebounds_assists"){
        var category = "Rebs+Asts"
      }
      if (market == "player_rebounds"){
        var category = "Rebounds"
      }
      //MLB
      if (market == "batter_hits_runs_rbis"){
        var category = "Hits+Runs+RBIS"
      }
      if (market == "batter_runs_scored"){
        var category = "Runs"
      }
      if (market == "batter_total_bases"){
        var category = "Total Bases"
      }
      if (market == "batter_walks"){
        var category = "Walks"
      }
      if (market == "batter_strikeouts"){
        var category = "Hitter Strikeouts"
      }
      console.log(category)
      // Search for the player in the JSON data
      var prop = null;
      for (var i = 0; i < data.data.length; i++) {
        var item = data.data[i];
        if (item.relationships.new_player.data.id === playerid && item.attributes.stat_type === category && item.attributes.odds_type != "demon") {
          prop = item.attributes.line_score;
          break;
        }
      }
      
      // Display the result
      if (prop !== null) {
        var result = prop
        return prop;
        console.log(result)
      } else {
        return "Game Started / Error";
      }
    } catch (error) {
      // Handle JSON parsing errors
    }
  }
function makeRequest(eventID, bookmaker, sectionContent) {
  var sport = document.getElementById('sportSelect').value;
  if (document.getElementById("sportSelect").value == 'basketball_nba'){
    //https://the-odds-api.com/sports-odds-data/betting-markets.html
    //player_points_alternate
    //var markets = 'player_points_alternate'
    var markets = 'player_points,player_rebounds,player_assists,player_points_rebounds_assists,player_points_rebounds,player_points_assists,player_rebounds_assists'
  }
  if (document.getElementById("sportSelect").value == 'baseball_mlb'){
    var markets = 'batter_hits_runs_rbis,batter_runs_scored,batter_strikeouts,batter_total_bases,batter_walks'
  }
  if (document.getElementById("sportSelect").value == 'icehockey_nhl'){
    var markets = 'player_points,player_assists,player_shots_on_goal'
  }
  fetch('https://api.the-odds-api.com/v4/sports/' + sport + '/events/' + eventID + '/odds?apiKey=' + apiKey + '&bookmakers=' + bookmaker + '&markets='+markets+'&oddsFormat=decimal')
    .then(response => response.json())
    .then(data => {
      var formattedHtml = '';
      formattedHtml += '<h3>API Response:</h3>';
      formattedHtml += '<p><strong>Event ID:</strong> ' + data.id + '</p>';
      formattedHtml += '<p><strong>Sport:</strong> ' + data.sport_title + '</p>';
      formattedHtml += '<p><strong>Commence Time:</strong> ' + data.commence_time + '</p>';
      data.bookmakers.forEach(bookmaker => {
        bookmaker.markets.forEach(market => {
          var formattedMarketName = market.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          formattedHtml += '<h2>' + formattedMarketName + '</h2>';
          var sortedOutcomes = market.outcomes.sort((a, b) => a.price - b.price);
          console.log(market.key)
          sortedOutcomes.forEach(outcome => {
            var idnumbr = findPlayerId(outcome.description)
            var idk = findstats(idnumbr,market.key)
            if (idk > 0){
                var onPP = "On PrizePicks" 
                formattedHtml +=
    "<p><strong>" + outcome.description + "</strong> " + outcome.name + " " + outcome.point + " - "  + (" " + Math.round(100 / outcome.price) + "%") + " " +"</p>" + "<p style='color: #9b59b6;'>" + onPP + " at " + idk + "</p>";
            }else{
                var onPP = " "
                formattedHtml += "<p><strong>" + outcome.description + "</strong> " + outcome.name + " " + outcome.point + " - " + (" " + Math.round(100 / outcome.price) + "%")  +"</p>";
            }
          });
        });
      });
      sectionContent.innerHTML = formattedHtml;
    })
    .catch(error => {
      console.error('Error fetching odds data:', error);
      sectionContent.innerHTML = '<p>Error fetching odds data</p>';
    });
}

document.getElementById('sportSelect').addEventListener('change', function() {
  if (this.value == 'basketball_nba'){
    sportvalue = "NBA"
    jsonData = NBAjsonData
  }
  if (this.value == 'baseball_mlb'){
    sportvalue = "MLB"
    jsonData = MLBjsonData
  }
  if (this.value == 'icehockey_nhl'){
    sportvalue = "NHL"
  }
  if (document.getElementById('bookmakerSelect').value == 'draftkings'){
    var bookmakertitle = "DraftKings"
  }
  if (document.getElementById('bookmakerSelect').value == 'fanduel'){
    var bookmakertitle = "FanDuel"
  }
  document.title = "Liam Odds | " + sportvalue
  var selectedSport = this.value;
  var selectedBookmaker = document.getElementById('bookmakerSelect').value;
  var responseContainer = document.getElementById('responseContainer');
  responseContainer.innerHTML = '';

  fetch('https://api.the-odds-api.com/v4/sports/' + selectedSport + '/events?apiKey=' + apiKey)
    .then(response => response.json())
    .then(events => {
      events.forEach(event => {
        var sectionContent = document.createElement('div');
        sectionContent.className = 'section-content';
        sectionContent.style.display = 'none';

        var section = document.createElement('div');
        section.className = 'section';
        const dateTimeString = event.commence_time;
        const dateTime = new Date(dateTimeString);

        // Extracting the date and time portions
        const month = dateTime.getMonth() + 1; // Adding 1 because months are zero-based
        const day = dateTime.getDate();
        let hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        const dateString = `${month}/${day}`;
        const timeString = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

        //console.log(dateString + ' at ' + timeString); // Output: 3/31 at 7:40 PM

        section.innerHTML = '<div class="section-header">' + event.home_team + ' vs ' + event.away_team + " on " +dateString+ " at "+ timeString+ '</div>';
        section.appendChild(sectionContent);

        responseContainer.appendChild(section);

        section.querySelector('.section-header').addEventListener('click', function() {
          if (sectionContent.style.display === 'none') {
            sectionContent.style.display = 'block';
            if (!sectionContent.getAttribute('data-loaded')) {
              makeRequest(event.id, selectedBookmaker, sectionContent);
              sectionContent.setAttribute('data-loaded', 'true');
            }
          } else {
            sectionContent.style.display = 'none';
          }
        });
      });
    })
    .catch(error => {
      console.error('Error fetching event IDs:', error);
    });
});

document.getElementById('sportSelect').dispatchEvent(new Event('change'));
document.getElementById('openIframeBtn').addEventListener('click', function() {
    document.getElementById('iframeContainer').style.display = 'block';
    if (sportvalue == "NBA"){
      iframeURL = 'https://api.prizepicks.com/projections?league_id=7&per_page=250&state_code=CA&single_stat=true&game_mode=pickem'
    } else {
      iframeURL = 'https://api.prizepicks.com/projections?league_id=2&per_page=250&state_code=CA&single_stat=true&game_mode=pickem'
    }
    document.getElementById('myIframe').src = iframeURL;
    document.getElementById('formContainer').style.display = 'block';
  });

  document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var inputValue = document.getElementById('inputText').value;
    console.log('Submitted value:', inputValue);
    jsonData = inputValue
    // You can perform further actions with the submitted value here
    // Close the iframe and hide the form container
    document.getElementById('iframeContainer').style.display = 'none';
    document.getElementById('formContainer').style.display = 'none';
  });
