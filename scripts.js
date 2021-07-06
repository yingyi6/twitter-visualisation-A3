/*COLORS*/

const lineColors = {
    red: "#da1e53",
    green: "#06adb3",
    lgreen: "#06bbc8",
    blue: "#170a3b",
    lblue: "#003b88",
}

//VISUALISATION 1 Code interpreted from plotly library https://plotly.com/javascript/line-charts/#basic-line-plot

var trace1 = {
    x: [1990, 1995, 2000, 2005, 2010, 2015, 2017, 2018, 2019],
    y: [5.13, 5.44, 6.00, 6.13, 5.70, 5.41, 5.25, 5.42, 5.28],
    type: 'scatter',
    line: {
        color: lineColors.blue,
        width: 3,
    },
    text: 'billion t',
};


var data = [trace1];

var layout = {
    title: "The United States Annual C02 Emissions",
    font: {
        size: 15,
        family: "Helvetica, sans-serif",
        color: "#170a3b",
    },
    xaxis: {
        title: "Years"
    },
    yaxis: {
        title: "C02 emissions (billion tonnes)"
    },
    paper_bgcolor: "rgb(0,0,0,0)",
    plot_bgcolor: "rgb(0,0,0,0)",
    //Creating annotations on the graph 
    annotations: [
        {
            x: 2008,
            y: 6,
            xref: 'x',
            yref: 'y',
            text: 'Obama',
            showarrow: true,
            arrowhead: 3,
            ax: 0,
            ay: -100,

            font: {
                color: '#ffffff'
            },

            bordercolor: lineColors.lblue,
            borderwidth: 2,
            borderpad: 4,
            bgcolor: lineColors.lblue,
        },

        {
            x: 2017,
            y: 5.4,
            xref: 'x',
            yref: 'y',
            text: 'Trump',
            showarrow: true,
            arrowhead: 3,
            ax: 0,
            ay: -100,

            font: {
                color: '#ffffff'
            },

            bordercolor: lineColors.red,
            borderwidth: 2,
            borderpad: 4,
            bgcolor: lineColors.red,
        },
    ]
};

Plotly.newPlot('vis1', data, layout);


//VISUALISATION 2 Code interpreted from plotly library https://plotly.com/javascript/bar-charts/#stacked-bar-chart

var trace1 = {
    x: ['#actoncliamte', '#sotu', '#obama2012', '#raisethewage', '#obamacare'],
    y: [326, 224, 216, 182, 156],
    marker: {
        color: ['#da1e53', '#ccc', '#ccc', '#ccc', '#ccc']
    },
    type: 'bar'
};



var data = [trace1];

var layout = {
    title: 'Obamas Most Used Hashtags on Twitter',
    barmode: 'group',
    font: {
        size: 15,
        family: "Helvetica, sans-serif",
        color: "#170a3b",
    },
    xaxis: {
        title: "Hashtags"
    },
    yaxis: {
        title: "Number of times used"
    },
    paper_bgcolor: "rgb(0,0,0,0)",
    plot_bgcolor: "rgb(0,0,0,0)",
};

Plotly.newPlot('vis2', data, layout);

//code adapted from https://www.w3schools.com/howto/howto_js_tabs.asp to allow the tabs to open and close
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();




//VISUALISATION 3 code adapted from week 11 tutorials by Alex 

function combine_and_filter(obama_tweets, tsne_data_obama) {
    //add tsne data to trump and obama tweets

    obama_tweets = obama_tweets.map((obama_tweet, index) => Object.assign(obama_tweet, tsne_data_obama[index]))

    //add an author property

    for (let tweet of obama_tweets) {
        tweet.author = "Obama"
    }

    //combine all tweets into one array
    let tweets = [...obama_tweets];


    //only include tweets containing one of these strings

    //Main everything to do with climate
    showall = tweets.filter(tweet => ["solar", "pollution", "global warming", "Global Warming", "clean energy", "Climate change", "climate change"].some(topic => tweet.text.includes(topic)));

    //Filtering only tweets the containing certinan tweets 

    tweets2 = tweets.filter(tweet => ["#ParisAgreement"].some(topic => tweet.text.includes(topic)));

    tweets3 = tweets.filter(tweet => ["#EarthDay", "Earth Day"].some(topic => tweet.text.includes(topic)));

    tweets4 = tweets.filter(tweet => ["#UnitedOnClimate"].some(topic => tweet.text.includes(topic)));

    tweets5 = tweets.filter(tweet => ["#ActOnClimate", "ActOnClimate"].some(topic => tweet.text.includes(topic)));

    tweets6 = tweets.filter(tweet => ["#Up4Climate"].some(topic => tweet.text.includes(topic)));

    tweets7 = tweets.filter(tweet => ["#ClimateChangeIsReal"].some(topic => tweet.text.includes(topic)));

    return tweets;
}

function make_plot(tweets) {
    let trace1 = {
        x: showall.map(d => d.x),
        y: showall.map(d => d.y),
        customdata: showall.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: showall.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "#23285f",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: 'Show all related',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    let trace2 = {
        x: tweets2.map(d => d.x),
        y: tweets2.map(d => d.y),
        customdata: tweets2.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets2.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "#24469a",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: '#ParisAgreement',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    let trace3 = {
        x: tweets3.map(d => d.x),
        y: tweets3.map(d => d.y),
        customdata: tweets3.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets3.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "#2175b3",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: '#EarthDay',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    let trace4 = {
        x: tweets4.map(d => d.x),
        y: tweets4.map(d => d.y),
        customdata: tweets4.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets4.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "#4cbbc3",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: '#UnitedOnClimate',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    let trace5 = {
        x: tweets5.map(d => d.x),
        y: tweets5.map(d => d.y),
        customdata: tweets5.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets5.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "rgb(71,196,139)",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: '#ActOnClimate',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };
    let trace6 = {
        x: tweets6.map(d => d.x),
        y: tweets6.map(d => d.y),
        customdata: tweets6.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets6.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "rgb(157,201,56)",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: '#Up4Climate',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    let trace7 = {
        x: tweets7.map(d => d.x),
        y: tweets7.map(d => d.y),
        customdata: tweets7.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets7.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "#fff58d",
            size: 10,
        },
        mode: 'markers',
        type: 'scatter',
        name: '#ClimateChangeIsReal',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];


    let layout = {
        hovermode: "closest", //hover closest by default
        xaxis: {
            visible: false,

        },
        yaxis: {
            visible: false,
        },
        title: "💡 Double click on the legend to filter",
        paper_bgcolor: "rgb(240, 251, 255)",
        plot_bgcolor: "rgb(240, 251, 255)",

        annotations: [
            {
                x: -55,
                y: 10,
                xref: 'x',
                yref: 'y',
                text: 'Main cluster',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -100,

                font: {
                    color: '#ffffff'
                },

                bordercolor: lineColors.green,
                borderwidth: 2,
                borderpad: 4,
                bgcolor: lineColors.green,
            },
        ]

    }

    Plotly.newPlot('vis3', data, layout);
}

Plotly.d3.csv("data/obama_presidential_tweets.csv", (obama_tweets) => {

    Plotly.d3.csv("data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data_obama) => {
        let tweets = combine_and_filter(obama_tweets, tsne_data_obama)
        make_plot(tweets);
    });
});



//VISUALISATION 4 code adapted from week 11 tutorials by Alex 

function combine_and_filter2(trump_tweets, tsne_data_trump) {
    //add tsne data to trump and obama tweets
    trump_tweets = trump_tweets.map((trump_tweet, index) => Object.assign(trump_tweet, tsne_data_trump[index]))
    //add an author property
    for (let tweet of trump_tweets) {
        tweet.author = "Trump"
    }
    //combine all tweets into one array
    let tweets = [...trump_tweets];


    //only include tweets containing one of these strings

    //Main everything to do with climate
    showall = tweets.filter(tweet => ["Climate", "climate", "solar", "pollution", "global warming", "Global Warming", "clean energy", "Climate change"].some(topic => tweet.text.includes(topic)));

    //Filtering only tweets the containing certinan tweets
    return tweets;
}

function make_plot2(tweets) {
    let trace1 = {
        x: showall.map(d => d.x),
        y: showall.map(d => d.y),
        customdata: showall.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: showall.map(d => convertToParagraph("Date: " + d.datetime, 64)),
        marker: {
            color: "rgb(218,30,82)",

            size: 10,
        },
        mode: 'line',
        type: 'scatter',
        name: 'Showall',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };

    var data = [trace1];


    let layout = {
        hovermode: "closest", //hover closest by default
        xaxis: {
            visible: false,

        },
        yaxis: {
            visible: false,
        },
        title: "The lines follow a sequence of trumps tweets starting from point a to point b",
        paper_bgcolor: "rgb(240, 251, 255)",
        plot_bgcolor: "rgb(240, 251, 255)",

        annotations: [
            {
                x: 2.54,
                y: -29.6,
                xref: 'x',
                yref: 'y',
                text: 'Point A',
                showarrow: true,
                arrowhead: 3,
                ax: -100,
                ay: -0,

                font: {
                    color: '#ffffff'
                },

                bordercolor: lineColors.green,
                borderwidth: 2,
                borderpad: 4,
                bgcolor: lineColors.green,
            },
            {
                x: 3.6,
                y: -29.6,
                xref: 'x',
                yref: 'y',
                text: 'Point B',
                showarrow: true,
                arrowhead: 3,
                ax: 100,
                ay: 0,

                font: {
                    color: '#ffffff'
                },

                bordercolor: lineColors.green,
                borderwidth: 2,
                borderpad: 4,
                bgcolor: lineColors.green,
            },
        ]
        


    }

    Plotly.newPlot('vis4', data, layout);

}


Plotly.d3.csv("data/trump_presidential_tweets.csv", (trump_tweets) => {
    Plotly.d3.csv("data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
        let tweets = combine_and_filter2(trump_tweets, tsne_data_trump)
        make_plot2(tweets);
    });
});

//VISUALISATION 5 code adapted from week 11 tutorials by Alex 

function combine_and_filter3(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama) {
    //add tsne data to trump and obama tweets
    trump_tweets = trump_tweets.map((trump_tweet, index) => Object.assign(trump_tweet, tsne_data_trump[index]))
    obama_tweets = obama_tweets.map((obama_tweet, index) => Object.assign(obama_tweet, tsne_data_obama[index]))

    //add an author property
    for (let tweet of trump_tweets) {
        tweet.author = "Trump"
    }
    for (let tweet of obama_tweets) {
        tweet.author = "Obama"
    }

    //combine all tweets into one array
    let tweets = [...trump_tweets, ...obama_tweets];

    //only include tweets containing one of these strings
    tweets = tweets.filter(tweet => ["Climate", "climate", "solar", "pollution", "global warming", "Global Warming", "clean energy", "#ActOnClimate", "ActOnClimate", "Climate change", "Earth Day", "UnitedOnClimate", "Up4Climate", "ClimateChangeIsReal"].some(topic => tweet.text.includes(topic)));
    tweets = tweets.filter(tweet => tweet.sentiment < 0)
    return tweets;
}
function make_plot3(tweets) {
    let trace1 = {
        x: tweets.map(d => d.x),
        y: tweets.map(d => d.y),
        customdata: tweets.map(d => convertToParagraph(d.author + ": " + d.text, 64)),
        text: tweets.map(d => convertToParagraph("Sentiment: " + d.sentiment, 64)),
        marker: {
            color: tweets.map(d => d.author == "Trump" ? 0 : 1), //color 0 if trump, 1 if obama
            size: 8,
            colorscale: [ //custom color scheme
                ['0.0', '#da1e53'],
                ['1.0', '#003b88'],
            ]
        },
        mode: 'markers',
        name: "#ParisAgreement",
        type: 'scatter',
        hovertemplate:
            "%{customdata}" +
            "<br></br> %{text}" +
            "<extra></extra>", //hide extra tooltip info
    };
    var data = [trace1];

    let layout = {
        hovermode: "closest", //hover closest by default
        xaxis: {
            visible: false,

        },
        yaxis: {
            visible: false,
        },
        paper_bgcolor: "rgb(240, 251, 255)",
        plot_bgcolor: "rgb(240, 251, 255)",

        annotations: [
            {
                x: -22.788,
                y: 5,
                xref: 'x',
                yref: 'y',
                text: 'Tweet 1',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -100,

                font: {
                    color: '#ffffff'
                },

                bordercolor: lineColors.lblue,
                borderwidth: 2,
                borderpad: 4,
                bgcolor: lineColors.lblue,
            },
            {
                x: 23.123,
                y: -15,
                xref: 'x',
                yref: 'y',
                text: 'Tweet 2',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -100,

                font: {
                    color: '#ffffff'
                },

                bordercolor: lineColors.red,
                borderwidth: 2,
                borderpad: 4,
                bgcolor: lineColors.red,
            },
        ]
    }



    Plotly.newPlot('vis5', data, layout);
}


Plotly.d3.csv("data/trump_presidential_tweets.csv", (trump_tweets) => {
    Plotly.d3.csv("data/obama_presidential_tweets.csv", (obama_tweets) => {
        Plotly.d3.csv("data/tsne_and_cluster/tsne_data_trump.csv", (tsne_data_trump) => {
            Plotly.d3.csv("data/tsne_and_cluster/tsne_data_obama.csv", (tsne_data_obama) => {
                let tweets = combine_and_filter3(trump_tweets, obama_tweets, tsne_data_trump, tsne_data_obama)
                make_plot3(tweets);
            });
        });
    });
});





//from https://codereview.stackexchange.com/a/171857 to make the text stay within the graph
function convertToParagraph(sentence, maxLineLength) {
    let lineLength = 0;
    sentence = sentence.split(" ")
    return sentence.reduce((result, word) => {
        if (lineLength + word.length >= maxLineLength) {
            lineLength = word.length;
            return result + `<br>${word}`;
        } else {
            lineLength += word.length + (result ? 1 : 0);
            return result ? result + ` ${word}` : `${word}`;
        }
    }, '');
}








